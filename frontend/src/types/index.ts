export interface User {
  id: string;
  name: string;
  avatar: string;
  ringColor?: string;
  email?: string;
  bio?: string;
  reviewCount?: number;
  followerCount?: number;
  followingCount?: number;
}

export interface Ratings {
  taste: number;
  texture: number;
  presentation: number;
}

export interface RestaurantHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  image: string;
  hours: RestaurantHours;
  isOpen: boolean;
  specialties: string[];
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  content: string;
  ratings: Ratings;
  image?: string;
  date: string;
  likes: number;
}

export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  restaurant: {
    id: string;
    name: string;
  };
  content: string;
  image?: string;
  rating: number;
  likes: number;
  comments: number;
  liked: boolean;
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  priceRange: string[];
  minRating: number;
  isOpen: boolean;
  sortBy: "distance" | "rating" | "reviews";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}
