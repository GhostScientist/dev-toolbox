import { Link } from 'react-router-dom';
import type { Tool } from '../lib/schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const pricingColors = {
    'Free': 'bg-green-500/10 text-green-600 border-green-500/20',
    'Freemium': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'Paid': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    'Open Source': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  };

  return (
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            <Link 
              to={`/tools/${tool.id}`}
              className="hover:text-primary transition-colors"
            >
              {tool.name}
            </Link>
          </CardTitle>
          <Badge className={pricingColors[tool.pricing]} variant="outline">
            {tool.pricing}
          </Badge>
        </div>
        <Badge variant="secondary" className="w-fit">
          {tool.category}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {tool.summary}
        </p>
        
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{tool.tags.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <Button asChild variant="link" size="sm" className="p-0 h-auto">
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Visit Website
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to={`/tools/${tool.id}`}>
              Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}