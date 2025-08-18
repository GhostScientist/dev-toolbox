import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-bold text-xl text-foreground">
              Dev Toolbox
            </Link>
            <div className="hidden md:flex space-x-6">
              <Button
                asChild
                variant={isActive('/') ? 'secondary' : 'ghost'}
                size="sm"
              >
                <Link to="/">Home</Link>
              </Button>
              <Button
                asChild
                variant={isActive('/tools') ? 'secondary' : 'ghost'}
                size="sm"
              >
                <Link to="/tools">Tools</Link>
              </Button>
              <Button
                asChild
                variant={isActive('/tips') ? 'secondary' : 'ghost'}
                size="sm"
              >
                <Link to="/tips">Tips</Link>
              </Button>
              <Button
                asChild
                variant={isActive('/contribute') ? 'secondary' : 'ghost'}
                size="sm"
              >
                <Link to="/contribute">Contribute</Link>
              </Button>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}