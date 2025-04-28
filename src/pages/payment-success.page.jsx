import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useCheckStripeSessionQuery } from "@/lib/api";
import { Check, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * PaymentSuccessPage Component
 *
 * This component handles the payment confirmation flow after a user returns from Stripe checkout.
 * It verifies the payment status and displays appropriate success/failure UI.
 *
 * Features:
 * - Payment verification with Stripe session ID
 * - Loading state with spinner animation
 * - Error handling with detailed error messages
 * - Success state with booking details display
 * - Navigation options for both success and failure cases
 *
 * Flow:
 * 1. Extract Stripe session ID from URL
 * 2. Verify payment status with backend
 * 3. Show appropriate UI based on verification result
 * 4. Provide navigation options to continue
 *
 * @component
 * @returns {JSX.Element} Rendered payment confirmation page
 */
const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  // Get session_id from URL params - this is added by Stripe when redirecting back
  const sessionId = searchParams.get("session_id");
  const [bookingId, setBookingId] = useState(null);

  // Verify payment status with Stripe through our backend
  const {
    data: sessionData,
    isLoading,
    error,
    isError,
  } = useCheckStripeSessionQuery(sessionId, { skip: !sessionId });

  // Handle session data updates and error logging
  useEffect(() => {
    console.log("Payment success page mounted. Session ID:", sessionId);
    console.log("Session data:", sessionData);

    if (sessionData?.bookingId) {
      setBookingId(sessionData.bookingId);
    }

    if (isError) {
      console.error("Error checking payment status:", error);
      toast.error("Error verifying payment status");
    }
  }, [sessionId, sessionData, error, isError]);

  // Loading state UI with spinner animation
  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4">
        <div className="text-center mb-8">
          {/* Loading spinner */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
            <div className="h-12 w-12 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          <h1 className="text-2xl font-bold mb-2">Verifying Payment</h1>

          <p className="text-neutral-600 mb-6">
            Please wait while we verify your payment...
          </p>
        </div>
      </div>
    );
  }

  // Error state UI or failed payment handling
  if (isError || (sessionData && sessionData.paymentStatus !== "PAID")) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4">
        <div className="text-center mb-8">
          {/* Error icon */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>

          {/* Error message with fallback */}
          <p className="text-neutral-600 mb-6">
            {isError
              ? `Error: ${
                  error?.toString() ||
                  "An error occurred while processing your payment."
                }`
              : "Your payment could not be completed. Please try again or contact customer support."}
          </p>

          {/* Transaction details for reference */}
          {sessionId && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-red-600 mb-2 text-left">
                Transaction Details
              </h3>
              <div className="divide-y divide-gray-200">
                <div className="py-2 flex justify-between">
                  <span className="text-sm text-gray-500">
                    Transaction Reference:
                  </span>
                  <span className="text-sm font-mono">
                    {sessionId.substring(0, 12)}...
                  </span>
                </div>
                {sessionData?.bookingId && (
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Booking ID:</span>
                    <span className="text-sm">{sessionData.bookingId}</span>
                  </div>
                )}
                {sessionData?.bookingDetails?.roomNumber && (
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Room Number:</span>
                    <span className="text-sm">
                      {sessionData.bookingDetails.roomNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full bg-teal-700 hover:bg-teal-800">
              <Link to="/">Return Home</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link to="/account">View My Bookings</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Success state UI - payment verified successfully
  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <div className="text-center mb-8">
        {/* Success checkmark icon */}
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-teal-100 mb-6">
          <Check className="h-12 w-12 text-teal-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>

        <p className="text-neutral-600 mb-6">
          Your booking has been confirmed. Thank you for choosing our service.
        </p>

        {/* Detailed booking information */}
        {sessionId && (
          <div className="bg-gray-50 p-5 rounded-lg mb-6">
            <h3 className="font-semibold text-teal-700 mb-3 text-left">
              Booking Details
            </h3>
            <div className="divide-y divide-gray-200">
              <div className="py-2 flex justify-between">
                <span className="text-sm text-gray-500">
                  Transaction Reference:
                </span>
                <span className="text-sm font-mono font-medium">
                  {sessionId.substring(0, 12)}...
                </span>
              </div>
              {sessionData?.bookingDetails && (
                <>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Booking ID:</span>
                    <span className="text-sm font-medium">
                      {sessionData.bookingId}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Hotel:</span>
                    <span className="text-sm font-medium">
                      {sessionData.bookingDetails.hotelName}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Guest:</span>
                    <span className="text-sm font-medium">
                      {sessionData.bookingDetails.firstName}{" "}
                      {sessionData.bookingDetails.lastName}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Room Number:</span>
                    <span className="text-sm font-medium text-teal-700">
                      {sessionData.bookingDetails.roomNumber}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Check-in:</span>
                    <span className="text-sm font-medium">
                      {new Date(
                        sessionData.bookingDetails.checkIn
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Check-out:</span>
                    <span className="text-sm font-medium">
                      {new Date(
                        sessionData.bookingDetails.checkOut
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-teal-700 hover:bg-teal-800">
            <Link to="/account">View My Bookings</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Browsing
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
