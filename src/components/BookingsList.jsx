import BookingCard from "./BookingCard";

const mockBookings = [
  {
    id: "BOK-123456",
    hotelName: "Grand Horizone Hotel",
    guestName: "Delwo Athauda",
    roomNumber: "301",
    checkIn: "2023-04-15",
    checkOut: "2023-04-18",
    email: "delwo2003@gmail.com",
    phone: "+94769183306",
    status: "upcoming",
  },
  {
    id: "BOK-789012",
    hotelName: "Seaside Resort",
    guestName: "Delwo Athauda",
    roomNumber: "205",
    checkIn: "2023-03-10",
    checkOut: "2023-03-15",
    email: "delwo2003@gmail.com",
    phone: "+94769183306",
    status: "completed",
  },
];

export function BookingsList({ bookings = mockBookings }) {
  // Use either the provided bookings or the mock data
  const bookingsToDisplay = bookings || mockBookings;

  if (!bookingsToDisplay || bookingsToDisplay.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">
          You don't have any bookings yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookingsToDisplay.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

export default BookingsList;
