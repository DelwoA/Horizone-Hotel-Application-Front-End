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
    <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8">
      {/* Hero heading and description */}
      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
        Find Your Best Staycation
      </h1>
      <p className="text-white text-base sm:text-lg md:text-xl font-medium mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-center">
        Describe your dream destination and experience, and we'll find the
        perfect place for you.
      </p>

      {/* AI-powered search form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-full p-2 max-w-sm sm:max-w-xl md:max-w-3xl w-full bg-black/10 backdrop-blur-md shadow-lg"
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
