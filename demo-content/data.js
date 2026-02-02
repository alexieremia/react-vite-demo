export const users = [
  {
    id: "1",
    name: "Andrei Popescu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    ringColor: "#f97316",
    bio: "Burger enthusiast from Bucharest",
    reviewCount: 12,
    followerCount: 89,
    followingCount: 45
  },
  {
    id: "2",
    name: "Maria Ionescu",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    ringColor: "#3b82f6",
    bio: "Food blogger",
    reviewCount: 28,
    followerCount: 234,
    followingCount: 67
  },
  {
    id: "3",
    name: "Alex Dumitru",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    ringColor: "#10b981",
    bio: "Always hunting for the best burger",
    reviewCount: 8,
    followerCount: 45,
    followingCount: 32
  }
];

export const restaurants = [
  {
    id: "1",
    name: "Burger Van",
    address: "Strada Franceza 12, Old Town, Bucharest",
    phone: "+40 721 123 456",
    distance: "0.3 km",
    rating: 4.8,
    reviewCount: 156,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop",
    hours: {
      monday: "12:00 - 22:00",
      tuesday: "12:00 - 22:00",
      wednesday: "12:00 - 22:00",
      thursday: "12:00 - 23:00",
      friday: "12:00 - 00:00",
      saturday: "12:00 - 00:00",
      sunday: "12:00 - 21:00"
    },
    isOpen: true,
    specialties: ["Smash Burgers", "Craft Beer"]
  },
  {
    id: "2",
    name: "Beef Brothers",
    address: "Bulevardul Unirii 45, Bucharest",
    phone: "+40 722 234 567",
    distance: "1.2 km",
    rating: 4.5,
    reviewCount: 98,
    priceRange: "$",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
    hours: {
      monday: "11:00 - 21:00",
      tuesday: "11:00 - 21:00",
      wednesday: "11:00 - 21:00",
      thursday: "11:00 - 21:00",
      friday: "11:00 - 22:00",
      saturday: "11:00 - 22:00",
      sunday: "12:00 - 20:00"
    },
    isOpen: true,
    specialties: ["Classic Burgers", "Loaded Fries"]
  },
  {
    id: "3",
    name: "The Patty Lab",
    address: "Strada Victoriei 89, Bucharest",
    phone: "+40 723 345 678",
    distance: "2.1 km",
    rating: 4.9,
    reviewCount: 234,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    hours: {
      monday: "Closed",
      tuesday: "12:00 - 22:00",
      wednesday: "12:00 - 22:00",
      thursday: "12:00 - 22:00",
      friday: "12:00 - 23:00",
      saturday: "11:00 - 23:00",
      sunday: "11:00 - 21:00"
    },
    isOpen: false,
    specialties: ["Wagyu Beef", "Truffle Burgers"]
  }
];

export const reviews = [
  {
    id: "1",
    restaurantId: "1",
    userId: "1",
    userName: "Andrei Popescu",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    title: "Best smash burger in Bucharest",
    content: "Crispy edges, juicy center, perfect cheese melt. This is how a smash burger should be.",
    ratings: { taste: 5, texture: 5, presentation: 4 },
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    date: "2026-01-08",
    likes: 24
  },
  {
    id: "2",
    restaurantId: "1",
    userId: "2",
    userName: "Maria Ionescu",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    title: "Great flavors",
    content: "The signature sauce is amazing. Will definitely come back.",
    ratings: { taste: 5, texture: 4, presentation: 4 },
    date: "2026-01-06",
    likes: 12
  },
  {
    id: "3",
    restaurantId: "2",
    userId: "3",
    userName: "Alex Dumitru",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    title: "Good value",
    content: "Generous portions and fair prices. The loaded fries are a must.",
    ratings: { taste: 4, texture: 4, presentation: 3 },
    date: "2026-01-04",
    likes: 8
  }
];

export const posts = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Andrei Popescu",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    restaurant: { id: "1", name: "Burger Van" },
    content: "Finally tried the smash burger here. Crispy edges, juicy center, perfect cheese melt. Exactly what a burger should be!",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    rating: 5,
    likes: 24,
    comments: 5,
    liked: false,
    createdAt: "2h ago"
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Maria Ionescu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    restaurant: { id: "3", name: "The Patty Lab" },
    content: "The wagyu burger is worth every penny. Melts in your mouth. This place knows what they're doing.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop",
    rating: 5,
    likes: 42,
    comments: 8,
    liked: true,
    createdAt: "5h ago"
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "Alex Dumitru",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    restaurant: { id: "2", name: "Beef Brothers" },
    content: "Great value for money. The loaded fries are a must-try. Perfect spot for a casual lunch.",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop",
    rating: 4,
    likes: 15,
    comments: 3,
    liked: false,
    createdAt: "1d ago"
  },
  {
    id: "4",
    user: {
      id: "2",
      name: "Maria Ionescu",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    restaurant: { id: "1", name: "Burger Van" },
    content: "Second visit and still impressed. Their signature sauce is something special.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop",
    rating: 4,
    likes: 18,
    comments: 2,
    liked: false,
    createdAt: "2d ago"
  }
];
