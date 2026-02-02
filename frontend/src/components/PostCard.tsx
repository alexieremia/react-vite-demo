import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Post } from "../types";
import { Avatar } from "./Avatar";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { HeartIcon, CommentIcon, ShareIcon, StarIcon } from "./Icons";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

function ActionButton({ icon, label, count, active, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 p-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
        active ? "text-red-500" : "text-gray-900 hover:text-gray-500"
      }`}
      aria-label={label}
      aria-pressed={active}
    >
      {icon}
      {count !== undefined && <span className="text-sm">{count}</span>}
    </button>
  );
}

function formatDate(dateString: string): string {
  if (!dateString) return "30 January";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "30 January";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

interface Comment {
  id: string;
  user: { name: string; avatar: string };
  content: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: { name: "Burger Fan", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
      content: "Looks delicious! I need to try this place.",
      createdAt: "2024-01-30T10:00:00Z",
    },
    {
      id: "2",
      user: { name: "Food Lover", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      content: "Great review! The patty looks perfectly cooked.",
      createdAt: "2024-01-30T11:30:00Z",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (navigator.share) {
      await navigator.share({
        title: `${post.user.name}'s review of ${post.restaurant.name}`,
        text: post.content,
        url: window.location.href,
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      user: { name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
      content: newComment,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <>
      <motion.div
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        <Card>
          <div
            className="cursor-pointer"
            onClick={handleOpenModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpenModal()}
          >
          {/* Header - Instagram style */}
          <div className="flex items-center gap-2 px-3 py-2">
            <Link to={`/profile/${post.user.id}`} onClick={(e) => e.stopPropagation()}>
              <Avatar src={post.user.avatar} alt={post.user.name} size="sm" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                to={`/profile/${post.user.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-semibold text-sm text-gray-900 hover:text-gray-500"
              >
                {post.user.name}
              </Link>
              <Link
                to={`/restaurant/${post.restaurant.id}`}
                onClick={(e) => e.stopPropagation()}
                className="block text-xs text-gray-500 hover:underline"
              >
                {post.restaurant.name}
              </Link>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <StarIcon className="h-4 w-4" filled />
              <span className="text-xs font-semibold">{post.rating}</span>
            </div>
          </div>

          {/* Image */}
          {post.image && (
            <div className="px-3">
              <img
                src={post.image}
                alt={`${post.user.name}'s burger at ${post.restaurant.name}`}
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
            </div>
          )}

          {/* Actions - Instagram style */}
          <div className="px-3 pt-2">
            <div className="flex items-center gap-2">
              <ActionButton
                icon={<HeartIcon className="h-6 w-6" filled={liked} />}
                label={liked ? "Unlike" : "Like"}
                active={liked}
                onClick={handleLike}
              />
              <ActionButton
                icon={<CommentIcon className="h-6 w-6" />}
                label="Comments"
                onClick={(e) => {
                  e?.stopPropagation();
                  handleOpenModal();
                }}
              />
              <ActionButton
                icon={<ShareIcon className="h-6 w-6" />}
                label="Share"
                onClick={handleShare}
              />
            </div>

            {/* Likes count */}
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {likeCount} likes
            </p>

            {/* Caption */}
            <p className="text-sm text-gray-900 mt-1">
              <Link
                to={`/profile/${post.user.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-semibold hover:text-gray-500"
              >
                {post.user.name}
              </Link>{" "}
              <span className="text-gray-700">{post.content}</span>
            </p>

            {/* Comments preview */}
            {post.comments > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenModal();
                }}
                className="text-sm text-gray-500 mt-1 hover:text-gray-700"
              >
                View all {post.comments + comments.length - 2} comments
              </button>
            )}

            {/* Date */}
            <p className="text-[10px] text-gray-400 uppercase mt-2 pb-3">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
      </Card>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Post"
        size="lg"
      >
        <div className="-m-4">
          {/* Image */}
          {post.image && (
            <img
              src={post.image}
              alt={`${post.user.name}'s burger at ${post.restaurant.name}`}
              className="w-full aspect-[4/3] object-cover"
            />
          )}

          <div className="p-4">
            {/* Actions */}
            <div className="flex items-center gap-2">
              <ActionButton
                icon={<HeartIcon className="h-6 w-6" filled={liked} />}
                label={liked ? "Unlike" : "Like"}
                active={liked}
                onClick={handleLike}
              />
              <ActionButton
                icon={<CommentIcon className="h-6 w-6" />}
                label="Comments"
              />
              <ActionButton
                icon={<ShareIcon className="h-6 w-6" />}
                label="Share"
                onClick={handleShare}
              />
              <div className="ml-auto flex items-center gap-1 text-amber-500">
                <StarIcon className="h-4 w-4" filled />
                <span className="text-xs font-semibold">{post.rating}</span>
              </div>
            </div>

            {/* Likes */}
            <p className="text-sm font-semibold text-gray-900 mt-2">
              {likeCount} likes
            </p>

            {/* Caption */}
            <p className="text-sm text-gray-900 mt-1">
              <span className="font-semibold">{post.user.name}</span>{" "}
              <span className="text-gray-700">{post.content}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">@ {post.restaurant.name}</p>

            {/* Comments */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar src={comment.user.avatar} alt={comment.user.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold text-gray-900">{comment.user.name}</span>{" "}
                        <span className="text-gray-700">{comment.content}</span>
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(comment.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add comment */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 text-sm focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="text-sm font-semibold text-amber-500 hover:text-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
