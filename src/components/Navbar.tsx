import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  
  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/tools', label: 'Tools' },
    { path: '/tips', label: 'Tips' },
    { path: '/contribute', label: 'Contribute' },
  ];
  
  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="font-bold text-xl text-foreground">
              Dev Toolbox
            </Link>
            <div className="hidden md:flex space-x-6">
              {navigationItems.map(({ path, label }) => (
                <Button
                  key={path}
                  asChild
                  variant={isActive(path) ? 'secondary' : 'ghost'}
                  size="sm"
                >
                  <Link to={path}>{label}</Link>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map(({ path, label }) => (
                    <Button
                      key={path}
                      asChild
                      variant={isActive(path) ? 'secondary' : 'ghost'}
                      size="sm"
                      className="justify-start"
                      onClick={closeSheet}
                    >
                      <Link to={path}>{label}</Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}