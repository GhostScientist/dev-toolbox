import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Callout } from '../components/Callout';
import { Search } from '../components/Search';
import { CategorySelect } from '../components/CategorySelect';
import { TagFilter } from '../components/TagFilter';
import { ToolCard } from '../components/ToolCard';
import { TipCard } from '../components/TipCard';
import { EmptyState } from '../components/EmptyState';
import { loadAllData } from '../lib/loadData';
import { createToolSearch, createTipSearch } from '../lib/fuse';
import type { Tool, Tip } from '../lib/schemas';

export function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData().then(({ tools, tips }) => {
      setTools(tools);
      setTips(tips);
      
      // Extract all unique tags
      const toolTags = tools.flatMap(tool => tool.tags);
      const tipTags = tips.flatMap(tip => tip.tags);
      const uniqueTags = [...new Set([...toolTags, ...tipTags])].sort();
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

    return result.slice(0, 6);
  }, [tools, searchQuery, selectedCategory, selectedTags]);

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

    return result.slice(0, 3);
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading tools and tips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Callout type="info" className="mb-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome! Start your adventure here 🚀</h2>
          <p className="mb-2">
            You may have come from the blog post{' '}
            <a 
              href="#" 
              className="font-medium underline hover:no-underline"
            >
              Shipping your first feature with Claude Code
            </a>
            … if so, yay! If not, you may want to check it out alongside this repo.
          </p>
          <p className="text-sm opacity-90">
            This is a crowd-curated directory of developer tools and tips, built by the community for the community AND an interactive learning resource.
          </p>
        </div>
      </Callout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
          Discover Developer Tools & Tips
        </h1>
        
        <div className="space-y-6">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tools and tips..."
            className="w-full"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <CategorySelect
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full sm:w-auto"
            />
            
            {(searchQuery || selectedCategory || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
          
          <TagFilter
            tags={allTags.slice(0, 12)}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Tools
            </h2>
            <Link
              to="/tools"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View all →
            </Link>
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
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Latest Tips
            </h2>
            <Link
              to="/tips"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View all →
            </Link>
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
        </section>
      </div>
    </div>
  );
}