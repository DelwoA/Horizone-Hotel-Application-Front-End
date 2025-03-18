import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { useGetHotelsQuery } from "@/lib/api";

const HotelListings = () => {
  const { data: hotels, isLoading, isError, error } = useGetHotelsQuery();

  const locations = ["All", "France", "Italy", "Australia", "Japan"];

  const [selectedLocation, setSelectedLocation] = useState("All");

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const filteredHotels =
    selectedLocation === "All"
      ? hotels
      : hotels.filter((hotel) =>
          hotel.location
            .toLocaleLowerCase()
            .includes(selectedLocation.toLocaleLowerCase())
        );

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
        {filteredHotels.map((hotel) => {
          return <HotelCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </section>
  );
};

export default HotelListings;
