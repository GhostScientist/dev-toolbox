import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}

export function TagFilter({ tags, selectedTags, onTagToggle, className = '' }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-sm font-medium text-muted-foreground">Filter by tags:</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Button
              key={tag}
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTagToggle(tag)}
              className={cn(
                'h-7 text-xs transition-all duration-200',
                isSelected && 'shadow-md scale-105',
                !isSelected && 'hover:scale-105 hover:shadow-sm'
              )}
            >
              {tag}
              {isSelected && (
                <span className="ml-1 text-xs opacity-70">✓</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}