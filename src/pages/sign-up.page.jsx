import { SignUp } from "@clerk/clerk-react";

/**
 * SignUpPage Component
 *
 * Renders the user registration page using Clerk's built-in SignUp component.
 * This component provides a complete registration flow with:
 * - Email verification
 * - Password creation
 * - Social signup options
 * - Form validation
 * - Error handling
 *
 * The component is wrapped in a centered container to ensure proper layout.
 *
 * @component
 * @returns {JSX.Element} Rendered sign-up page
 */
const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
