import { CreatePostForm } from '@/components/CreatePostForm';
import { ScheduledPostsList } from '@/components/ScheduledPostsList';
import { useScheduledPosts } from '@/hooks/useScheduledPosts';

const Index = () => {
  const { posts, addPost, deletePost } = useScheduledPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <header className="text-center mb-10">
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
            <CreatePostForm onSubmit={addPost} />
          </div>

          {/* Right Column - Scheduled Posts */}
          <div>
            <ScheduledPostsList posts={posts} onDelete={deletePost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
