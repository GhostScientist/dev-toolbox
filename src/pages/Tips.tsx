import React, { useState, useEffect } from 'react';
import { Search } from '../components/Search';
import { CategorySelect } from '../components/CategorySelect';
import { TagFilter } from '../components/TagFilter';
import { TipCard } from '../components/TipCard';
import { EmptyState } from '../components/EmptyState';
import { loadTipsData } from '../lib/loadData';
import { createTipSearch } from '../lib/fuse';
import type { Tip } from '../lib/schemas';

export function Tips() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTipsData().then((tips) => {
      setTips(tips);
      
      const tipTags = tips.flatMap(tip => tip.tags);
      const uniqueTags = [...new Set(tipTags)].sort();
      setAllTags(uniqueTags);
      
      setLoading(false);
    });
  }, []);

  const filteredTips = React.useMemo(() => {
    let result = tips;

    if (selectedCategory) {
      result = result.filter(tip => tip.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter(tip => 
        selectedTags.some(tag => tip.tags.includes(tag))
      );
    }

    if (searchQuery.trim()) {
      const fuse = createTipSearch(result);
      const searchResults = fuse.search(searchQuery.trim());
      result = searchResults.map(result => result.item);
    }

    return result;
  }, [tips, searchQuery, selectedCategory, selectedTags]);

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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Developer Tips
        </h1>
        
        <div className="space-y-6">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tips..."
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
                {filteredTips.length} tip{filteredTips.length !== 1 ? 's' : ''}
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

      {filteredTips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tips found"
          description="Try adjusting your search or filters to find more tips."
          action={{
            label: 'Clear filters',
            onClick: clearFilters
          }}
        />
      )}
    </div>
  );
}