/**
 * VerifyPaymentLoader Component
 *
 * A loading UI component that displays a spinner animation while payment verification is in progress.
 * This component is shown to users when the payment status is being verified with Stripe.
 *
 * Features:
 * - Animated spinner with teal color theme
 * - Clear messaging about verification process
 * - Responsive design with proper spacing
 * - Accessible loading state indicator
 *
 * @component
 * @returns {JSX.Element} Loading spinner with verification message
 */
const VerifyPaymentLoader = () => {
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
};

export default VerifyPaymentLoader;
