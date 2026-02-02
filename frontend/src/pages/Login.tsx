import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input, Button, Card } from "../components";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(formData);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md" padding="lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-600">
            Sign in to your BurgerSocial account
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((f) => ({ ...f, email: e.target.value }))
            }
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((f) => ({ ...f, password: e.target.value }))
            }
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-amber-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-amber-600 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
