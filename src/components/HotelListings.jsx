import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";

const HotelListings = () => {
  const searchValue = useSelector((state) => state.search.value);

  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsForSearchQueryQuery({
    query: searchValue,
  });

  const locations = ["All", "France", "Italy", "Australia", "Japan"];
  const [selectedLocation, setSelectedLocation] = useState("All");

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  console.log(hotels);

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

  const filteredHotels =
    selectedLocation === "All"
      ? hotels
      : hotels.filter(({ hotel }) =>
          hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );

  console.log(filteredHotels);

  // useEffect(() => {
  //   getHotels()
  //     .then((data) => {
  //       setHotels(data);
  //     })
  //     .catch((error) => {
  //       setIsError(true);
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     }, []);
  // });

  // useEffect(() => {
  //   const fetchHotels = async () => {
  //     const data = await getHotels();
  //     setHotels(data);
  //   };
  //   fetchHotels();
  // }, []);

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
