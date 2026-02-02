import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Restaurant } from "../types";
import { LocationIcon, ClockIcon, StarIcon, PhoneIcon } from "./Icons";

interface StatusBadgeProps {
  isOpen: boolean;
}

function StatusBadge({ isOpen }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${
        isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {isOpen ? "Open Now" : "Closed"}
    </span>
  );
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
}

export function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase() as keyof typeof restaurant.hours;
  const todayHours = restaurant.hours[today];

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="h-full flex flex-col rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block relative overflow-hidden group">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
          <span className="text-white font-medium">View Details →</span>
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={`/restaurant/${restaurant.id}`}
            className="hover:text-amber-600 transition-colors"
          >
            <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
          </Link>
          <StatusBadge isOpen={restaurant.isOpen} />
        </div>

        <div className="mt-2 flex items-center gap-1 flex-wrap">
          <StarIcon className="h-4 w-4 text-amber-400" filled />
          <span className="text-sm font-medium text-gray-900">
            {restaurant.rating}
          </span>
          <span className="text-sm text-gray-500">
            ({restaurant.reviewCount})
          </span>
          <span className="mx-1 text-gray-300">·</span>
          <span className="text-sm text-gray-500">{restaurant.priceRange}</span>
          <span className="mx-1 text-gray-300">·</span>
          <span className="text-sm text-gray-500">{restaurant.distance}</span>
        </div>

        <div className="mt-3 space-y-2 flex-1">
          <div className="flex items-start gap-2">
            <LocationIcon className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <span className="text-sm text-gray-600 line-clamp-2">{restaurant.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 text-gray-400 shrink-0" />
            <span className="text-sm text-gray-600">{todayHours}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-gray-400 shrink-0" />
            <a
              href={`tel:${restaurant.phone}`}
              className="text-sm text-amber-600 hover:underline"
            >
              {restaurant.phone}
            </a>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {restaurant.specialties.map((specialty) => (
            <span
              key={specialty}
              className="inline-flex items-center px-2 py-1 rounded-md bg-amber-50 text-xs font-medium text-amber-700"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
