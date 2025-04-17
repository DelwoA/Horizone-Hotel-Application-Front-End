import { useParams } from "react-router";
import { useGetHotelByIdQuery } from "@/lib/api";
import { MapPin, Star, Wifi, Menu, Tv, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useCreateBookingMutation } from "@/lib/api";
import HotelBooking from "@/components/HotelBooking";

/**
 * HotelPage component - Displays detailed information about a single hotel
 */
const HotelPage = () => {
  // Get hotel ID from URL parameters
  const { id } = useParams();

  // Fetch hotel data based on ID using RTK Query
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);

  // Loading state UI with skeleton placeholders
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left column - Image and tags skeletons */}
          <div className="space-y-4">
            <Skeleton className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-lg" />
            <div className="flex flex-wrap space-x-2">
              <Skeleton className="h-5 sm:h-6 w-16 sm:w-24 mb-2" />
              <Skeleton className="h-5 sm:h-6 w-20 sm:w-32 mb-2" />
              <Skeleton className="h-5 sm:h-6 w-18 sm:w-28 mb-2" />
            </div>
          </div>

          {/* Right column - Hotel details skeletons */}
          <div className="space-y-4 sm:space-y-6">
            {/* Hotel name and favorite button */}
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-6 sm:h-8 w-48 sm:w-64 mb-2" />
                <Skeleton className="h-4 w-36 sm:w-48" />
              </div>
              <Skeleton className="h-8 sm:h-10 w-8 sm:w-10 rounded-full" />
            </div>

            {/* Rating skeleton */}
            <Skeleton className="h-4 w-28 sm:w-36" />

            {/* Description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Amenities card skeleton */}
            <Card>
              <CardContent className="p-3 sm:p-4">
                <Skeleton className="h-5 sm:h-6 w-24 sm:w-32 mb-3 sm:mb-4" />
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                      <Skeleton className="h-3 sm:h-4 w-16 sm:w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price and booking button skeletons */}
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 sm:h-8 w-20 sm:w-24 mb-1" />
                <Skeleton className="h-3 sm:h-4 w-12 sm:w-16" />
              </div>
              <Skeleton className="h-10 sm:h-12 w-24 sm:w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state UI
  if (isError) {
    return <p className="text-red-500 p-4 mx-52">Error: {isError.message}</p>;
  }

  // Main UI - Displays hotel details after data is loaded
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 mx-52 my-6 sm:my-8 px-4">
        {/* Left column - Hotel image and tags */}
        <div>
          <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
            <img
              className="w-full h-full object-cover object-center absolute inset-0"
              src={hotel.image}
              alt="Image of the Montmartre Majesty Hotel"
            />
          </div>
          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
            <Badge variant="secondary">Rooftop View</Badge>
            <Badge variant="secondary">French Cuisine</Badge>
            <Badge variant="secondary">City Center</Badge>
          </div>
        </div>

        {/* Right column - Hotel details */}
        <div>
          {/* Hotel header with name, location and favorite button */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
                {hotel.name}
              </h1>
              <div className="flex items-center mt-1 sm:mt-2 text-neutral-500">
                <MapPin className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
                <p className="text-sm sm:text-base">{hotel.location}</p>
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10"
              >
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Hotel rating display */}
          <div className="text-teal-600 fill-teal-600  flex items-center mt-4 sm:mt-6">
            <Star fill="currentColor" className="mr-1 h-4 w-4 sm:h-5 sm:w-5" />
            <p className="font-bold mr-1 text-sm sm:text-base">4.7</p>
            <p className="text-neutral-500 text-sm sm:text-base">
              ({hotel.reviews} reviews)
            </p>
          </div>

          {/* Hotel description */}
          <p className="mt-4 sm:mt-6 text-neutral-500 text-sm sm:text-base">
            {hotel.description}
          </p>

          {/* Amenities section */}
          <Card className="mt-4 sm:mt-6 p-3 sm:p-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Amenities
            </h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
              <div className="flex items-center">
                <Wifi className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <p className="text-sm sm:text-base">Free Wi-Fi</p>
              </div>
              <div className="flex items-center">
                <Menu className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <p className="text-sm sm:text-base">Restaurant</p>
              </div>
              <div className="flex items-center">
                <Tv className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <p className="text-sm sm:text-base">Flat-screen TV</p>
              </div>
              <div className="flex items-center">
                <Coffee className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <p className="text-sm sm:text-base">Coffee maker</p>
              </div>
            </div>
          </Card>

          {/* Price and booking section */}
          <div className="flex items-center justify-between mt-4 sm:mt-6">
            <div>
              <p className="font-bold text-xl sm:text-2xl">${hotel.price}</p>
              <p className="font-medium text-xs sm:text-sm text-neutral-500">
                per night
              </p>
            </div>
            <HotelBooking hotelId={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelPage;
