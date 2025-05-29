import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useCheckStripeSessionQuery } from "@/lib/api";
import { toast } from "sonner";
import VerifyPaymentLoader from "@/components/VerifyPaymentLoader";
import {
  validatePaymentVerificationAccess,
  handleInvalidPaymentAccess,
} from "@/lib/utils/payment-protection";

/**
 * VerifyPaymentPage Component
 *
 * This component handles the payment verification process after a user returns from Stripe checkout.
 * It extracts the session ID from URL parameters, verifies the payment status with the backend,
 * and navigates users to appropriate success or failure pages based on the verification result.
 *
 * Features:
 * - Automatic payment verification using Stripe session ID
 * - Loading state management with spinner animation
 * - Error handling and logging for verification failures
 * - Automatic navigation to success/failure pages
 * - Session data persistence for subsequent pages
 *
 * Flow:
 * 1. Extract Stripe session ID from URL parameters
 * 2. Query backend to verify payment status
 * 3. Show loading spinner during verification
 * 4. Navigate to /payment-success on successful payment
 * 5. Navigate to /payment-failed on failed payment or errors
 *
 * Route: /verify-payment?session_id=:sessionId
 *
 * @component
 * @returns {JSX.Element} Loading UI while verification is in progress
 */
const VerifyPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get session_id from URL params - this is added by Stripe when redirecting back
  const sessionId = searchParams.get("session_id");
  const [bookingId, setBookingId] = useState(null);

  // Verify payment status with Stripe through our backend
  const {
    data: sessionData,
    isLoading,
    error,
    isError,
    isSuccess,
  } = useCheckStripeSessionQuery(sessionId, { skip: !sessionId });

  // Handle verification results and navigation
  useEffect(() => {
    console.log("Payment verification page mounted. Session ID:", sessionId);
    console.log("Session data:", sessionData);

    // Validate access to payment verification page
    const validation = validatePaymentVerificationAccess(sessionId);

    if (!validation.isValid) {
      handleInvalidPaymentAccess(navigate, toast, validation.reason);
      return;
    }

    // Handle successful verification
    if (isSuccess && sessionData) {
      // Extract booking information from the response
      const booking = sessionData.booking;
      const stripePaymentStatus = sessionData.stripePaymentStatus;
      const bookingPaymentStatus = booking?.paymentStatus;

      if (booking?.id) {
        setBookingId(booking.id);
      }

      // Check if payment was successful - check both Stripe status and booking status
      const isPaymentSuccessful =
        stripePaymentStatus === "paid" && bookingPaymentStatus === "PAID";

      if (isPaymentSuccessful) {
        console.log("Payment verified successfully:", sessionData);
        toast.success("Payment verified successfully!");

        // Navigate to success page with session data
        navigate("/payment-success", {
          replace: true,
          state: {
            sessionData,
            sessionId,
            bookingId: booking.id,
            bookingDetails: {
              hotelName: booking.hotelName,
              firstName: booking.firstName,
              lastName: booking.lastName,
              roomNumber: booking.roomNumber,
              checkIn: booking.checkIn,
              checkOut: booking.checkOut,
            },
          },
        });
      } else {
        console.log("Payment verification failed:", {
          stripePaymentStatus,
          bookingPaymentStatus,
          sessionData,
        });
        toast.error("Payment verification failed");

        // Navigate to failure page with session data for reference
        navigate("/payment-failed", {
          replace: true,
          state: {
            sessionData,
            sessionId,
            error: `Payment status: Stripe=${stripePaymentStatus}, Booking=${bookingPaymentStatus}`,
          },
        });
      }
    }

    // Handle verification errors
    if (isError) {
      console.error("Error checking payment status:", error);
      toast.error("Error verifying payment status");

      // Navigate to failure page with error information
      navigate("/payment-failed", {
        replace: true,
        state: {
          sessionId,
          error: error?.toString() || "Payment verification failed",
        },
      });
    }
  }, [sessionId, sessionData, error, isError, isSuccess, navigate]);

  // Show loading UI while verification is in progress
  return <VerifyPaymentLoader />;
};

export default VerifyPaymentPage;
