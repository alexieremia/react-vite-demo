import express from "express";
import cors from "cors";
import { users, restaurants, reviews, posts } from "./data.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

app.get("/api/restaurants/:id", (req, res) => {
  const restaurant = restaurants.find((r) => r.id === req.params.id);
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }
  res.json(restaurant);
});

app.get("/api/restaurants/:id/reviews", (req, res) => {
  const restaurantReviews = reviews.filter(
    (r) => r.restaurantId === req.params.id
  );
  res.json(restaurantReviews);
});

app.get("/api/reviews", (req, res) => {
  res.json(reviews);
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
