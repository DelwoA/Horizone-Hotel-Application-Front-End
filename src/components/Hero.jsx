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
    <div className="py-32 px-8">
      {/* Hero heading and description */}
      <h1 className="text-white text-6xl font-bold mb-8 text-center">
        Find Your Best Staycation
      </h1>
      <p className="text-white text-xl font-medium mb-12 max-w-2xl mx-auto text-center">
        Describe your dream destination and experience, and we'll find the
        perfect place for you.
      </p>

      {/* AI-powered search form */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex p-2 rounded-full max-w-3xl items-center w-full bg-black/10 backdrop-blur-md shadow-lg"
        >
          {/* Search input field with transparent styling */}
          <Input
            type="text"
            name="search"
            placeholder="Describe your destination, experience, or hotel..."
            className="bg-transparent border-none outline-none text-white placeholder:text-white/50 placeholder:text-lg placeholder:font-medium text-lg font-medium w-full"
          />

          {/* Search button with AI sparkle icon */}
          <Button
            type="submit"
            variant="default"
            className="flex items-center justify-center px-4 text-white text-lg font-semibold w-48 h-12 rounded-full"
          >
            <Sparkles
              style={{ width: "20px", height: "20px" }}
              className="mr-2 animate-pulse text-sky-400"
            ></Sparkles>
            <div>AI Search</div>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
