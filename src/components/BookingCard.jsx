import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building, Calendar, Mail, Phone, User, Home } from "lucide-react";

export const BookingCard = ({ booking }) => {
  // Ensure booking is not undefined
  if (!booking) {
    return null;
  }

  // Normalize the booking data to handle different property names
  const normalizedBooking = {
    id: booking.id || booking._id || booking.bookingId || "Unknown",
    hotelName: booking.hotelName || booking.hotel?.name || "Unknown Hotel",
    guestName:
      booking.guestName ||
      `${booking.firstName || ""} ${booking.lastName || ""}`.trim() ||
      booking.guest?.name ||
      "Unknown Guest",
    roomNumber: booking.roomNumber || booking.room?.number || "N/A",
    checkIn: booking.checkIn || booking.checkInDate || booking.startDate,
    checkOut: booking.checkOut || booking.checkOutDate || booking.endDate,
    email: booking.email || booking.guest?.email || "N/A",
    phone:
      booking.phone || booking.phoneNumber || booking.guest?.phone || "N/A",
    status: booking.status || "upcoming",
  };

  // Format dates for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      // Check if date is valid before formatting
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border border-border overflow-hidden">
      <div
        className={`h-1.5 w-full ${
          normalizedBooking.status === "upcoming"
            ? "bg-blue-500"
            : normalizedBooking.status === "active"
            ? "bg-yellow-500"
            : normalizedBooking.status === "completed"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      ></div>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Booking ID</p>
            <h3 className="font-semibold text-lg">{normalizedBooking.id}</h3>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
              normalizedBooking.status
            )} capitalize`}
          >
            {normalizedBooking.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          <div className="flex items-start gap-2">
            <Building
              size={18}
              className="text-muted-foreground mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm text-muted-foreground">Hotel</p>
              <p className="font-medium">{normalizedBooking.hotelName}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <User
              size={18}
              className="text-muted-foreground mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm text-muted-foreground">Guest</p>
              <p className="font-medium">{normalizedBooking.guestName}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Home
              size={18}
              className="text-muted-foreground mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm text-muted-foreground">Room</p>
              <p className="font-medium">#{normalizedBooking.roomNumber}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 col-span-1 md:col-span-2 lg:col-span-1">
            <Calendar
              size={18}
              className="text-muted-foreground mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm text-muted-foreground">Stay Period</p>
              <div className="flex items-center">
                <p className="font-medium">
                  {formatDate(normalizedBooking.checkIn)}
                </p>
                <span className="mx-2 text-muted-foreground">→</span>
                <p className="font-medium">
                  {formatDate(normalizedBooking.checkOut)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail
              size={18}
              className="text-muted-foreground mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{normalizedBooking.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Phone
              size={18}
              className="text-muted-foreground mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{normalizedBooking.phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
