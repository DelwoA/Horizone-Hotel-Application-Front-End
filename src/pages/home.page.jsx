import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";

const HomePage = () => {
  return (
    <main>
      <div className="relative min-h-screen">
        <Hero />
        {/* TODO: Optimize the image situation so that it supports only the image with the appropirate resolution it supports */}
        <img
          src="assets/hero.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-90"
        />
      </div>
      <HotelListings />
    </main>
  );
};

export default HomePage;
