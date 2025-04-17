import { useUser } from "@clerk/clerk-react";
import PersonalInfoCard from "@/components/PersonalInfoCard";
import BookingsList from "@/components/BookingsList";
import { useGetUserBookingsQuery } from "@/lib/api";

const AccountPage = () => {
  const { user, isLoaded } = useUser();

  // Get the user ID from Clerk
  const userId = user?.id;

  // Fetch user bookings from the API
  const {
    data: bookings,
    isLoading: isLoadingBookings,
    error: bookingsError,
  } = useGetUserBookingsQuery(userId, {
    // Only run the query when we have a user ID
    skip: !userId,
    // Refetch on window focus
    refetchOnFocus: true,
    // Refetch when network connection is restored
    refetchOnReconnect: true,
  });

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
        ) : bookingsError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading bookings</p>
            <p className="text-muted-foreground mt-2">
              You don't have any bookings yet.
            </p>
          </div>
        ) : (
          <BookingsList bookings={bookings} />
        )}
      </div>
    </main>
  );
};

export default AccountPage;
