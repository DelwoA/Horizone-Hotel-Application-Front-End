import * as z from "zod";

// Form schema using zod for hotel booking validation
export const bookingFormSchema = z
  .object({
    checkInDate: z.date({
      required_error: "Please select a check-in date",
    }),
    checkOutDate: z.date({
      required_error: "Please select a check-out date",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    countryCode: z.string().min(1, {
      message: "Please select a country code",
    }),
    phoneNumber: z.string().min(6, {
      message: "Phone number must be at least 6 digits",
    }),
  })
  .refine((data) => data.checkOutDate > data.checkInDate, {
    message: "Check-out date must be after check-in date.",
    path: ["checkOutDate"],
  });

// Default form values
export const bookingFormDefaultValues = {
  checkInDate: undefined,
  checkOutDate: undefined,
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+1", // Default to US/Canada country code
  phoneNumber: "",
};
