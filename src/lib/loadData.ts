import matter from 'gray-matter';
import type { Tool, Tip } from './schemas';
import { toolSchema, tipFrontmatterSchema } from './schemas';

async function loadToolsData(): Promise<Tool[]> {
  const tools: Tool[] = [];
  
  // Import all tool JSON files
  const toolModules = import.meta.glob('../data/tools/*.json', { eager: true });
  
  for (const path in toolModules) {
    const module = toolModules[path] as { default: unknown };
    try {
      const tool = toolSchema.parse(module.default);
      tools.push(tool);
    } catch (error) {
      console.error(`Invalid tool data in ${path}:`, error);
    }
  }
  
  return tools;
}

async function loadTipsData(): Promise<Tip[]> {
  const tips: Tip[] = [];
  
  // Import all tip markdown files
  const tipModules = import.meta.glob('../data/tips/*.md', { eager: true, as: 'raw' });
  
  for (const path in tipModules) {
    const content = tipModules[path] as string;
    try {
      const { data, content: markdownContent } = matter(content);
      const frontmatter = tipFrontmatterSchema.parse(data);
      tips.push({
        ...frontmatter,
        content: markdownContent,
      });
    } catch (error) {
      console.error(`Invalid tip data in ${path}:`, error);
    }
  }
  
  return tips;
}

export async function loadAllData() {
  const [tools, tips] = await Promise.all([
    loadToolsData(),
    loadTipsData(),
  ]);
  
  return { tools, tips };
}

export { loadToolsData, loadTipsData };