import { Button } from "@/components/ui/button.jsx";
import { Globe } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navigation = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white px-8 py-4">
      <div className="flex items-center justify-between h-9">
        <Link to="" className="font-bold text-2xl">
          Horizone
        </Link>
        <div className="ml-8 font-medium">
          <Link to="/">Home</Link>
        </div>
        <div className="ml-8 font-medium">
          <Link to={"/hotels"}>Hotels</Link>
        </div>
        <div className="ml-8 font-medium">
          <Link to={"/hotels/create"}>Create Hotel</Link>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4 h-9">
        <Button variant="ghost" className="font-semibold text-sm">
          <Globe className="h-5 w-5 mr-2" /> EN
        </Button>
        <SignedOut>
          <Button variant="ghost" className="font-semibold text-sm" asChild>
            <Link to={"/sign-in"}>Log In</Link>
          </Button>
          <Button className="font-semibold text-sm" asChild>
            <Link to={"/sign-up"}>Sign Up</Link>
          </Button>
        </SignedOut>
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
