import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateBookingMutation,
  useCreateCheckoutSessionMutation,
  useGetHotelByIdQuery,
} from "@/lib/api";
import { calculateHotelPrice } from "@/lib/utils/price-calculations";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import BookingForm from "@/components/BookingForm";

/**
 * HotelBooking component - Dialog to book a hotel room
 * This component handles:
 * 1. Displaying the booking form in a dialog
 * 2. Creating a booking in the database
 * 3. Initiating the Stripe payment flow
 * 4. Redirecting to Stripe's hosted checkout page
 */
const HotelBooking = ({ hotelId }) => {
  // Fetch hotel data to get price information
  const { data: hotel } = useGetHotelByIdQuery(hotelId);

  // RTK Query mutation hooks
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();
  const [createCheckoutSession, { isLoading: isCheckoutLoading }] =
    useCreateCheckoutSessionMutation();

  // State to store price calculation
  const [priceInfo, setPriceInfo] = useState(null);

  // Manage dialog open/close state
  const [open, setOpen] = useState(false);

  // Format date for API submission
  const formatDateForAPI = (date) => {
    return date ? date.toISOString() : null;
  };

  // Calculate price when dates change
  const calculatePrice = (checkIn, checkOut) => {
    if (!hotel || !checkIn || !checkOut) return null;

    return calculateHotelPrice(hotel.price, checkIn, checkOut);
  };

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const {
        checkInDate,
        checkOutDate,
        firstName,
        lastName,
        email,
        countryCode,
        phoneNumber,
        roomNumber,
      } = values;

      // Calculate the price
      const priceDetails = calculatePrice(checkInDate, checkOutDate);
      setPriceInfo(priceDetails);

      // Format the full phone number with country code
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;

      // Create the booking payload
      const bookingData = {
        hotelId,
        checkIn: formatDateForAPI(checkInDate),
        checkOut: formatDateForAPI(checkOutDate),
        firstName,
        lastName,
        email,
        phoneNumber: fullPhoneNumber,
        roomNumber: roomNumber || 1,
      };

      toast.loading("Creating booking...");

      // Step 1: Send booking to the API to create it in the database
      // This stores the booking with PENDING payment status
      const response = await createBooking(bookingData).unwrap();

      toast.dismiss();
      toast.success("Booking created! Redirecting to payment...");

      // Get the booking ID from the response
      const { bookingId } = response;
      console.log("Booking created with ID:", bookingId);

      // Store booking ID in localStorage for payment success page
      // This allows us to retrieve booking details after returning from Stripe
      try {
        localStorage.setItem("lastBookingId", bookingId);
        console.log("Saved booking ID to localStorage:", bookingId);

        // Also save a timestamp to help with debugging
        localStorage.setItem("bookingTimestamp", new Date().toISOString());

        // Double-check that the value was saved properly
        const savedBookingId = localStorage.getItem("lastBookingId");
        console.log("Retrieved booking ID from localStorage:", savedBookingId);

        if (savedBookingId !== bookingId) {
          console.error(
            "LocalStorage mismatch. Expected:",
            bookingId,
            "Got:",
            savedBookingId
          );
        }
      } catch (storageError) {
        console.error("Error saving to localStorage:", storageError);
      }

      // Step 2: Create a Stripe checkout session for the booking
      toast.loading("Preparing payment...");
      const checkoutResponse = await createCheckoutSession(bookingId).unwrap();
      toast.dismiss();

      console.log("Checkout session created:", checkoutResponse);

      // Step 3: Redirect to Stripe checkout
      // This sends the user to Stripe's hosted checkout page to enter payment details
      if (checkoutResponse.sessionUrl) {
        // One final check of localStorage before redirect
        console.log(
          "Final localStorage check before redirect:",
          localStorage.getItem("lastBookingId")
        );
        // When payment is completed, Stripe will redirect back to our success URL
        // with the session_id as a query parameter
        window.location.href = checkoutResponse.sessionUrl;
      } else {
        toast.error("Could not create payment session");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.dismiss();
      toast.error("Error creating booking");

      // Display more specific error message if available
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      }
    }
  };

  // Handle dialog cancellation
  const handleCancel = () => {
    setOpen(false);
  };

  const isLoading = isBookingLoading || isCheckoutLoading;

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="font-medium h-9 sm:h-10 px-4 sm:px-8 text-sm sm:text-base bg-teal-700 hover:bg-teal-900 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Book Now"}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-[500px] p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">Book Your Stay</DialogTitle>
          <DialogDescription>
            Fill in your details to complete your reservation.
          </DialogDescription>
        </DialogHeader>

        <BookingForm
          onSubmit={onSubmit}
          onCancel={handleCancel}
          onDateChange={(checkIn, checkOut) => {
            const price = calculatePrice(checkIn, checkOut);
            setPriceInfo(price);
          }}
          priceInfo={priceInfo}
          hotelPrice={hotel?.price}
        />
      </DialogContent>
    </Dialog>
  );
};

export default HotelBooking;
