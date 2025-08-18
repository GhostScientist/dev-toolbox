interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}

export function TagFilter({ tags, selectedTags, onTagToggle, className = '' }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className={`${className}`}>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by tags:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}