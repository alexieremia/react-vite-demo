import type { Ratings } from "../types";

interface StarProps {
  filled: boolean;
}

function Star({ filled }: StarProps) {
  return (
    <svg
      className={`h-4 w-4 ${filled ? "text-amber-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

interface RatingProps {
  value: number;
  max?: number;
  label?: string;
}

export function Rating({ value, max = 5, label }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      {label && (
        <span className="text-sm text-gray-600 mr-1">{label}:</span>
      )}
      <div
        className="flex"
        role="img"
        aria-label={`${value} out of ${max} stars${label ? ` for ${label}` : ""}`}
      >
        {Array.from({ length: max }, (_, i) => (
          <Star key={i} filled={i < value} />
        ))}
      </div>
    </div>
  );
}

interface RatingGroupProps {
  ratings: Ratings;
}

export function RatingGroup({ ratings }: RatingGroupProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Rating value={ratings.taste} label="Taste" />
      <Rating value={ratings.texture} label="Texture" />
      <Rating value={ratings.presentation} label="Presentation" />
    </div>
  );
}

interface InteractiveRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  label: string;
}

export function InteractiveRating({
  value,
  onChange,
  max = 5,
  label,
}: InteractiveRatingProps) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-gray-700 mb-1">{label}</legend>
      <div className="flex gap-1" role="radiogroup" aria-label={label}>
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(starValue)}
              className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
              aria-label={`${starValue} star${starValue !== 1 ? "s" : ""}`}
              aria-pressed={value >= starValue}
            >
              <svg
                className={`h-6 w-6 transition-colors ${
                  value >= starValue ? "text-amber-400" : "text-gray-300 hover:text-amber-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
