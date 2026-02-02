import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks";
import type { Restaurant, Ratings } from "../types";
import {
  Card,
  Input,
  TextArea,
  Button,
  ImageUpload,
  InteractiveRating,
} from "../components";

export function CreateReview() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedRestaurant = searchParams.get("restaurant");

  const { data: restaurants } = useFetch<Restaurant[]>("/api/restaurants");

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    restaurantId: preselectedRestaurant || "",
    title: "",
    content: "",
  });
  const [ratings, setRatings] = useState<Ratings>({
    taste: 0,
    texture: 0,
    presentation: 0,
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.restaurantId) {
      newErrors.restaurantId = "Please select a restaurant";
    }

    if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (formData.content.length < 20) {
      newErrors.content = "Review must be at least 20 characters";
    }

    if (ratings.taste === 0 || ratings.texture === 0 || ratings.presentation === 0) {
      newErrors.ratings = "Please rate all categories";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    void { ...formData, ratings, image };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card padding="lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Write a Review</h1>
          <p className="mt-1 text-sm text-gray-600">
            Share your burger experience with fellow enthusiasts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="restaurant"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant
            </label>
            <select
              id="restaurant"
              value={formData.restaurantId}
              onChange={(e) =>
                setFormData((f) => ({ ...f, restaurantId: e.target.value }))
              }
              className={`block w-full rounded-lg border ${
                errors.restaurantId ? "border-red-500" : "border-gray-300"
              } px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none`}
              aria-invalid={!!errors.restaurantId}
              aria-describedby={
                errors.restaurantId ? "restaurant-error" : undefined
              }
            >
              <option value="">Select a restaurant</option>
              {restaurants?.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
            {errors.restaurantId && (
              <p id="restaurant-error" className="mt-1 text-sm text-red-600">
                {errors.restaurantId}
              </p>
            )}
          </div>

          <Input
            label="Review Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((f) => ({ ...f, title: e.target.value }))
            }
            placeholder="e.g., Best smash burger in town!"
            error={errors.title}
            required
          />

          <TextArea
            label="Your Review"
            value={formData.content}
            onChange={(e) =>
              setFormData((f) => ({ ...f, content: e.target.value }))
            }
            placeholder="Tell us about your experience..."
            rows={5}
            error={errors.content}
            required
          />

          <fieldset>
            <legend className="text-sm font-medium text-gray-700 mb-3">
              Rate Your Experience
            </legend>
            {errors.ratings && (
              <p className="mb-2 text-sm text-red-600">{errors.ratings}</p>
            )}
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <InteractiveRating
                label="Taste"
                value={ratings.taste}
                onChange={(value) =>
                  setRatings((r) => ({ ...r, taste: value }))
                }
              />
              <InteractiveRating
                label="Texture"
                value={ratings.texture}
                onChange={(value) =>
                  setRatings((r) => ({ ...r, texture: value }))
                }
              />
              <InteractiveRating
                label="Presentation"
                value={ratings.presentation}
                onChange={(value) =>
                  setRatings((r) => ({ ...r, presentation: value }))
                }
              />
            </div>
          </fieldset>

          <ImageUpload
            label="Add a Photo"
            onImageSelect={setImage}
            maxSizeMB={5}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="flex-1">
              Submit Review
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
