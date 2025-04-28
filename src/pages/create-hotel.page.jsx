import CreateHotelForm from "@/components/CreateHotelForm";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

/**
 * CreateHotelPage Component
 *
 * Admin-only page that allows for creating new hotel listings.
 * Displays a form with various fields for inputting hotel details such as:
 * - Hotel name
 * - Location
 * - Description
 * - Image URL
 * - Price
 *
 * Note: Authentication check redirects non-authenticated users to sign-in page.
 * Admin-specific access is handled by the AdminProtectedLayout.
 *
 * @component
 * @returns {JSX.Element} Rendered create hotel page
 */
const CreateHotelPage = () => {
  // Redirect non-authenticated users to sign-in page
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base sm:text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="mx-10 py-10 md:mx-20 md:py-14 lg:mx-52 lg:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
          Create a Hotel
        </h1>
        <CreateHotelForm />
      </main>
    </div>
  );
};

export default CreateHotelPage;
