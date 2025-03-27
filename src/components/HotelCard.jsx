import { MapPin, Star } from "lucide-react";
import { Link } from "react-router";

/**
 * HotelCard component - Displays a hotel card with image and details
 * @param {Object} props - Component props
 * @param {Object} props.hotel - Hotel data object
 * @param {string} props.hotel._id - Unique identifier for the hotel
 * @param {string} props.hotel.image - URL of the hotel image
 * @param {string} props.hotel.name - Name of the hotel
 * @param {string} props.hotel.location - Location of the hotel
 * @param {number} props.hotel.rating - Rating of the hotel
 * @param {number} props.hotel.reviews - Number of reviews
 * @param {number} props.hotel.price - Price per night
 * @param {number} props.confidence - Confidence score for search results (if applicable)
 */
const HotelCard = (props) => {
  return (
    // Wrap the entire card in a Link for navigation to the hotel detail page
    <Link
      to={`hotels/${props.hotel._id}`}
      key={props.hotel._id}
      className="group w-full flex flex-col"
    >
      {/* Hotel image container with hover effect */}
      <div className="aspect-[4/3] overflow-hidden rounded-xl">
        <img
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={props.hotel.image}
          alt={props.hotel.name}
        />
      </div>

      {/* Hotel details section */}
      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
        {/* Hotel name */}
        <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
          {props.hotel.name}
        </h3>

        {/* Location with icon */}
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <p className="text-sm sm:text-base line-clamp-1">
            {props.hotel.location}
          </p>
        </div>

        {/* Ratings section */}
        <div className="flex items-center">
          <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-primary text-primary" />
          <span className="ml-1 text-sm sm:text-base font-medium">
            {props.hotel?.rating ?? "No Rating"}
          </span>
          <span className="ml-1 text-xs sm:text-sm text-muted-foreground">
            {`(${props.hotel.reviews?.toLocaleString() ?? "No"} Reviews)`}
          </span>
        </div>

        {/* Price display */}
        <div className="text-base sm:text-xl font-bold">
          ${props.hotel.price}
        </div>

        {/* Search confidence score (if from search results) */}
        <p className="text-xs sm:text-sm text-muted-foreground">
          Similarity: {(props.confidence * 100).toFixed(2)}%
        </p>
      </div>
    </Link>
  );
};

export default HotelCard;
