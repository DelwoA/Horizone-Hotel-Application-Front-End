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
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Hotel image container with hover effect */}
      <div className="relative h-44 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={props.hotel.image}
          alt={props.hotel.name}
        />
      </div>

      {/* Hotel details section */}
      <div className="p-5 flex-grow">
        {/* Hotel name */}
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
          {props.hotel.name}
        </h3>

        {/* Location with icon */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <p className="text-sm line-clamp-1">{props.hotel.location}</p>
        </div>

        {/* Ratings section */}
        <div className="flex items-center mb-4">
          <div className="flex items-center bg-teal-50 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-teal-600 fill-teal-600 mr-1" />
            <span className="font-medium text-teal-700">
              {props.hotel?.rating ?? "No Rating"}
            </span>
          </div>
          <span className="text-xs text-gray-500 ml-2">
            {`(${props.hotel.reviews?.toLocaleString() ?? "No"} Reviews)`}
          </span>
        </div>

        {/* Price and similarity display */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${props.hotel.price}
            </span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Similarity:{" "}
            {props.confidence ? (props.confidence * 100).toFixed(2) : "N/A"}%
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
