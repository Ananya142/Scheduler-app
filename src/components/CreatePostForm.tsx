import { useState } from 'react';
import * as React from 'react';
import { ScheduledPost } from '@/types/post';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformSelector } from './PlatformSelector';
import { ImageUpload } from './ImageUpload';
import { toast } from 'sonner';
import { Calendar, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(1, 'Content is required').max(500, 'Content must be less than 500 characters'),
  image: z.string().optional(),
  platforms: z.array(z.enum(['twitter', 'facebook', 'instagram', 'linkedin'])).min(1, 'Select at least one platform'),
  scheduledDate: z.string().min(1, 'Date is required'),
  scheduledTime: z.string().min(1, 'Time is required'),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

interface CreatePostFormProps {
  onSubmit: (post: {
    title: string;
    content: string;
    image?: string;
    platforms: Platform[];
    scheduledDate: string;
    scheduledTime: string;
  }) => void;
  editingPost?: ScheduledPost | null;
  onCancelEdit?: () => void;
}

export function CreatePostForm({ onSubmit, editingPost, onCancelEdit }: CreatePostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      image: '',
      platforms: [],
      scheduledDate: '',
      scheduledTime: '',
    },
  });

  // Update form when editing post changes
  React.useEffect(() => {
    if (editingPost) {
      setValue('title', editingPost.title);
      setValue('content', editingPost.content);
      setValue('image', editingPost.image || '');
      setValue('platforms', editingPost.platforms);
      setValue('scheduledDate', editingPost.scheduledDate);
      setValue('scheduledTime', editingPost.scheduledTime);
    } else {
      reset();
    }
  }, [editingPost, setValue, reset]);

  const watchedPlatforms = watch('platforms');
  const watchedImage = watch('image');

  const onSubmitForm = (data: CreatePostFormData) => {
    onSubmit({
      title: data.title,
      content: data.content,
      image: data.image || undefined,
      platforms: data.platforms,
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
    });

    if (!editingPost) {
      reset();
    }
    toast.success(editingPost ? 'Post updated successfully!' : 'Post scheduled successfully!');
  };

  const handleCancel = () => {
    reset();
    onCancelEdit?.();
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          {editingPost ? 'Edit Post' : 'Create New Post'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-primary">
              Title
            </label>
            <Input
              id="title"
              placeholder="Enter post title"
              {...register('title')}
              className="bg-background"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-primary">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              {...register('content')}
              rows={4}
              className="bg-background resize-y"
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
            )}
          </div>

          <ImageUpload
            image={watchedImage}
            onChange={(value) => setValue('image', value || '')}
          />

          <PlatformSelector
            selected={watchedPlatforms}
            onChange={(platforms) => setValue('platforms', platforms)}
          />
          {errors.platforms && (
            <p className="text-sm text-destructive">{errors.platforms.message}</p>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">Schedule Date & Time</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  {...register('scheduledDate')}
                  className="pl-10 bg-background"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.scheduledDate && (
                  <p className="text-sm text-destructive">{errors.scheduledDate.message}</p>
                )}
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="time"
                  {...register('scheduledTime')}
                  className="pl-10 bg-background"
                />
                {errors.scheduledTime && (
                  <p className="text-sm text-destructive">{errors.scheduledTime.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" size="lg">
              {editingPost ? 'Update Post' : 'Schedule Post'}
            </Button>
            {editingPost && (
              <Button type="button" variant="outline" onClick={handleCancel} size="lg">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
