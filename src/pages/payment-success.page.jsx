import { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  validatePaymentSuccessAccess,
  handleInvalidPaymentAccess,
} from "@/lib/utils/payment-protection";

/**
 * PaymentSuccessPage Component
 *
 * This component displays the payment success UI after a successful payment verification.
 * It receives session data from the verify-payment page through navigation state and
 * presents detailed booking information to the user.
 *
 * Features:
 * - Success confirmation with checkmark icon
 * - Detailed booking information display
 * - Transaction reference display
 * - Navigation options to continue user journey
 * - Responsive design with proper spacing
 *
 * Data Source:
 * - Receives sessionData, sessionId, and bookingId from navigation state
 * - Fallback handling for direct page access
 *
 * Route: /payment-success
 *
 * @component
 * @returns {JSX.Element} Payment success confirmation page
 */
const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from navigation state (passed from verify-payment page)
  const { sessionData, sessionId, bookingId, bookingDetails } =
    location.state || {};

  useEffect(() => {
    console.log("Payment success page mounted");
    console.log("Session data received:", sessionData);

    // Validate access to payment success page
    const validation = validatePaymentSuccessAccess(location.state);

    if (!validation.isValid) {
      handleInvalidPaymentAccess(navigate, toast, validation.reason);
      return;
    }

    // Show success toast if validation passes
    toast.success("Payment completed successfully!");
  }, [location.state, navigate]);

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
              {bookingDetails && (
                <>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Booking ID:</span>
                    <span className="text-sm font-medium">{bookingId}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Hotel:</span>
                    <span className="text-sm font-medium">
                      {bookingDetails.hotelName}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Guest:</span>
                    <span className="text-sm font-medium">
                      {bookingDetails.firstName} {bookingDetails.lastName}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Room Number:</span>
                    <span className="text-sm font-medium text-teal-700">
                      {bookingDetails.roomNumber}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Check-in:</span>
                    <span className="text-sm font-medium">
                      {new Date(bookingDetails.checkIn).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-sm text-gray-500">Check-out:</span>
                    <span className="text-sm font-medium">
                      {new Date(bookingDetails.checkOut).toLocaleDateString()}
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
