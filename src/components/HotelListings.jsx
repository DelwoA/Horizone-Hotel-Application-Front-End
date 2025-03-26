import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";

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
      <section className="my-16 mx-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 ">
            Top trending hotels worldwide
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Discover the most trending hotels worldwide for an unforgetabl
            experience.
          </p>
        </div>
        {/* Location filter tabs */}
        <div className="flex item-center gap-x-4 mb-4">
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
        <div className="grid grid-cols-4 gap-8">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  // Error state UI
  if (isError) {
    return (
      <section className="my-16 mx-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 ">
            Top trending hotels worldwide
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            Discover the most trending hotels worldwide for an unforgetabl
            experience.
          </p>
        </div>
        {/* Location filter tabs */}
        <div className="flex item-center gap-x-4 mb-4">
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
        <div className="grid grid-cols-4 gap-8">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  console.log(hotels);

  // Filter hotels based on the selected location
  const filteredHotels =
    selectedLocation === "All"
      ? hotels
      : hotels.filter(({ hotel }) =>
          hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );

  console.log(filteredHotels);

  // Main UI - Displays hotels after data is loaded
  return (
    <section className="my-16 mx-8">
      {/* Section header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4 ">
          Top trending hotels worldwide
        </h2>
        <p className="text-muted-foreground text-lg font-medium">
          Discover the most trending hotels worldwide for an unforgetabl
          experience.
        </p>
      </div>

      {/* Location filter tabs */}
      <div className="flex item-center gap-x-4 mb-4">
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
      <div className="grid grid-cols-4 gap-8">
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
