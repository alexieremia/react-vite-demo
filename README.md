# Burger Social

A React + Vite social media demo for burger enthusiasts. Browse reviews, like posts, and discover the best burger spots.

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Simple Node.js/Express server serving mock data

## Project Structure

```
burger-social/
├── frontend/          # React application
└── backend/           # Simple Express API with demo content
```

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

Install dependencies for both frontend and backend:

```bash
npm run install:all
```

### Development

Start the development server:

```bash
npm run dev
```

This runs both the frontend (http://localhost:3000) and backend (mock demo content) API concurrently.

### Demo Content

The backend is a simple Node.js server that provides mock data for:
- Users and profiles
- Restaurants
- Reviews and posts

No database required - all data is stored in memory for demo purposes.

## Build

Build the frontend for production:

```bash
npm run build
```

## Features

- Browse burger reviews in an Instagram-style feed
- Like and comment on posts
- View restaurant details and ratings
- User profiles with review history