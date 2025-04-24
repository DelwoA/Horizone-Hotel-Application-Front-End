import { Button } from "@/components/ui/button.jsx";
import { Globe } from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton.jsx";

/**
 * Navigation Component
 *
 * Provides the main navigation bar with responsive design for both mobile and desktop.
 * Features:
 * - Responsive layout with mobile menu
 * - Authentication-aware UI (different options for signed-in/signed-out users)
 * - Role-based access control (admin-only features)
 * - Animated dropdown menu for mobile view
 * - Language selector
 */
const Navigation = () => {
  // Authentication state from Clerk
  const { user, isLoaded, isSignedIn } = useUser();

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu with propagation stopped to prevent document handler conflicts
  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const closeMenu = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Only attach listener when menu is open to improve performance
    if (isMenuOpen) {
      document.addEventListener("click", closeMenu);
    }

    // Clean up event listener on unmount or when dependencies change
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <nav className="flex justify-between items-center bg-white px-8 py-4 mx-1 md:mx-20 lg:mx-52">
      {/* ===== Left side: Brand and admin links ===== */}
      <div className="flex items-center h-9">
        {/* Brand logo/name with link to homepage */}
        {!isLoaded ? (
          // Skeleton for brand name while loading
          <Skeleton className="h-8 w-28" />
        ) : (
          <Link to="/" className="font-bold text-teal-800 text-2xl md:text-2xl">
            Horizone
          </Link>
        )}

        {/* Admin-only navigation - visible only on tablet and larger screens */}
        {!isLoaded ? (
          // Skeleton for potential admin link
          <Skeleton className="hidden sm:block ml-8 h-6 w-24" />
        ) : (
          user?.publicMetadata?.role === "admin" && (
            <div className="hidden sm:block ml-8 font-medium text-teal-800 hover:text-teal-600 transition-colors">
              <Link to={"/admin/hotels/create"}>Create Hotel</Link>
            </div>
          )
        )}
      </div>

      {/* ===== Right side: Actions and user controls ===== */}
      <div className="flex items-center space-x-2 sm:space-x-4 h-9">
        {/* Language selector - hidden on mobile */}
        {!isLoaded ? (
          // Skeleton for language selector
          <Skeleton className="hidden sm:block h-9 w-16" />
        ) : (
          <Button
            variant="ghost"
            className="font-semibold text-xs text-teal-800 hover:text-primary-color sm:text-sm hidden sm:flex"
          >
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> EN
          </Button>
        )}

        {/* Loading skeletons for auth buttons */}
        {!isLoaded && (
          <>
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-20" />
          </>
        )}

        {/* Authentication buttons for signed-out users */}
        {isLoaded && (
          <SignedOut>
            <Button
              variant="ghost"
              className="font-semibold text-xs text-teal-600 hover:bg-teal-50 hover:text-teal-600 sm:text-sm h-9"
              asChild
            >
              <Link to={"/sign-in"}>Log In</Link>
            </Button>
            <Button
              className="font-semibold text-xs text-white bg-teal-600 hover:bg-teal-700 hover:text-white sm:text-sm h-9"
              asChild
            >
              <Link to={"/sign-up"}>Sign Up</Link>
            </Button>
          </SignedOut>
        )}

        {/* User profile and account access for signed-in users */}
        {isLoaded && (
          <SignedIn>
            <UserButton />
            <Button
              className="font-semibold text-xs text-white bg-teal-600 hover:bg-teal-700 hover:text-white sm:text-sm h-9"
              asChild
            >
              <Link to={"/account"}>My Account</Link>
            </Button>
          </SignedIn>
        )}

        {/* Mobile menu with dropdown - visible only on small screens */}
        <div className="sm:hidden relative">
          {!isLoaded ? (
            // Skeleton for mobile menu button
            <Skeleton className="h-7 w-7 rounded-full" />
          ) : (
            <>
              {/* Mobile menu toggle button with animation */}
              <div
                className={`flex items-center justify-center h-7 w-7 rounded-full transition-colors duration-200 ${
                  isMenuOpen ? "bg-teal-50" : "hover:bg-teal-50/50"
                }`}
                onClick={handleMenuClick}
              >
                <EllipsisVertical className="h-4 w-4 text-teal-800 cursor-pointer" />
              </div>

              {/* Dropdown menu with smooth animation */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200
                  transition-all duration-200 ease-in-out transform origin-top-right
                  ${
                    isMenuOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from closing it
              >
                {/* Navigation menu items */}
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-teal-800 hover:bg-teal-50 transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                {user?.publicMetadata?.role === "admin" && (
                  <Link
                    to="/admin/hotels/create"
                    className="block px-4 py-2 text-sm text-teal-800 hover:bg-teal-50 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Hotel
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
