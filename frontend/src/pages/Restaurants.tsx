import { useState, useMemo } from "react";
import { useFetch, useDebounce } from "../hooks";
import type { Restaurant, SearchFilters } from "../types";
import {
  RestaurantCard,
  RestaurantCardSkeleton,
  SearchBar,
  FilterPanel,
} from "../components";

function ErrorMessage({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}

export function Restaurants() {
  const { data: restaurants, loading, error } = useFetch<Restaurant[]>("/api/restaurants");

  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    priceRange: [],
    minRating: 0,
    isOpen: false,
    sortBy: "distance",
  });

  const debouncedQuery = useDebounce(filters.query, 300);

  const filteredRestaurants = useMemo(() => {
    if (!restaurants) return [];

    let result = restaurants.filter((restaurant) => {
      const matchesQuery =
        restaurant.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        restaurant.specialties.some((s) =>
          s.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

      const matchesPrice =
        filters.priceRange.length === 0 ||
        filters.priceRange.includes(restaurant.priceRange);

      const matchesRating = restaurant.rating >= filters.minRating;

      const matchesOpen = !filters.isOpen || restaurant.isOpen;

      return matchesQuery && matchesPrice && matchesRating && matchesOpen;
    });

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "distance":
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });

    return result;
  }, [restaurants, debouncedQuery, filters]);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
        <p className="mt-1 text-sm text-gray-500">
          Find burger spots near you
        </p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={filters.query}
            onChange={(query) => setFilters((f) => ({ ...f, query }))}
            placeholder="Search restaurants..."
          />
        </div>
        <FilterPanel filters={filters} onChange={setFilters} />
      </div>

      {error && <ErrorMessage message={error} />}

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Restaurant list"
      >
        {loading &&
          Array.from({ length: 3 }, (_, i) => (
            <RestaurantCardSkeleton key={i} />
          ))}
        {!loading && filteredRestaurants.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-8">
            No restaurants found matching your criteria.
          </p>
        )}
        {filteredRestaurants.map((restaurant, index) => (
          <div key={restaurant.id} role="listitem">
            <RestaurantCard restaurant={restaurant} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
