import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";

const HomePage = () => {
  return (
    <main>
      <div className="relative min-h-screen">
        <Hero />
        {/* Image optimization using <picture> element */}
        {/* This provides different image formats and resolutions based on browser support */}
        <picture>
          {/* WebP format - modern, more efficient format for browsers that support it */}
          <source
            type="image/webp"
            srcset="assets/hero.webp 1x,
                  assets/hero@2x.webp 2x,
                  assets/hero@3x.webp 3x"
          />
          {/* JPEG format - fallback for browsers without WebP support */}
          <source
            type="image/jpeg"
            srcset="assets/hero.jpg 1x,
                  assets/hero@2x.jpg 2x,
                  assets/hero@3x.jpg 3x"
          />
          {/* Fallback image with styling - the browser will automatically select the appropriate source above */}
          <img
            src="assets/hero@3x.jpg"
            alt="Swimming pool view of a hotel"
            className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-90"
          />
        </picture>
      </div>
      <div className="bg-gray-50">
        <HotelListings />
      </div>
    </main>
  );
};

export default HomePage;
