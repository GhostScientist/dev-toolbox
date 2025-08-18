import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadTipsData } from '../lib/loadData';
import type { Tip } from '../lib/schemas';

export function TipDetail() {
  const { id } = useParams<{ id: string }>();
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    loadTipsData().then((tips) => {
      const foundTip = tips.find(t => t.id === id);
      if (foundTip) {
        setTip(foundTip);
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tip...</p>
        </div>
      </div>
    );
  }

  if (notFound || !tip) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tip Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The tip you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            to="/tips"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Browse All Tips
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm mb-8">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
          </li>
          <li>›</li>
          <li>
            <Link to="/tips" className="hover:text-gray-700 dark:hover:text-gray-300">Tips</Link>
          </li>
          <li>›</li>
          <li className="text-gray-900 dark:text-white">{tip.title}</li>
        </ol>
      </nav>

      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {tip.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                {tip.category}
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                By <span className="font-medium">{tip.added_by.name}</span> on{' '}
                {new Date(tip.added_by.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>

            {tip.summary && (
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {tip.summary}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {tip.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm bg-green-50 dark:bg-green-900/50 text-green-600 dark:text-green-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className="prose prose-gray dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: tip.content
                .replace(/^#\s+.+$/gm, '') // Remove the first h1 since we show title separately
                .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto"><code class="text-sm">$2</code></pre>')
                .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">$1</code>')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                .replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>')
                .replace(/^###\s+(.+)$/gm, '<h3 class="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-3">$1</h3>')
                .replace(/^-\s+(.+)$/gm, '<li class="mb-1">$1</li>')
                .replace(/(<li.*?<\/li>)/gs, '<ul class="list-disc list-inside space-y-1 mb-4 text-gray-600 dark:text-gray-300">$1</ul>')
                .replace(/^\d+\.\s+(.+)$/gm, '<li class="mb-2">$1</li>')
                .replace(/^(?!<[h|u|p|d])(.+)$/gm, '<p class="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">$1</p>')
            }}
          />
        </div>
      </article>
    </div>
  );
}