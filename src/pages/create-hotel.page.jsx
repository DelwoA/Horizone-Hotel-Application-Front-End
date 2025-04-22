import CreateHotelForm from "@/components/CreateHotelForm";

const createHotelPage = () => {
  // const { user } = useUser();
  // if (!user) {
  //   return <Navigate to="/sign-in" />;
  // }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="mx-10 py-10 md:mx-20 md:py-14 lg:mx-52 lg:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
          Create a Hotel
        </h1>
        <CreateHotelForm />
      </main>
    </div>
  );
};

export default createHotelPage;
