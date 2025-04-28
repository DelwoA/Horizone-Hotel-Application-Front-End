import { differenceInDays } from "date-fns";

/**
 * Calculate the total price for a hotel stay based on the number of nights
 * @param {number} pricePerNight - The price per night in USD
 * @param {Date} checkInDate - The check-in date
 * @param {Date} checkOutDate - The check-out date
 * @returns {object} Object containing nights, totalPrice, and formatted price
 */
export const calculateHotelPrice = (
  pricePerNight,
  checkInDate,
  checkOutDate
) => {
  if (!checkInDate || !checkOutDate || !pricePerNight) {
    return {
      nights: 0,
      totalPrice: 0,
      formattedPrice: "$0.00",
    };
  }

  // Calculate number of nights
  const nights = Math.max(1, differenceInDays(checkOutDate, checkInDate));

  // Calculate total price
  const totalPrice = pricePerNight * nights;

  // Format price for display
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  return {
    nights,
    totalPrice,
    formattedPrice,
  };
};
