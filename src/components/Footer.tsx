import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Dev Toolbox</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              A crowd-curated directory of developer tools and tips, built by the community for the community.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Contribute</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="/contribute" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Add a Tool
                </a>
              </li>
              <li>
                <a href="/contribute" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Share a Tip
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/dev-toolbox/dev-toolbox" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Code of Conduct
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contributing Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Made with ❤️ by the developer community. Open source and always free.
          </p>
        </div>
      </div>
    </footer>
  );
}