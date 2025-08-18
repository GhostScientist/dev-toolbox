import { glob } from 'glob';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

async function loadSchema(schemaPath: string): Promise<any> {
  const fullPath = join(__dirname, '..', schemaPath);
  return JSON.parse(readFileSync(fullPath, 'utf-8'));
}

async function validateTools(): Promise<ValidationResult> {
  console.log('🔍 Validating tools...');
  
  const errors: string[] = [];
  const toolSchema = await loadSchema('schemas/tool.schema.json');
  const validate = ajv.compile(toolSchema);
  
  const toolFiles = await glob('src/data/tools/*.json', { cwd: join(__dirname, '..') });
  
  if (toolFiles.length === 0) {
    errors.push('No tool files found in src/data/tools/');
    return { valid: false, errors };
  }

  const toolIds = new Set<string>();
  
  for (const file of toolFiles) {
    try {
      const content = readFileSync(join(__dirname, '..', file), 'utf-8');
      const tool = JSON.parse(content);
      
      if (!validate(tool)) {
        errors.push(`${file}: ${ajv.errorsText(validate.errors)}`);
        continue;
      }

      // Check for duplicate IDs
      if (toolIds.has(tool.id)) {
        errors.push(`${file}: Duplicate tool ID '${tool.id}'`);
        continue;
      }
      toolIds.add(tool.id);

      // Validate filename matches ID
      const expectedFilename = `${tool.id}.json`;
      if (!file.endsWith(expectedFilename)) {
        errors.push(`${file}: Filename should be '${expectedFilename}' to match ID '${tool.id}'`);
      }

      console.log(`✅ ${file}: Valid`);
    } catch (error) {
      errors.push(`${file}: Failed to parse JSON - ${error}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

async function validateTips(): Promise<ValidationResult> {
  console.log('🔍 Validating tips...');
  
  const errors: string[] = [];
  const tipSchema = await loadSchema('schemas/tip.frontmatter.schema.json');
  const validate = ajv.compile(tipSchema);
  
  const tipFiles = await glob('src/data/tips/*.md', { cwd: join(__dirname, '..') });
  
  if (tipFiles.length === 0) {
    errors.push('No tip files found in src/data/tips/');
    return { valid: false, errors };
  }

  const tipIds = new Set<string>();
  
  for (const file of tipFiles) {
    try {
      const content = readFileSync(join(__dirname, '..', file), 'utf-8');
      const { data: frontmatter, content: markdownContent } = matter(content);
      
      if (!validate(frontmatter)) {
        errors.push(`${file}: ${ajv.errorsText(validate.errors)}`);
        continue;
      }

      // Check for duplicate IDs
      if (tipIds.has(frontmatter.id)) {
        errors.push(`${file}: Duplicate tip ID '${frontmatter.id}'`);
        continue;
      }
      tipIds.add(frontmatter.id);

      // Validate filename matches ID
      const expectedFilename = `${frontmatter.id}.md`;
      if (!file.endsWith(expectedFilename)) {
        errors.push(`${file}: Filename should be '${expectedFilename}' to match ID '${frontmatter.id}'`);
      }

      // Check that content exists
      if (!markdownContent.trim()) {
        errors.push(`${file}: Tip content cannot be empty`);
      }

      console.log(`✅ ${file}: Valid`);
    } catch (error) {
      errors.push(`${file}: Failed to parse frontmatter - ${error}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

async function validateCategories(): Promise<ValidationResult> {
  console.log('🔍 Validating categories...');
  
  const errors: string[] = [];
  
  try {
    const categoriesPath = join(__dirname, '..', 'src/data/categories.json');
    const categories = JSON.parse(readFileSync(categoriesPath, 'utf-8'));
    
    if (!Array.isArray(categories)) {
      errors.push('categories.json should be an array');
      return { valid: false, errors };
    }

    if (categories.length === 0) {
      errors.push('categories.json should not be empty');
      return { valid: false, errors };
    }

    // Check for duplicates
    const uniqueCategories = new Set(categories);
    if (uniqueCategories.size !== categories.length) {
      errors.push('categories.json contains duplicate categories');
    }

    // Check that all categories are strings
    for (const category of categories) {
      if (typeof category !== 'string') {
        errors.push(`Category '${category}' is not a string`);
      }
    }

    console.log(`✅ Found ${categories.length} categories`);
  } catch (error) {
    errors.push(`Failed to parse categories.json - ${error}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

async function main() {
  console.log('🚀 Starting validation...\n');

  const results = await Promise.all([
    validateCategories(),
    validateTools(),
    validateTips()
  ]);

  let hasErrors = false;
  let totalErrors = 0;

  for (const result of results) {
    if (!result.valid) {
      hasErrors = true;
      totalErrors += result.errors.length;
      
      console.log('\n❌ Validation errors:');
      result.errors.forEach(error => console.log(`   ${error}`));
    }
  }

  if (hasErrors) {
    console.log(`\n💥 Validation failed with ${totalErrors} error${totalErrors !== 1 ? 's' : ''}.`);
    process.exit(1);
  } else {
    console.log('\n🎉 All validations passed!');
  }
}

main().catch(error => {
  console.error('💥 Validation script failed:', error);
  process.exit(1);
});