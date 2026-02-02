import { useState, type ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { MenuIcon, CloseIcon } from "./Icons";

const navLinks = [
  { to: "/", label: "Feed" },
  { to: "/explore", label: "Explore" },
];

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-bold text-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                🍔 BurgerSocial
              </motion.span>
            </Link>

            <ul className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        isActive
                          ? "bg-amber-100 text-amber-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="menu"
                >
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                </motion.button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-1 z-50"
                      role="menu"
                    >
                      <Link
                        to={`/profile/${user.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-1" />
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/register")}>Sign Up</Button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t py-4 overflow-hidden"
              role="menu"
            >
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg text-base font-medium ${
                          isActive
                            ? "bg-amber-100 text-amber-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`
                      }
                      role="menuitem"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                {!isAuthenticated && (
                  <>
                    <li className="pt-4 border-t mt-4">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
                        role="menuitem"
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-base font-medium text-amber-600 hover:bg-amber-50 rounded-lg"
                        role="menuitem"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-cream">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      >
        {children}
      </main>
    </div>
  );
}
