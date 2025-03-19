import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const AdminProtectedLayout = () => {
  const { isLoaded, user, isSignedIn } = useUser();

  /*
   * isLoaded implmeneted to prevent error for the delayed loading of the user public metadata.
   * If isLoaded is not implemented, the page component will load first, but, since user metadata is undefined at that time, due to a communication delay, it will throw an error.
   * In a nutshell, wait for user public metadata to load to avoid accessing undefined properties, which could cause runtime errors.
   */
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If the user directly enters the route on the URL bar without being signed in, it re-directs to the sign-in page.
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  // If a non-admin user is logged in, then attempts to directly enter the route on the URL bar, it re-directs to the home page.
  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminProtectedLayout;
