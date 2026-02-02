import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input, Button, Card } from "../components";

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await register(formData);
      navigate("/");
    } catch {
      setErrors({ form: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md" padding="lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Join BurgerSocial</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create your account to start sharing burger reviews
          </p>
        </div>

        {errors.form && (
          <div
            role="alert"
            className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((f) => ({ ...f, name: e.target.value }))
            }
            placeholder="John Doe"
            error={errors.name}
            required
            autoComplete="name"
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((f) => ({ ...f, email: e.target.value }))
            }
            placeholder="you@example.com"
            error={errors.email}
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
            error={errors.password}
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((f) => ({ ...f, confirmPassword: e.target.value }))
            }
            placeholder="••••••••"
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-600 font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
