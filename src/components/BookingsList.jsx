import BookingCard from "./BookingCard";

/**
 * BookingsList Component
 *
 * Displays a list of user bookings or an empty state message when no bookings exist.
 * This component handles:
 * - Checking if bookings array is valid and contains items
 * - Rendering an empty state message when there are no bookings
 * - Rendering a list of BookingCard components for each booking
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.bookings - Array of booking objects to display
 * @returns {JSX.Element} - Rendered list of bookings or empty state
 */
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

  // Display the bookings list using BookingCard components
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id || booking._id} booking={booking} />
      ))}
    </div>
  );
}

export default BookingsList;
