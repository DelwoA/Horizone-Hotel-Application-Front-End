import Hero from "@/components/Hero";
import HotelListings from "@/components/HotelListings";

/**
 * HomePage Component
 *
 * The main landing page of the application featuring:
 * - Hero section with search functionality
 * - Background image with responsive optimization
 * - Hotel listings section showing available properties
 *
 * This component uses optimized image loading with the <picture> element
 * to provide the best performance across different devices and browsers.
 *
 * @component
 * @returns {JSX.Element} Rendered home page
 */
const HomePage = () => {
  return (
    <main>
      {/* Hero section with background image */}
      <div className="relative min-h-screen">
        <Hero />
        {/* Responsive image optimization */}
        {/* Uses <picture> element with multiple sources for different formats and resolutions */}
        <picture>
          {/* WebP format - smaller file size, better quality for modern browsers */}
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
          {/* Fallback image that gets replaced by the appropriate source above */}
          <img
            src="assets/hero@3x.jpg"
            alt="Swimming pool view of a hotel"
            className="absolute top-0 left-0 w-full h-full object-cover -z-10 brightness-90"
          />
        </picture>
      </div>
      {/* Hotel listings section with light background */}
      <div className="bg-gray-50">
        <HotelListings />
      </div>
    </main>
  );
};

export default HomePage;
