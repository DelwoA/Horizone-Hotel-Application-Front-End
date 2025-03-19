import CreateHotelForm from "@/components/CreateHotelForm";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

const createHotelPage = () => {
  // const { user } = useUser();
  // if (!user) {
  //   return <Navigate to="/sign-in" />;
  // }

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 ">Create a Hotel</h1>
      <CreateHotelForm />
    </main>
  );
};

export default createHotelPage;
