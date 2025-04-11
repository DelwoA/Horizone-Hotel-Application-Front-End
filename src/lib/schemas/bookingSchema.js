import * as z from "zod";

// Form schema using zod for hotel booking validation
export const bookingFormSchema = z
  .object({
    checkInDate: z.date({
      required_error: "Check-in date is required.",
    }),
    checkOutDate: z.date({
      required_error: "Check-out date is required.",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    countryCode: z.string({
      required_error: "Please select a country code.",
    }),
    phoneNumber: z
      .string()
      .min(5, { message: "Phone number must be at least 5 digits." })
      .regex(/^[0-9]+$/, { message: "Phone number must contain only digits." }),
    roomNumber: z.number(),
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
  countryCode: "",
  phoneNumber: "",
  roomNumber: 1,
};
