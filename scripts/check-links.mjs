import { glob } from 'glob';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TIMEOUT = 10000; // 10 seconds

async function checkUrl(url, timeout = TIMEOUT) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'dev-toolbox-link-checker/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    return {
      url,
      status: response.status,
      ok: response.ok,
      error: null
    };
  } catch (error) {
    return {
      url,
      status: null,
      ok: false,
      error: error.message
    };
  }
}

async function extractLinksFromTools() {
  console.log('🔍 Extracting links from tools...');
  
  const links = new Set();
  const toolFiles = await glob('src/data/tools/*.json', { cwd: join(__dirname, '..') });
  
  for (const file of toolFiles) {
    try {
      const content = readFileSync(join(__dirname, '..', file), 'utf-8');
      const tool = JSON.parse(content);
      
      // Add required links
      if (tool.website) links.add(tool.website);
      
      // Add optional links
      if (tool.github) links.add(tool.github);
      if (tool.docs) links.add(tool.docs);
      
    } catch (error) {
      console.warn(`⚠️  Could not parse ${file}: ${error.message}`);
    }
  }
  
  return Array.from(links);
}

async function extractLinksFromTips() {
  console.log('🔍 Extracting links from tips...');
  
  const links = new Set();
  const tipFiles = await glob('src/data/tips/*.md', { cwd: join(__dirname, '..') });
  
  const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g;
  
  for (const file of tipFiles) {
    try {
      const content = readFileSync(join(__dirname, '..', file), 'utf-8');
      const { content: markdownContent } = matter(content);
      
      // Extract URLs from markdown content
      const matches = markdownContent.match(urlRegex);
      if (matches) {
        matches.forEach(url => {
          // Clean up URL (remove trailing punctuation)
          const cleanUrl = url.replace(/[.,;:!?]$/, '');
          links.add(cleanUrl);
        });
      }
      
    } catch (error) {
      console.warn(`⚠️  Could not parse ${file}: ${error.message}`);
    }
  }
  
  return Array.from(links);
}

function categorizeUrls(urls) {
  const categories = {
    critical: [], // Main websites, documentation
    important: [], // GitHub repos
    external: []  // Other external links
  };
  
  for (const url of urls) {
    if (url.includes('github.com')) {
      categories.important.push(url);
    } else if (url.includes('docs.') || url.includes('/docs') || url.includes('/documentation')) {
      categories.critical.push(url);
    } else {
      // Assume main websites are critical
      categories.critical.push(url);
    }
  }
  
  return categories;
}

async function checkLinks(urls, label, critical = false) {
  if (urls.length === 0) {
    console.log(`📭 No ${label} links to check`);
    return { checked: 0, failed: 0, errors: [] };
  }
  
  console.log(`🔗 Checking ${urls.length} ${label} links...`);
  
  const results = await Promise.all(
    urls.map(url => checkUrl(url))
  );
  
  const failed = results.filter(result => !result.ok);
  const errors = [];
  
  for (const result of failed) {
    const errorMsg = `${result.url}: ${result.error || \`HTTP \${result.status}\`}`;
    errors.push(errorMsg);
    
    if (critical) {
      console.log(`❌ ${errorMsg}`);
    } else {
      console.log(`⚠️  ${errorMsg}`);
    }
  }
  
  const passed = results.length - failed.length;
  console.log(`✅ ${passed}/${results.length} ${label} links working`);
  
  return {
    checked: results.length,
    failed: failed.length,
    errors,
    critical
  };
}

async function main() {
  console.log('🚀 Starting link validation...\n');
  
  try {
    // Extract all links
    const [toolLinks, tipLinks] = await Promise.all([
      extractLinksFromTools(),
      extractLinksFromTips()
    ]);
    
    const allLinks = [...new Set([...toolLinks, ...tipLinks])];
    console.log(`🔗 Found ${allLinks.length} unique links total\n`);
    
    if (allLinks.length === 0) {
      console.log('📭 No links found to check');
      return;
    }
    
    // Categorize URLs
    const categorized = categorizeUrls(allLinks);
    
    // Check critical links first (fail build if these fail)
    const criticalResults = await checkLinks(categorized.critical, 'critical', true);
    console.log('');
    
    // Check important links (warn but don't fail)
    const importantResults = await checkLinks(categorized.important, 'important', false);
    console.log('');
    
    // Check external links (warn but don't fail)
    const externalResults = await checkLinks(categorized.external, 'external', false);
    
    // Summary
    const totalChecked = criticalResults.checked + importantResults.checked + externalResults.checked;
    const totalFailed = criticalResults.failed + importantResults.failed + externalResults.failed;
    
    console.log(\`\\n📊 Summary: \${totalChecked - totalFailed}/\${totalChecked} links working\`);
    
    if (criticalResults.failed > 0) {
      console.log(\`\\n💥 \${criticalResults.failed} critical link(s) failed. Build should fail.\`);
      process.exit(1);
    } else if (totalFailed > 0) {
      console.log(\`\\n⚠️  \${totalFailed} non-critical link(s) failed. Consider reviewing.\`);
    } else {
      console.log('\\n🎉 All links are working!');
    }
    
  } catch (error) {
    console.error('💥 Link checking failed:', error);
    process.exit(1);
  }
}

main();