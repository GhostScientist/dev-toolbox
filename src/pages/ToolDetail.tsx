import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadToolsData } from '../lib/loadData';
import type { Tool } from '../lib/schemas';

export function ToolDetail() {
  const { id } = useParams<{ id: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    loadToolsData().then((tools) => {
      const foundTool = tools.find(t => t.id === id);
      if (foundTool) {
        setTool(foundTool);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tool details...</p>
        </div>
      </div>
    );
  }

  if (notFound || !tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tool Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The tool you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/tools"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    );
  }

  const pricingColors = {
    'Free': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Freemium': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Paid': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'Open Source': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm mb-8">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
          </li>
          <li>›</li>
          <li>
            <Link to="/tools" className="hover:text-gray-700 dark:hover:text-gray-300">Tools</Link>
          </li>
          <li>›</li>
          <li className="text-gray-900 dark:text-white">{tool.name}</li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {tool.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  {tool.category}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${pricingColors[tool.pricing]}`}>
                  {tool.pricing}
                </span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {tool.summary}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Why Use This Tool?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {tool.why}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Getting Started
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {tool.getting_started}
              </p>
            </section>
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Links
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Visit Website →
              </a>
              
              {tool.github && (
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  View on GitHub →
                </a>
              )}
              
              {tool.docs && (
                <a
                  href={tool.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Documentation →
                </a>
              )}
            </div>
          </section>

          <footer className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Added by <span className="font-medium">{tool.added_by.name}</span> on{' '}
              {new Date(tool.added_by.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}