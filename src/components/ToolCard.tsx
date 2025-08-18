import { Link } from 'react-router-dom';
import type { Tool } from '../lib/schemas';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const pricingColors = {
    'Free': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Freemium': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Paid': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Open Source': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <Link 
            to={`/tools/${tool.id}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {tool.name}
          </Link>
        </h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${pricingColors[tool.pricing]}`}>
          {tool.pricing}
        </span>
      </div>
      
      <div className="mb-3">
        <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
          {tool.category}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {tool.summary}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {tool.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag}
            className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded"
          >
            {tag}
          </span>
        ))}
        {tool.tags.length > 3 && (
          <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
            +{tool.tags.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
        >
          Visit Website →
        </a>
        <Link
          to={`/tools/${tool.id}`}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm transition-colors"
        >
          Details
        </Link>
      </div>
    </div>
  );
}