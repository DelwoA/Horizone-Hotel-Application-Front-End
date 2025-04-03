import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import PersonalInfoCard from "@/components/PersonalInfoCard";
import BookingsList from "@/components/BookingsList";

const AccountPage = () => {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // In a real app, you'd fetch bookings from an API
  // This is just simulating that process
  useEffect(() => {
    // Only fetch bookings when the user is loaded
    if (isLoaded && user) {
      // You could replace this with a real API call
      // Example: fetchBookingsForUser(user.id)
      setIsLoadingBookings(true);

      // Simulate API delay
      setTimeout(() => {
        setIsLoadingBookings(false);
        // We don't actually fetch here since we're using mock data in the BookingsList component
      }, 500);
    }
  }, [isLoaded, user]);

  // Show a simple loading state while user data is loading
  if (!isLoaded) {
    return (
      <main className="container mx-auto px-4 py-6 sm:py-8 min-h-screen">
        <p className="text-center py-12">Loading your account information...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight mb-8 mt-3">
        My Account
      </h1>
      <PersonalInfoCard user={user} />

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>
        {isLoadingBookings ? (
          <p className="text-center py-8">Loading your bookings...</p>
        ) : (
          <BookingsList bookings={bookings} />
        )}
      </div>
    </main>
  );
};

export default AccountPage;
