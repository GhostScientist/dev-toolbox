import { Link } from 'react-router-dom';
import type { Tip } from '../lib/schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

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
    <Card className="hover:shadow-md transition-shadow group">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          <Link 
            to={`/tips/${tip.id}`}
            className="hover:text-primary transition-colors"
          >
            {tip.title}
          </Link>
        </CardTitle>
        <Badge variant="secondary" className="w-fit">
          {tip.category}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {tip.summary && (
          <p className="text-muted-foreground text-sm line-clamp-2">
            {tip.summary}
          </p>
        )}
        
        <div className="flex flex-wrap gap-1">
          {tip.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-green-500/5 text-green-600 border-green-500/20">
              {tag}
            </Badge>
          ))}
          {tip.tags.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{tip.tags.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{tip.added_by.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(tip.added_by.date)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}