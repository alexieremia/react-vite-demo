import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks";
import { useAuth } from "../context/AuthContext";
import type { Restaurant, Review } from "../types";
import {
  Avatar,
  Button,
  Card,
  Tabs,
  TabPanel,
  RatingGroup,
  RestaurantCardSkeleton,
  StarIcon,
  LocationIcon,
  PhoneIcon,
  HeartIcon,
  ShareIcon,
} from "../components";

function HoursTable({ hours }: { hours: Restaurant["hours"] }) {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ] as const;

  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  return (
    <table className="w-full text-sm">
      <tbody>
        {days.map((day) => (
          <tr
            key={day}
            className={day === today ? "bg-amber-50 font-medium" : ""}
          >
            <td className="py-2 capitalize">{day}</td>
            <td className="py-2 text-right text-gray-600">{hours[day]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <div className="border-b last:border-0 pb-4 last:pb-0">
      <div className="flex items-start gap-3">
        <Avatar src={review.userAvatar} alt={review.userName} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-900">{review.userName}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          <h4 className="mt-1 font-medium text-gray-800">{review.title}</h4>
          <div className="mt-2">
            <RatingGroup ratings={review.ratings} />
          </div>
          <p className="mt-2 text-sm text-gray-600">{review.content}</p>
          {review.image && (
            <img
              src={review.image}
              alt="Review"
              className="mt-3 h-32 w-48 rounded-lg object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

const restaurantTabs = [
  { id: "overview", label: "Overview" },
  { id: "reviews", label: "Reviews" },
  { id: "menu", label: "Menu" },
];

export function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaved, setIsSaved] = useState(false);

  const { data: restaurant, loading } = useFetch<Restaurant>(
    `/api/restaurants/${id}`
  );
  const { data: reviews } = useFetch<Review[]>(`/api/restaurants/${id}/reviews`);

  if (loading) {
    return <RestaurantCardSkeleton />;
  }

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-semibold text-gray-900">
          Restaurant not found
        </h1>
        <p className="mt-2 text-gray-600">
          The restaurant you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold">{restaurant.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-amber-400" filled />
                  <span className="ml-1 font-medium">{restaurant.rating}</span>
                </div>
                <span className="text-white/70">
                  ({restaurant.reviewCount} reviews)
                </span>
                <span className="text-white/70">·</span>
                <span>{restaurant.priceRange}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full transition-colors ${
                  isSaved
                    ? "bg-red-500 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                aria-label={isSaved ? "Remove from saved" : "Save restaurant"}
                aria-pressed={isSaved}
              >
                <HeartIcon className="h-5 w-5" filled={isSaved} />
              </button>
              <button
                type="button"
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Share restaurant"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {restaurant.specialties.map((specialty) => (
          <span
            key={specialty}
            className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-sm font-medium text-amber-800"
          >
            {specialty}
          </span>
        ))}
      </div>

      <Tabs
        tabs={restaurantTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <TabPanel id="overview" activeTab={activeTab}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card padding="md">
            <h3 className="font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <LocationIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-600">{restaurant.address}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-600 hover:underline"
                  >
                    Get directions
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <a
                  href={`tel:${restaurant.phone}`}
                  className="text-amber-600 hover:underline"
                >
                  {restaurant.phone}
                </a>
              </div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Opening Hours</h3>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  restaurant.isOpen
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {restaurant.isOpen ? "Open Now" : "Closed"}
              </span>
            </div>
            <HoursTable hours={restaurant.hours} />
          </Card>
        </div>

        {isAuthenticated && (
          <div className="mt-6">
            <Button
              onClick={() => navigate(`/create-review?restaurant=${id}`)}
              fullWidth
            >
              Write a Review
            </Button>
          </div>
        )}
      </TabPanel>

      <TabPanel id="reviews" activeTab={activeTab}>
        <Card padding="md">
          <div className="space-y-4">
            {reviews?.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No reviews yet. Be the first to review!
              </p>
            ) : (
              reviews?.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))
            )}
          </div>
        </Card>
      </TabPanel>

      <TabPanel id="menu" activeTab={activeTab}>
        <Card padding="md">
          <p className="text-center text-gray-500 py-8">
            Menu information coming soon.
          </p>
        </Card>
      </TabPanel>
    </div>
  );
}
