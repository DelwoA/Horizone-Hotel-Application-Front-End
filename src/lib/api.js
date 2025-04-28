import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * API Configuration for Hotel Booking System
 *
 * This module sets up a centralized API layer using Redux Toolkit Query.
 * It handles:
 * - API endpoint definitions
 * - Authentication token management
 * - Request/response formatting
 * - Caching and data transformation
 *
 * All API interactions with the backend should use these endpoints
 * to ensure consistent behavior and centralized error handling.
 */
export const api = createApi({
  // Unique identifier for Redux store
  reducerPath: "api",

  // Configure base URL and authentication
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/`,
    // Add authentication token from Clerk to all requests
    prepareHeaders: async (headers, { getState }) => {
      const token = await window?.Clerk?.session?.getToken();
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // Define all API endpoints
  endpoints: (builder) => ({
    /**
     * Get all hotels without filtering
     * Used for displaying the complete hotel collection
     */
    getHotels: builder.query({
      query: () => "hotels",
    }),

    /**
     * Get hotels with filtering and sorting options
     * Supports:
     * - Location filtering (multi-select)
     * - Price sorting (asc/desc)
     *
     * @param {Object} options - Filter and sort options
     * @param {Array} options.locations - Array of location names to filter by
     * @param {string} options.sortBy - Field to sort by (e.g., "price")
     * @param {string} options.sortOrder - Sort direction ("asc", "desc", "none")
     */
    getFilteredSortedHotels: builder.query({
      query: ({ locations, sortBy, sortOrder }) => {
        let queryParams = new URLSearchParams();

        // Add location filter if locations are provided
        if (locations && locations.length > 0) {
          queryParams.append("location", locations.join(","));
        }

        // Add sorting parameters if valid sort is specified
        if (sortBy && sortOrder && sortOrder !== "none") {
          queryParams.append("sortBy", sortBy);
          queryParams.append("sortOrder", sortOrder);
        }

        return `hotels/filter?${queryParams.toString()}`;
      },
    }),

    /**
     * Search hotels using AI-powered similarity search
     * Returns hotels that semantically match the search query
     *
     * @param {Object} options - Search options
     * @param {string} options.query - Text search query
     */
    getHotelsForSearchQuery: builder.query({
      query: ({ query }) => `hotels/search/retrieve?query=${query}`,
    }),

    /**
     * Get detailed information for a single hotel by ID
     *
     * @param {string} id - Hotel ID
     */
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`,
    }),

    /**
     * Create a new hotel (admin only)
     *
     * @param {Object} hotel - Hotel data object with name, location, image, price, etc.
     */
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
    }),

    /**
     * Create a new booking for a hotel
     * Stores booking information with PENDING payment status
     *
     * @param {Object} booking - Booking data with guest info, dates, room, etc.
     */
    createBooking: builder.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
    }),

    /**
     * Create a Stripe checkout session for payment
     * Takes a booking ID and returns a URL to redirect to Stripe checkout
     *
     * @param {string} bookingId - ID of the booking to pay for
     */
    createCheckoutSession: builder.mutation({
      query: (bookingId) => ({
        url: `payment/checkout/${bookingId}`,
        method: "POST",
      }),
    }),

    /**
     * Get payment status for a booking
     * Used to check if payment was successful
     *
     * @param {string} bookingId - ID of the booking to check
     */
    getPaymentStatus: builder.query({
      query: (bookingId) => `payment/status/${bookingId}`,
    }),

    /**
     * Get all bookings for the current user or a specific user
     *
     * @param {string} userId - User ID (optional, defaults to current user)
     */
    getUserBookings: builder.query({
      query: (userId) => `bookings/user${userId ? `/${userId}` : ""}`,
      // Transform response to format expected by frontend components
      transformResponse: (response) => {
        if (!Array.isArray(response)) {
          return [];
        }

        return response.map((booking) => ({
          id: booking._id || booking.id,
          hotelId: booking.hotelId,
          hotelName: booking.hotelName || "Hotel information loading...",
          guestName: `${booking.firstName || ""} ${
            booking.lastName || ""
          }`.trim(),
          roomNumber: booking.roomNumber,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          email: booking.email,
          phone: booking.phoneNumber,
          status: determineBookingStatus(booking.checkIn, booking.checkOut),
          paymentStatus: booking.paymentStatus || "PENDING",
        }));
      },
    }),

    /**
     * Verify Stripe session status directly after redirect
     * Used on payment success/failure page to show appropriate UI
     *
     * @param {string} sessionId - Stripe session ID from URL
     */
    checkStripeSession: builder.query({
      query: (sessionId) => `payment/session/${sessionId}`,
    }),
  }),
});

// Export hooks for using the API endpoints
export const {
  useGetHotelsQuery,
  useGetFilteredSortedHotelsQuery,
  useGetHotelsForSearchQueryQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
  useCreateCheckoutSessionMutation,
  useGetPaymentStatusQuery,
  useCheckStripeSessionQuery,
  useGetUserBookingsQuery,
} = api;

/**
 * Determine booking status based on check-in and check-out dates
 *
 * @param {string|Date} checkInDate - Booking check-in date
 * @param {string|Date} checkOutDate - Booking check-out date
 * @returns {string} Status: 'upcoming', 'active', or 'completed'
 */
const determineBookingStatus = (checkInDate, checkOutDate) => {
  const now = new Date();
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (now < checkIn) {
    return "upcoming";
  } else if (now > checkOut) {
    return "completed";
  } else {
    return "active";
  }
};
