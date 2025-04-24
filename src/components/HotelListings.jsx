import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * HotelListings component - Displays a list of hotels with filtering by location.
 * Retrieves hotel data based on search query and allows filtering by location.
 */
const HotelListings = () => {
  // Get the search query from Redux store
  const searchValue = useSelector((state) => state.search.value);

  // Fetch hotels data based on search query using RTK Query
  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsForSearchQueryQuery({
    query: searchValue,
  });

  // Available location filters
  const locations = ["All", "France", "Italy", "Australia", "Japan"];
  // State for tracking the selected location filter
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Handler for location tab selection
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  console.log(hotels);

  // Loading state UI
  if (isLoading) {
    return (
      <section className="sm:my-16 md:my-20 lg:my-12 sm:mx-6 md:mx-8 lg:mx-52">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">
            Top trending hotels worldwide
          </h2>
          <p className="text-gray-600 mb-8 text-base sm:text-lg md:text-xl font-medium">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        {/* Location filter tabs */}
        <div className="flex flex-wrap item-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {locations.map((location, i) => {
            return (
              <LocationTab
                key={i}
                name={location}
                selectedLocation={selectedLocation}
                onClick={handleSelectLocation}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col"
            >
              {/* Image placeholder */}
              <Skeleton className="h-44 w-full" />

              {/* Content area */}
              <div className="p-5 flex-grow flex flex-col gap-3">
                {/* Hotel name */}
                <Skeleton className="h-6 w-3/4" />

                {/* Location */}
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-1 rounded-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Price */}
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

  // Error state UI
  if (isError) {
    return (
      <section className="sm:my-16 md:my-20 lg:my-12 sm:mx-6 md:mx-8 lg:mx-52">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">
            Top trending hotels worldwide
          </h2>
          <p className="text-gray-600 mb-8 text-base sm:text-lg md:text-xl font-medium">
            Discover the most trending hotels worldwide for an unforgettable
            experience.
          </p>
        </div>
        {/* Location filter tabs */}
        <div className="flex flex-wrap item-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {locations.map((location, i) => {
            return (
              <LocationTab
                key={i}
                name={location}
                selectedLocation={selectedLocation}
                onClick={handleSelectLocation}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <p className="text-red-500 font-medium">
            {error?.toString() || "An error occurred while loading hotels."}
          </p>
        </div>
      </section>
    );
  }

  // Filter hotels based on the selected location
  const filteredHotels =
    selectedLocation === "All"
      ? hotels
      : hotels.filter(({ hotel }) =>
          hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );

  // Main UI - Displays hotels after data is loaded
  return (
    <section className="py-10 mx-10 md:py-14 lg:py-12 md:mx-20 lg:mx-52">
      {/* Section header */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-3xl md:text-3xl font-bold mb-6 sm:mb-4 text-gray-900">
          Top trending hotels worldwide
        </h2>
        <p className="text-gray-600 mb-10 text-lg md:text-xl font-medium">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>

      {/* Location filter tabs */}
      <div className="flex flex-wrap item-center gap-2 sm:gap-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
        {locations.map((location, i) => {
          return (
            <LocationTab
              key={i}
              name={location}
              selectedLocation={selectedLocation}
              onClick={handleSelectLocation}
            />
          );
        })}
      </div>

      {/* Hotel cards grid - destructures hotel and confidence from each item */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredHotels.map(({ hotel, confidence }) => {
          return (
            <HotelCard key={hotel._id} hotel={hotel} confidence={confidence} />
          );
        })}
      </div>
    </section>
  );
};

export default HotelListings;
