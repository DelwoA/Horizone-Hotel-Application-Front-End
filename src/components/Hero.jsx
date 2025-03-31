import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { submit } from "@/lib/features/searchSlice";

/**
 * Hero component - Main landing area with search functionality
 * Displays a prominent title, description, and AI-powered search bar
 */
const Hero = () => {
  // Access Redux dispatch to update search state
  const dispatch = useDispatch();

  /**
   * Handle search form submission
   * Prevents default form behavior and dispatches search query to Redux
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    console.log(searchQuery);

    // Update Redux state with the search query
    dispatch(submit(searchQuery));
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center  text-white justify-center px-8 pt-32 pb-32">
        <h1 className="text-4xl md:text-6xl font-bold  mb-8 text-center">
          Find Your Best Staycation
        </h1>
        <p className="text-xl  mb-12 text-center  max-w-2xl">
          Describe your dream destination and experience, and we'll find the
          perfect place for you.
        </p>

        {/* AI-powered search form */}

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-black/10  backdrop-blur-md lg:h-16 rounded-full p-2 flex items-center"
        >
          {/* Search input field with transparent styling */}
          <Input
            type="text"
            name="search"
            placeholder="Describe your destination..."
            className="bg-transparent border-none outline-none text-white placeholder:text-white/50 placeholder:text-sm sm:placeholder:text-lg placeholder:font-medium text-base sm:text-lg font-medium w-full"
          />

          {/* Search button with AI sparkle icon */}
          <Button
            type="submit"
            variant="default"
            className="flex items-center justify-center px-3 sm:px-4 text-white text-sm sm:text-lg font-semibold h-10 sm:h-12 rounded-full whitespace-nowrap ml-2"
          >
            <Sparkles
              style={{ width: "16px", height: "16px" }}
              className="mr-1 sm:mr-2 animate-pulse text-sky-400"
            />
            <span>AI Search</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
