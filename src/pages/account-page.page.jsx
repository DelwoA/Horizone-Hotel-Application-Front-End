import { useUser } from "@clerk/clerk-react";
import PersonalInfoCard from "@/components/PersonalInfoCard";
import BookingsList from "@/components/BookingsList";
import { useGetUserBookingsQuery } from "@/lib/api";

/**
 * AccountPage Component
 *
 * This component serves as the user's account dashboard, displaying:
 * 1. Personal information through the PersonalInfoCard component
 * 2. A list of the user's bookings through the BookingsList component
 *
 * The component handles:
 * - User authentication state via Clerk
 * - Fetching user's bookings from the API
 * - Loading, error, and empty states for bookings
 *
 * @component
 * @returns {JSX.Element} Rendered account page
 */
const AccountPage = () => {
  // Get authenticated user data from Clerk
  const { user, isLoaded } = useUser();

  // Get the user ID from Clerk for API calls
  const userId = user?.id;

  // Fetch user bookings from the API with RTK Query
  const {
    data: bookings,
    isLoading: isLoadingBookings,
    error: bookingsError,
    isError: isBookingsError,
  } = useGetUserBookingsQuery(userId, {
    // Only run the query when we have a user ID
    skip: !userId,
    // Refetch on window focus to keep data fresh
    refetchOnFocus: true,
    // Refetch when network connection is restored
    refetchOnReconnect: true,
  });

  // Show loading state while user data is being fetched from Clerk
  if (!isLoaded) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <main className="mx-10 py-10 md:mx-20 md:py-14 lg:mx-52 lg:py-12">
          <p className="text-center py-12">
            Loading your account information...
          </p>
        </main>
      </div>
    );
  }

  // Main UI with personal info and bookings list
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="mx-10 py-10 md:mx-20 md:py-14 lg:mx-52 lg:py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8 mt-3">
          My Account
        </h1>
        {/* Personal information card */}
        <PersonalInfoCard user={user} />

        {/* Bookings section with loading/error/empty states */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>
          {isLoadingBookings ? (
            <p className="text-center py-8">Loading your bookings...</p>
          ) : isBookingsError ? (
            <div className="text-center py-8">
              <p className="text-red-500">Error loading bookings</p>
              <p className="text-muted-foreground mt-2">
                {bookingsError?.toString() || "Please try again later"}
              </p>
            </div>
          ) : bookings?.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              You don't have any bookings yet.
            </p>
          ) : (
            <BookingsList bookings={bookings} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
