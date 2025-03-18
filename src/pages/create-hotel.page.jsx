import CreateHotelForm from "@/components/CreateHotelForm";

const createHotelPage = () => {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-4 ">Create a Hotel</h1>
      <CreateHotelForm />
    </main>
  );
};

export default createHotelPage;
