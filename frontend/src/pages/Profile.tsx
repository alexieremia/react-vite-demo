import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import type { User, Review } from "../types";
import {
  Avatar,
  Button,
  Card,
  Tabs,
  TabPanel,
  ProfileSkeleton,
  RatingGroup,
} from "../components";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center p-4 bg-amber-50 rounded-xl">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card padding="md" className="space-y-3">
      <div className="flex items-start gap-3">
        <img
          src={review.image}
          alt={review.title}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{review.title}</h3>
          <p className="text-sm text-gray-500">{review.date}</p>
          <div className="mt-2">
            <RatingGroup ratings={review.ratings} />
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">{review.content}</p>
    </Card>
  );
}

const profileTabs = [
  { id: "reviews", label: "Reviews" },
  { id: "saved", label: "Saved" },
  { id: "following", label: "Following" },
];

export function Profile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("reviews");

  const { data: user, loading: userLoading } = useFetch<User>(
    `/api/users/${id}`
  );
  const { data: reviews } = useFetch<Review[]>("/api/reviews");

  const userReviews = reviews?.filter((r) => r.userId === id) || [];

  if (userLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-semibold text-gray-900">User not found</h1>
        <p className="mt-2 text-gray-600">
          The profile you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="xl"
            ringColor={user.ringColor}
          />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            {user.email && (
              <p className="text-gray-600">{user.email}</p>
            )}
            {user.bio && (
              <p className="mt-2 text-gray-600">{user.bio}</p>
            )}
            <div className="mt-4 flex gap-2 justify-center sm:justify-start">
              <Button variant="primary" size="sm">
                Follow
              </Button>
              <Button variant="outline" size="sm">
                Message
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <StatCard label="Reviews" value={user.reviewCount || 0} />
          <StatCard label="Followers" value={user.followerCount || 0} />
          <StatCard label="Following" value={user.followingCount || 0} />
        </div>
      </Card>

      <Tabs tabs={profileTabs} activeTab={activeTab} onChange={setActiveTab} />

      <TabPanel id="reviews" activeTab={activeTab}>
        <div className="space-y-4">
          {userReviews.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No reviews yet.
            </p>
          ) : (
            userReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </TabPanel>

      <TabPanel id="saved" activeTab={activeTab}>
        <p className="text-center text-gray-500 py-8">
          No saved restaurants yet.
        </p>
      </TabPanel>

      <TabPanel id="following" activeTab={activeTab}>
        <p className="text-center text-gray-500 py-8">
          Not following anyone yet.
        </p>
      </TabPanel>
    </div>
  );
}
