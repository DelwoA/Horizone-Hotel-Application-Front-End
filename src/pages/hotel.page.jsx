import { useParams } from "react-router";
import { useGetHotelByIdQuery } from "@/lib/api";
import { MapPin, Star, Wifi, Menu, Tv, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useCreateBookingMutation } from "@/lib/api";

/**
 * HotelPage component - Displays detailed information about a single hotel
 */
const HotelPage = () => {
  // Get hotel ID from URL parameters
  const { id } = useParams();

  // Fetch hotel data based on ID using RTK Query
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);

  // Mutation hook for creating a booking
  const [createBooking, { isLoading: isCreateBookingLoading }] =
    useCreateBookingMutation();

  /*
   * Handle booking button click
   * Creates a new booking for the current hotel
   */
  const handleBook = async () => {
    try {
      await createBooking({
        hotelId: id,
        checkIn: new Date(),
        checkOut: new Date(),
        roomNumber: 201,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Loading state UI with skeleton placeholders
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Image and tags skeletons */}
          <div className="space-y-4">
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>

          {/* Right column - Hotel details skeletons */}
          <div className="space-y-6">
            {/* Hotel name and favorite button */}
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            {/* Rating skeleton */}
            <Skeleton className="h-4 w-36" />

            {/* Description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Amenities card skeleton */}
            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price and booking button skeletons */}
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state UI
  if (isError) {
    return <p className="text-red-500">Error: {isError.message}</p>;
  }

  // Main UI - Displays hotel details after data is loaded
  return (
    <>
      <div className="grid grid-cols-2 gap-x-8 mx-auto my-8 container">
        {/* Left column - Hotel image and tags */}
        <div>
          <div className="object-cover">
            <img
              className="rounded-lg w-full h-full"
              src={hotel.image}
              alt="Image of the Montmartre Majesty Hotel"
            />
          </div>
          {/* Feature badges */}
          <div className="flex space-x-4 mt-6">
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
              <h1 className="text-3xl font-extrabold">{hotel.name}</h1>
              <div className="flex items-center mt-2 text-neutral-500">
                <MapPin className="mr-1 h-5 w-5" />
                <p>{hotel.location}</p>
              </div>
            </div>
            <div>
              <Button variant="outline" size="icon">
                <Star />
              </Button>
            </div>
          </div>

          {/* Hotel rating display */}
          <div className="flex items-center mt-6">
            <Star fill="currentColor" className="mr-1 h-5 w-5" />
            <p className="font-bold mr-1">4.7</p>
            <p className="text-neutral-500">({hotel.reviews} reviews)</p>
          </div>

          {/* Hotel description */}
          <p className="mt-6 text-neutral-500">{hotel.description}</p>

          {/* Amenities section */}
          <Card className="mt-6 p-4">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="flex items-center">
                <Wifi className="mr-2 h-5 w-5" />
                <p>Free Wi-Fi</p>
              </div>
              <div className="flex items-center">
                <Menu className="mr-2 h-5 w-5" />
                <p>Restaurant</p>
              </div>
              <div className="flex items-center">
                <Tv className="mr-2 h-5 w-5" />
                <p>Flat-screen TV</p>
              </div>
              <div className="flex items-center">
                <Coffee className="mr-2 h-5 w-5" />
                <p>Coffee maker</p>
              </div>
            </div>
          </Card>

          {/* Price and booking section */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="font-bold text-2xl">${hotel.price}</p>
              <p className="font-medium text-sm text-neutral-500">per night</p>
            </div>
            <Button className="font-medium h-10 px-8" onClick={handleBook}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelPage;
