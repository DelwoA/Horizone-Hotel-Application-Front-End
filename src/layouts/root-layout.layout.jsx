import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
};

export default RootLayout;
