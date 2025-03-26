import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend server URL
const BACKEND_URL = "https://aidf-horizone-backend-delwoathauda.onrender.com";

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
  }),
});

// Export hooks for using the API endpoints
export const {
  useGetHotelsQuery,
  useGetHotelsForSearchQueryQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
} = api;
