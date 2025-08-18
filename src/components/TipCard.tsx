import { Link } from 'react-router-dom';
import type { Tip } from '../lib/schemas';

interface TipCardProps {
  tip: Tip;
}

export function TipCard({ tip }: TipCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <Link 
            to={`/tips/${tip.id}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {tip.title}
          </Link>
        </h3>
      </div>
      
      <div className="mb-3">
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
          {tip.category}
        </span>
      </div>
      
      {tip.summary && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {tip.summary}
        </p>
      )}
      
      <div className="flex flex-wrap gap-1 mb-4">
        {tip.tags.slice(0, 4).map((tag) => (
          <span 
            key={tag}
            className="px-2 py-1 text-xs bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-300 rounded"
          >
            {tag}
          </span>
        ))}
        {tip.tags.length > 4 && (
          <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
            +{tip.tags.length - 4} more
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>By {tip.added_by.name}</span>
        <span>{formatDate(tip.added_by.date)}</span>
      </div>
    </div>
  );
}