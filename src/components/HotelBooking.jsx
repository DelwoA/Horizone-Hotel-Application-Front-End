import { useState } from "react";
import { toast } from "sonner";
import { useCreateBookingMutation } from "@/lib/api";

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
 */
const HotelBooking = ({ hotelId }) => {
  // RTK Query mutation hook for creating a booking
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  // Manage dialog open/close state
  const [open, setOpen] = useState(false);

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      toast.loading("Creating booking...");
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

      // Format the full phone number with country code
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;

      await createBooking({
        hotelId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        firstName,
        lastName,
        email,
        phoneNumber: fullPhoneNumber,
        roomNumber: roomNumber || 1,
      }).unwrap();

      toast.dismiss();
      toast.success("Booking created successfully");
      setOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating booking");
      toast.error(error?.data?.message || "Error creating booking");
    }
  };

  // Handle dialog cancellation
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button className="font-medium h-9 sm:h-10 px-4 sm:px-8 text-sm sm:text-base">
          Book Now
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-[500px] p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">Book Your Stay</DialogTitle>
          <DialogDescription>
            Fill in your details to complete your reservation.
          </DialogDescription>
        </DialogHeader>

        <BookingForm onSubmit={onSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
};

export default HotelBooking;
