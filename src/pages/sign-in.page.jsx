import { SignIn } from "@clerk/clerk-react";

/**
 * SignInPage Component
 *
 * Renders the authentication sign-in page using Clerk's built-in SignIn component.
 * This component provides a complete authentication flow with:
 * - Email/password login
 * - Social login options
 * - Password reset functionality
 * - Error handling
 *
 * The component is wrapped in a centered container to ensure proper layout.
 *
 * @component
 * @returns {JSX.Element} Rendered sign-in page
 */
const SignInPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <SignIn />
    </main>
  );
};

export default SignInPage;
