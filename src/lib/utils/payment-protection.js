/**
 * Payment Page Protection Utilities
 *
 * These utilities help protect payment result pages from unauthorized direct access
 * by validating that users have gone through the proper payment verification flow.
 */

/**
 * Validates if a user has legitimate access to a payment success page
 *
 * @param {Object} navigationState - The navigation state from useLocation()
 * @returns {Object} - { isValid: boolean, reason: string }
 */
export const validatePaymentSuccessAccess = (navigationState) => {
  const { sessionData, sessionId, bookingId } = navigationState || {};

  // Check for required data from payment verification flow
  if (!sessionData || !sessionId || !bookingId) {
    return {
      isValid: false,
      reason: "Missing required payment session data",
    };
  }

  // Verify that the payment was actually successful
  if (sessionData.stripePaymentStatus !== "paid") {
    return {
      isValid: false,
      reason: "Payment status is not successful",
    };
  }

  // Additional validation - check for booking data
  if (!sessionData.booking || sessionData.booking.paymentStatus !== "PAID") {
    return {
      isValid: false,
      reason: "Booking payment status is not confirmed",
    };
  }

  return {
    isValid: true,
    reason: "Valid payment success access",
  };
};

/**
 * Validates if a user has legitimate access to a payment failed page
 *
 * @param {Object} navigationState - The navigation state from useLocation()
 * @returns {Object} - { isValid: boolean, reason: string }
 */
export const validatePaymentFailedAccess = (navigationState) => {
  const { sessionData, sessionId, error } = navigationState || {};

  // Allow access if there's a session ID (came from verification) or an error message
  if (sessionId || error) {
    return {
      isValid: true,
      reason: "Valid payment failure access",
    };
  }

  return {
    isValid: false,
    reason: "No valid session or error data",
  };
};

/**
 * Validates if a user has legitimate access to payment verification page
 *
 * @param {string} sessionId - The session ID from URL parameters
 * @returns {Object} - { isValid: boolean, reason: string }
 */
export const validatePaymentVerificationAccess = (sessionId) => {
  // Must have a session ID from Stripe redirect
  if (!sessionId || sessionId.trim() === "") {
    return {
      isValid: false,
      reason: "No Stripe session ID provided",
    };
  }

  // Basic format validation for Stripe session ID
  if (!sessionId.startsWith("cs_")) {
    return {
      isValid: false,
      reason: "Invalid Stripe session ID format",
    };
  }

  return {
    isValid: true,
    reason: "Valid payment verification access",
  };
};

/**
 * Common redirect handler for invalid payment page access
 *
 * @param {Function} navigate - React Router navigate function
 * @param {Function} toast - Toast notification function
 * @param {string} reason - Reason for the invalid access
 */
export const handleInvalidPaymentAccess = (navigate, toast, reason) => {
  console.warn(`Invalid payment page access: ${reason}`);
  toast.error(
    "Invalid access to payment page. Please complete a booking first."
  );
  navigate("/", { replace: true });
};
