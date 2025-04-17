import { Button } from "@/components/ui/button.jsx";
import { Globe } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

/**
 * Navigation component - Main navigation bar for the application
 * Displays site logo, navigation links, language selector, and auth-related UI components
 * Shows different options based on user authentication status and admin role
 */
const Navigation = () => {
  // Get user data from Clerk authentication
  const { user } = useUser();

  return (
    <nav className="flex justify-between items-center bg-white px-4 sm:px-8 py-3 sm:py-4 mx-52">
      {/* Left side navigation links */}
      <div className="flex items-center h-9">
        {/* Site logo */}
        <Link
          to="/"
          className="font-bold text-teal-800 sm:text-3xl md:text-2xl"
        >
          Horizone
        </Link>

        {/* Admin-only navigation link - hidden on mobile */}
        {user?.publicMetadata?.role === "admin" && (
          <div className="hidden sm:block ml-8 font-medium text-teal-800 hover:text-teal-600 transition-colors">
            <Link to={"/admin/hotels/create"}>Create Hotel</Link>
          </div>
        )}
      </div>

      {/* Right side UI elements */}
      <div className="flex items-center space-x-2 sm:space-x-4 h-9">
        {/* Language selector */}
        <Button
          variant="ghost"
          className="font-semibold text-xs text-teal-800 hover:text-primary-color sm:text-sm hidden sm:flex"
        >
          <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" /> EN
        </Button>

        {/* Authentication buttons - shown only to signed out users */}
        <SignedOut>
          <Button
            variant="ghost"
            className="font-semibold text-xs text-white bg-teal-600 hover:bg-teal-700 hover:text-white sm:text-sm"
            asChild
          >
            <Link to={"/sign-in"}>Log In</Link>
          </Button>
          <Button
            className="font-semibold text-xs text-white bg-teal-500 hover:bg-teal-700 hover:text-white sm:text-sm"
            asChild
          >
            <Link to={"/sign-up"}>Sign Up</Link>
          </Button>
        </SignedOut>

        {/* User profile and account access - shown only to signed in users */}
        <SignedIn>
          <UserButton />
          <Button
            className="text-xs text-white bg-teal-600 hover:bg-teal-700 sm:text-sm"
            asChild
          >
            <Link to={"/account"}>My Account</Link>
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navigation;
