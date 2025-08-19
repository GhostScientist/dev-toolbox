import categories from '../data/categories.json';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
  className?: string;
}

export function CategorySelect({ value, onChange, className = '' }: CategorySelectProps) {
  const handleValueChange = (selectedValue: string) => {
    // Convert "all" back to empty string for the parent component
    onChange(selectedValue === "all" ? "" : selectedValue);
  };

  // Convert empty string to "all" for the Select component
  const selectValue = value === "" ? "all" : value;

  return (
    <Select value={selectValue} onValueChange={handleValueChange}>
      <SelectTrigger className={`w-full sm:w-48 ${className}`}>
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}