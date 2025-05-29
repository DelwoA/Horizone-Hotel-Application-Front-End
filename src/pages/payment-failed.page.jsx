import { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  validatePaymentFailedAccess,
  handleInvalidPaymentAccess,
} from "@/lib/utils/payment-protection";

/**
 * PaymentFailedPage Component
 *
 * This component displays the payment failure UI when payment verification fails.
 * It receives error information and session data from the verify-payment page through
 * navigation state and presents appropriate error messages and recovery options.
 *
 * Features:
 * - Clear failure indication with error icon
 * - Detailed error message display
 * - Transaction reference for support purposes
 * - Recovery navigation options
 * - Responsive design with proper spacing
 *
 * Data Source:
 * - Receives sessionData, sessionId, and error from navigation state
 * - Fallback handling for direct page access or generic errors
 *
 * Route: /payment-failed
 *
 * @component
 * @returns {JSX.Element} Payment failure notification page
 */
const PaymentFailedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from navigation state (passed from verify-payment page)
  const { sessionData, sessionId, error } = location.state || {};

  useEffect(() => {
    console.log("Payment failed page mounted");
    console.log("Session data received:", sessionData);
    console.log("Error received:", error);

    // Validate access to payment failed page
    const validation = validatePaymentFailedAccess(location.state);

    if (!validation.isValid) {
      handleInvalidPaymentAccess(navigate, toast, validation.reason);
      return;
    }

    // Show error toast if validation passes and there's an error
    if (error) {
      toast.error("Payment verification failed");
    }
  }, [location.state, navigate]);

  // Error state UI or failed payment handling
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
          {error
            ? `Error: ${error}`
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
              {sessionData?.bookingDetails?.hotelName && (
                <div className="py-2 flex justify-between">
                  <span className="text-sm text-gray-500">Hotel:</span>
                  <span className="text-sm">
                    {sessionData.bookingDetails.hotelName}
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
};

export default PaymentFailedPage;
