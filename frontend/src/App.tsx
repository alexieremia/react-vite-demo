import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components";
import {
  Feed,
  Restaurants,
  RestaurantDetail,
  Login,
  Register,
  Profile,
  CreateReview,
} from "./pages";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/explore" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/create-review" element={<CreateReview />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
