import React, { useState, useEffect } from 'react';
import { Search } from '../components/Search';
import { CategorySelect } from '../components/CategorySelect';
import { TagFilter } from '../components/TagFilter';
import { ToolCard } from '../components/ToolCard';
import { EmptyState } from '../components/EmptyState';
import { loadToolsData } from '../lib/loadData';
import { createToolSearch } from '../lib/fuse';
import type { Tool } from '../lib/schemas';

export function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToolsData().then((tools) => {
      setTools(tools);
      
      const toolTags = tools.flatMap(tool => tool.tags);
      const uniqueTags = [...new Set(toolTags)].sort();
      setAllTags(uniqueTags);
      
      setLoading(false);
    });
  }, []);

  const filteredTools = React.useMemo(() => {
    let result = tools;

    if (selectedCategory) {
      result = result.filter(tool => tool.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter(tool => 
        selectedTags.some(tag => tool.tags.includes(tag))
      );
    }

    if (searchQuery.trim()) {
      const fuse = createToolSearch(result);
      const searchResults = fuse.search(searchQuery.trim());
      result = searchResults.map(result => result.item);
    }

    return result;
  }, [tools, searchQuery, selectedCategory, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTags([]);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Developer Tools
        </h1>
        
        <div className="space-y-6">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tools..."
            className="w-full"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CategorySelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full sm:w-auto"
            />
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
              </span>
              
              {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
          
          <TagFilter
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tools found"
          description="Try adjusting your search or filters to find more tools."
          action={{
            label: 'Clear filters',
            onClick: clearFilters
          }}
        />
      )}
    </div>
  );
}