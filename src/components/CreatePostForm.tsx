import { useState } from 'react';
import { Platform } from '@/types/post';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformSelector } from './PlatformSelector';
import { ImageUpload } from './ImageUpload';
import { toast } from 'sonner';
import { Calendar, Clock } from 'lucide-react';

interface CreatePostFormProps {
  onSubmit: (post: {
    title: string;
    content: string;
    image?: string;
    platforms: Platform[];
    scheduledDate: string;
    scheduledTime: string;
  }) => void;
}

export function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!content.trim()) {
      toast.error('Please enter content');
      return;
    }

    if (platforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }

    if (!scheduledDate) {
      toast.error('Please select a date');
      return;
    }

    if (!scheduledTime) {
      toast.error('Please select a time');
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      image: image || undefined,
      platforms,
      scheduledDate,
      scheduledTime,
    });

    // Reset form
    setTitle('');
    setContent('');
    setImage(null);
    setPlatforms([]);
    setScheduledDate('');
    setScheduledTime('');

    toast.success('Post scheduled successfully!');
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-primary">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-primary">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="bg-background resize-y"
            />
          </div>

          <ImageUpload image={image} onChange={setImage} />

          <PlatformSelector selected={platforms} onChange={setPlatforms} />

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Schedule Date & Time</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="pl-10 bg-background"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Schedule Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
