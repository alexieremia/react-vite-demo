import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, LoginCredentials, RegisterData } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: User = {
  id: "1",
  name: "Andrei Popescu",
  email: "andrei@example.com",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  ringColor: "#f97316",
  bio: "Burger enthusiast from Bucharest",
  reviewCount: 12,
  followerCount: 89,
  followingCount: 45,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (_credentials: LoginCredentials) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser(MOCK_USER);
  }, []);

  const register = useCallback(async (_data: RegisterData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser(MOCK_USER);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
