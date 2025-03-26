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
    <nav className="flex justify-between items-center p-4 bg-black text-white px-8 py-4">
      {/* Left side navigation links */}
      <div className="flex items-center justify-between h-9">
        {/* Site logo */}
        <Link to="/" className="font-bold text-2xl">
          Horizone
        </Link>

        {/* Main navigation links */}
        <div className="ml-8 font-medium">
          <Link to="/">Home</Link>
        </div>
        {/* <div className="ml-8 font-medium">
          <Link to={"/hotels"}>Hotels</Link>
        </div> */}

        {/* Admin-only navigation link - conditionally rendered based on user role */}
        {user?.publicMetadata?.role === "admin" && (
          <div className="ml-8 font-medium">
            <Link to={"/admin/hotels/create"}>Create Hotel</Link>
          </div>
        )}
      </div>

      {/* Right side UI elements */}
      <div className="flex items-center justify-between space-x-4 h-9">
        {/* Language selector */}
        <Button variant="ghost" className="font-semibold text-sm">
          <Globe className="h-5 w-5 mr-2" /> EN
        </Button>

        {/* Authentication buttons - shown only to signed out users */}
        <SignedOut>
          <Button variant="ghost" className="font-semibold text-sm" asChild>
            <Link to={"/sign-in"}>Log In</Link>
          </Button>
          <Button className="font-semibold text-sm" asChild>
            <Link to={"/sign-up"}>Sign Up</Link>
          </Button>
        </SignedOut>

        {/* User profile and account access - shown only to signed in users */}
        <SignedIn>
          <UserButton />
          <Button asChild>
            <Link to={"/account"}>My Account</Link>
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navigation;
