import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-bold text-xl text-gray-900 dark:text-white">
              Dev Toolbox
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/') 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                to="/tools"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/tools') 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Tools
              </Link>
              <Link
                to="/tips"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/tips') 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Tips
              </Link>
              <Link
                to="/contribute"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/contribute') 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Contribute
              </Link>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}