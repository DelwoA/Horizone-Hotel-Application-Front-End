import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * API configuration using Redux Toolkit Query
 * Defines all available API endpoints and authentication handling
 */
export const api = createApi({
  // Unique key for Redux store
  reducerPath: "api",

  // Configure base query with authentication
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/api/`,
    // Automatically add authentication token from Clerk to all requests
    prepareHeaders: async (headers, { getState }) => {
      const token = await window?.Clerk?.session?.getToken();
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // Define API endpoints
  endpoints: (builder) => ({
    // Get all hotels
    getHotels: builder.query({
      query: () => "hotels",
    }),

    // Search hotels with AI similarity search
    getHotelsForSearchQuery: builder.query({
      query: ({ query }) => `hotels/search/retrieve?query=${query}`,
    }),

    // Get a single hotel by ID
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`,
    }),

    // Create a new hotel (admin only)
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
    }),

    // Create a booking for a hotel
    createBooking: builder.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
    }),

    // Get user bookings
    getUserBookings: builder.query({
      query: (userId) => `bookings/user${userId ? `/${userId}` : ""}`,
      // Transform response to match frontend component expectations
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
        }));
      },
    }),
  }),
});

// Export hooks for using the API endpoints
export const {
  useGetHotelsQuery,
  useGetHotelsForSearchQueryQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
  useGetUserBookingsQuery,
} = api;

// Helper function to determine booking status based on dates
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
