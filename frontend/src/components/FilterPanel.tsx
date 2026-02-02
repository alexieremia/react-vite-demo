import { useState } from "react";
import type { SearchFilters } from "../types";
import { Button } from "./Button";
import { FilterIcon } from "./Icons";

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

const priceOptions = ["$", "$$", "$$$"];
const sortOptions: { value: SearchFilters["sortBy"]; label: string }[] = [
  { value: "distance", label: "Distance" },
  { value: "rating", label: "Rating" },
  { value: "reviews", label: "Most Reviews" },
];

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceToggle = (price: string) => {
    const newPrices = filters.priceRange.includes(price)
      ? filters.priceRange.filter((p) => p !== price)
      : [...filters.priceRange, price];
    onChange({ ...filters, priceRange: newPrices });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ ...filters, minRating: rating });
  };

  const handleOpenToggle = () => {
    onChange({ ...filters, isOpen: !filters.isOpen });
  };

  const handleSortChange = (sortBy: SearchFilters["sortBy"]) => {
    onChange({ ...filters, sortBy });
  };

  const handleReset = () => {
    onChange({
      query: filters.query,
      priceRange: [],
      minRating: 0,
      isOpen: false,
      sortBy: "distance",
    });
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="filter-panel"
        className="py-2.5"
      >
        <FilterIcon className="h-4 w-4 mr-2" />
        Filters
      </Button>

      {isOpen && (
        <div
          id="filter-panel"
          className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border p-4 z-10"
        >
          <div className="space-y-4">
            <fieldset>
              <legend className="text-sm font-medium text-gray-700 mb-2">
                Price Range
              </legend>
              <div className="flex gap-2">
                {priceOptions.map((price) => (
                  <button
                    key={price}
                    type="button"
                    onClick={() => handlePriceToggle(price)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      filters.priceRange.includes(price)
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-pressed={filters.priceRange.includes(price)}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </legend>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingChange(rating)}
                    className={`p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      filters.minRating >= rating ? "text-amber-400" : "text-gray-300"
                    }`}
                    aria-label={`${rating} stars minimum`}
                    aria-pressed={filters.minRating >= rating}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.isOpen}
                  onChange={handleOpenToggle}
                  className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-700">Open now</span>
              </label>
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-gray-700 mb-2">
                Sort By
              </legend>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSortChange(option.value)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      filters.sortBy === option.value
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-pressed={filters.sortBy === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="pt-2 border-t">
              <Button variant="ghost" size="sm" onClick={handleReset} fullWidth>
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
