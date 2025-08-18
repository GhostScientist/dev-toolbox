import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Tool, Tip } from './schemas';

export const toolFuseOptions: IFuseOptions<Tool> = {
  keys: [
    { name: 'name', weight: 0.3 },
    { name: 'summary', weight: 0.2 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
    { name: 'why', weight: 0.2 },
  ],
  threshold: 0.3,
  includeScore: true,
};

export const tipFuseOptions: IFuseOptions<Tip> = {
  keys: [
    { name: 'title', weight: 0.3 },
    { name: 'content', weight: 0.2 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
    { name: 'summary', weight: 0.2 },
  ],
  threshold: 0.3,
  includeScore: true,
};

export function createToolSearch(tools: Tool[]) {
  return new Fuse(tools, toolFuseOptions);
}

export function createTipSearch(tips: Tip[]) {
  return new Fuse(tips, tipFuseOptions);
}