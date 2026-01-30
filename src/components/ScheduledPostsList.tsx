import { ScheduledPost } from '@/types/post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PostCard } from './PostCard';
import { CalendarDays, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ScheduledPostsListProps {
  posts: ScheduledPost[];
  onDelete: (id: string) => void;
  onEdit: (post: ScheduledPost) => void;
}

export function ScheduledPostsList({ posts, onDelete, onEdit }: ScheduledPostsListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
    const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  const filteredPosts = sortedPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Scheduled Posts</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Card className="shadow-card min-h-[400px]">
        <CardContent className="p-4">
          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <CalendarDays className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-center">
                {searchTerm ? 'No posts match your search.' : 'No posts scheduled. Create your first post!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onDelete={onDelete} onEdit={onEdit} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
