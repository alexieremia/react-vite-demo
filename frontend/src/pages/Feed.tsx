import { useFetch } from "../hooks";
import type { Post } from "../types";
import { PostCard, Skeleton } from "../components";

function PostSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex items-start gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-7 w-14 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full mt-4" />
      <Skeleton className="h-4 w-3/4 mt-2" />
      <Skeleton className="aspect-square w-full mt-4 rounded-2xl" />
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function Feed() {
  const { data: posts, loading, error } = useFetch<Post[]>("/api/posts");

  return (
    <div className="max-w-xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
        <p className="mt-1 text-sm text-gray-500">
          Latest burger reviews from the community
        </p>
      </header>

      {error && (
        <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4" role="feed" aria-label="Burger reviews">
        {loading && Array.from({ length: 3 }, (_, i) => <PostSkeleton key={i} />)}
        {posts?.map((post) => (
          <article key={post.id} aria-labelledby={`post-${post.id}-author`}>
            <PostCard post={post} />
          </article>
        ))}
        {!loading && posts?.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No posts yet. Be the first to share a review!
          </p>
        )}
      </div>
    </div>
  );
}
