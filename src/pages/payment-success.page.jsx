import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useCheckStripeSessionQuery } from "@/lib/api";
import { Check, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * PaymentSuccessPage - Displayed after a successful payment
 *
 * This component is displayed after the user is redirected back from Stripe's checkout page.
 * It verifies the payment status using the session_id provided in the URL query parameters.
 *
 * The payment verification flow:
 * 1. Extract the Stripe session ID from URL query parameters
 * 2. Call the backend API to verify the payment status directly with Stripe
 * 3. Display appropriate success or error UI based on verification results
 */
const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  // Get session_id from URL params - this is added by Stripe when redirecting back to our success URL
  const sessionId = searchParams.get("session_id");
  const [bookingId, setBookingId] = useState(null);

  // Get the direct payment status from Stripe
  // This makes an API call to our backend, which then verifies with Stripe
  // We skip the API call if there's no sessionId in the URL
  const {
    data: sessionData,
    isLoading,
    error,
  } = useCheckStripeSessionQuery(sessionId, { skip: !sessionId });

  // Log important information and update state when session data is received
  useEffect(() => {
    console.log("Payment success page mounted. Session ID:", sessionId);
    console.log("Session data:", sessionData);

    if (sessionData?.bookingId) {
      setBookingId(sessionData.bookingId);
    }

    if (error) {
      console.error("Error checking payment status:", error);
      toast.error("Error verifying payment status");
    }
  }, [sessionId, sessionData, error]);

  // Handle loading state - show spinner while verifying payment
  if (isLoading) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4">
        <div className="text-center mb-8">
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

  // Handle error state or failed payment
  // This is shown if there was an API error or if Stripe reported payment wasn't successful
  if (error || (sessionData && sessionData.paymentStatus !== "PAID")) {
    return (
      <div className="max-w-lg mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>

          <p className="text-neutral-600 mb-6">
            {error
              ? "We encountered an error while processing your payment."
              : "Your payment could not be completed. Please try again or contact customer support."}
          </p>

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

  // Handle success state - payment was verified successfully
  // This is shown when the API confirms the payment was successful
  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-teal-100 mb-6">
          <Check className="h-12 w-12 text-teal-600" />
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>

        <p className="text-neutral-600 mb-6">
          Your booking has been confirmed. Thank you for choosing our service.
        </p>

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
