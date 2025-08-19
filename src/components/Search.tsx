import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function Search({ value, onChange, placeholder = 'Search...', className = '' }: SearchProps) {
  const clearSearch = () => onChange('');
  
  return (
    <div className={cn('relative group', className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className={cn(
          'h-4 w-4 transition-colors duration-200',
          value ? 'text-primary' : 'text-muted-foreground group-focus-within:text-primary'
        )} />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'pl-10 pr-10 transition-all duration-200',
          value && 'ring-1 ring-primary/20'
        )}
      />
      {value && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="h-6 w-6 p-0 hover:bg-muted/50"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}