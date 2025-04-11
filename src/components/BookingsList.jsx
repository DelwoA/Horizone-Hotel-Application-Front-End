import BookingCard from "./BookingCard";

export function BookingsList({ bookings }) {
  // Check if bookings exist and are valid
  const hasBookings =
    bookings && Array.isArray(bookings) && bookings.length > 0;

  // If there are no bookings, show empty state
  if (!hasBookings) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">
          You don't have any bookings yet.
        </p>
      </div>
    );
  }

  // Display the bookings
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id || booking._id} booking={booking} />
      ))}
    </div>
  );
}

export default BookingsList;
