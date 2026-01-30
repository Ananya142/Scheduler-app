import { CreatePostForm } from '@/components/CreatePostForm';
import { ScheduledPostsList } from '@/components/ScheduledPostsList';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';
import { ScheduledPost } from '@/types/post';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const { posts, addPost, deletePost, updatePost } = useScheduledPosts();
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);

  const handleSubmit = (postData: Parameters<typeof addPost>[0]) => {
    if (editingPost) {
      updatePost(editingPost.id, postData);
      setEditingPost(null);
    } else {
      addPost(postData);
    }
  };

  const handleEdit = (post: ScheduledPost) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <header className="text-center mb-10 relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Social Media Scheduler
          </h1>
          <p className="text-muted-foreground">
            Plan and schedule your social media content in one place
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Create Post */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Create Post</h2>
            <CreatePostForm
              onSubmit={handleSubmit}
              editingPost={editingPost}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* Right Column - Scheduled Posts */}
          <div>
            <ScheduledPostsList
              posts={posts}
              onDelete={deletePost}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
