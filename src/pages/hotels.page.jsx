import {
  useGetHotelsForSearchQueryQuery,
  useGetFilteredSortedHotelsQuery,
} from "@/lib/api";
import { useState, useEffect } from "react";
import HotelCard from "@/components/HotelCard";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSortControls from "@/components/FilterSortControls";

/**
 * HotelListings Page Component
 *
 * This page displays a list of all hotels with advanced filtering and sorting capabilities.
 * Features:
 * - Search mode: Uses AI-based similarity search to find hotels
 * - Filter mode: Allows multi-location filtering and price sorting on the server side
 * - Responsive grid layout with different column counts based on screen size
 * - Loading states with skeleton placeholders
 * - Error handling with user-friendly messages
 *
 * The component implements a separation of concerns pattern:
 * - This component handles data fetching, state management, and layout
 * - Filter/sort UI is delegated to the FilterSortControls component
 * - Individual hotel display is delegated to the HotelCard component
 *
 * @component
 * @returns {JSX.Element} - Rendered component
 */
const HotelListings = () => {
  // Get the search query from Redux store
  // This is populated from the global search bar
  const searchValue = useSelector((state) => state.search.value);

  /**
   * STATE MANAGEMENT
   */

  // Filter and sort options state object
  // This is passed to the API call and received from the FilterSortControls component
  const [filterOptions, setFilterOptions] = useState({
    locations: [], // Array of selected location filters
    sortBy: "price", // Field to sort by (currently only "price" is supported)
    sortOrder: "none", // Sort direction: "none", "asc", or "desc"
  });

  // Track whether we're using search mode or filter mode
  // This determines which API endpoint to use
  const [isUsingSearch, setIsUsingSearch] = useState(false);

  /**
   * EFFECTS
   */

  // Detect when search is being used vs. normal browsing mode
  // Updates on searchValue change from the Redux store
  useEffect(() => {
    setIsUsingSearch(searchValue && searchValue.trim() !== "");
  }, [searchValue]);

  /**
   * DATA FETCHING
   */

  // Query for AI-based similarity search results
  // Only executed when isUsingSearch is true
  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useGetHotelsForSearchQueryQuery(
    { query: searchValue },
    { skip: !isUsingSearch } // Skip this query when not in search mode
  );

  // Query for filtered and sorted hotels
  // Used for regular browsing with server-side filtering/sorting
  // Only executed when isUsingSearch is false
  const {
    data: filteredSortedHotels,
    isLoading: isFilterSortLoading,
    isError: isFilterSortError,
    error: filterSortError,
  } = useGetFilteredSortedHotelsQuery(
    filterOptions,
    { skip: isUsingSearch } // Skip this query when in search mode
  );

  /**
   * DERIVED STATE
   * Determine which data set and loading/error states to use
   * based on whether search mode is active
   */
  const hotels = isUsingSearch ? searchResults : filteredSortedHotels;
  const isLoading = isUsingSearch ? isSearchLoading : isFilterSortLoading;
  const isError = isUsingSearch ? isSearchError : isFilterSortError;
  const error = isUsingSearch ? searchError : filterSortError;

  /**
   * EVENT HANDLERS
   */

  // Handler for when filter/sort options change in the FilterSortControls component
  // Updates our local state and triggers a new API request
  const handleFiltersChange = (newOptions) => {
    setFilterOptions(newOptions);
  };

  /**
   * CONDITIONAL RENDERING
   */

  // LOADING STATE UI
  if (isLoading) {
    return (
      <section className="py-10 mx-10 md:py-14 lg:py-12 md:mx-20 lg:mx-52">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl md:text-3xl font-bold mb-6 sm:mb-4 text-gray-900">
            All Hotels
          </h2>
          <p className="text-gray-600 mb-10 text-lg md:text-xl font-medium">
            Loading hotels... Please wait.
          </p>
        </div>

        {/* Show filter controls in loading state when not in search mode */}
        {!isUsingSearch && (
          <FilterSortControls
            isLoading={true}
            isError={false}
            onFiltersChange={handleFiltersChange}
          />
        )}

        {/* Loading skeleton grid - displays placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col"
            >
              {/* Image placeholder */}
              <Skeleton className="h-44 w-full" />

              {/* Content area with skeleton placeholders for text */}
              <div className="p-5 flex-grow flex flex-col gap-3">
                {/* Hotel name placeholder */}
                <Skeleton className="h-6 w-3/4" />

                {/* Location placeholder */}
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-1 rounded-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Rating placeholder */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Price placeholder */}
                <div className="mt-2">
                  <Skeleton className="h-8 w-20 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ERROR STATE UI
  if (isError) {
    return (
      <section className="py-10 mx-10 md:py-14 lg:py-12 md:mx-20 lg:mx-52">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl md:text-3xl font-bold mb-6 sm:mb-4 text-gray-900">
            All Hotels
          </h2>
          <p className="text-gray-600 mb-10 text-lg md:text-xl font-medium">
            Unable to load hotels at this time.
          </p>
        </div>

        {/* Show filter controls in error state when not in search mode */}
        {!isUsingSearch && (
          <FilterSortControls
            isLoading={false}
            isError={true}
            onFiltersChange={handleFiltersChange}
          />
        )}

        {/* Error message display */}
        <div className="p-6 border border-red-200 bg-red-50 rounded-lg">
          <p className="text-red-500 font-medium">
            {error?.toString() || "An error occurred while loading hotels."}
          </p>
          <p className="text-red-400 mt-2">
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
        </div>
      </section>
    );
  }

  // MAIN UI - SUCCESS STATE
  // Displays hotels after data is successfully loaded
  return (
    <section className="py-10 mx-10 md:py-14 lg:py-12 md:mx-20 lg:mx-52">
      {/* Section header with title and hotel count */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-3xl md:text-3xl font-bold mb-6 sm:mb-4 text-gray-900">
          All Hotels
        </h2>
        <p className="text-gray-600 mb-10">
          {hotels?.length || 0} hotels available
        </p>
      </div>

      {/* Only show filter/sort options when not in search mode */}
      {!isUsingSearch && (
        <FilterSortControls
          isLoading={false}
          isError={false}
          onFiltersChange={handleFiltersChange}
        />
      )}

      {/* Hotel cards grid - responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {isUsingSearch
          ? // For search results (special data structure from AI similarity search)
            hotels &&
            hotels.map(({ hotel, confidence }) => (
              <HotelCard
                key={hotel._id}
                hotel={hotel}
                confidence={confidence}
                routePrefix="/hotels/"
              />
            ))
          : // For filtered/sorted results (standard hotel objects)
            hotels &&
            hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} routePrefix="/hotels/" />
            ))}
      </div>
    </section>
  );
};

export default HotelListings;
