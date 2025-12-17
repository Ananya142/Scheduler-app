import { ScheduledPost, Platform } from '@/types/post';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Instagram, Linkedin, Calendar, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: ScheduledPost;
  onDelete: (id: string) => void;
}

const platformIcons: Record<Platform, React.ReactNode> = {
  twitter: <Twitter className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
};

const platformColors: Record<Platform, string> = {
  twitter: 'bg-twitter',
  facebook: 'bg-facebook',
  instagram: 'bg-instagram',
  linkedin: 'bg-linkedin',
};

export function PostCard({ post, onDelete }: PostCardProps) {
  const formattedDate = format(new Date(post.scheduledDate), 'MMM dd, yyyy');

  return (
    <Card className="post-card animate-fade-in">
      <CardContent className="p-4 space-y-3">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-32 object-cover rounded-md"
          />
        )}

        <div>
          <h3 className="font-semibold text-card-foreground">{post.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
        </div>

        <div className="flex items-center gap-2">
          {post.platforms.map((platform) => (
            <span
              key={platform}
              className={`${platformColors[platform]} text-primary-foreground p-1.5 rounded-md`}
            >
              {platformIcons[platform]}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.scheduledTime}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(post.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
