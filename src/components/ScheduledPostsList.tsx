import { ScheduledPost } from '@/types/post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCard } from './PostCard';
import { CalendarDays } from 'lucide-react';

interface ScheduledPostsListProps {
  posts: ScheduledPost[];
  onDelete: (id: string) => void;
}

export function ScheduledPostsList({ posts, onDelete }: ScheduledPostsListProps) {
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
    const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Scheduled Posts</h2>
      
      <Card className="shadow-card min-h-[400px]">
        <CardContent className="p-4">
          {sortedPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <CalendarDays className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-center">No posts scheduled. Create your first post!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} onDelete={onDelete} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
