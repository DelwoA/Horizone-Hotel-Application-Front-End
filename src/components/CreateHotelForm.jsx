import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateHotelMutation } from "@/lib/api";

/**
 * Zod validation schema for the hotel creation form
 * Defines validation rules for each field in the form
 */
const formSchema = z.object({
  name: z.string().min(1), // Hotel name (required)
  location: z.string().min(1), // Location (required)
  image: z.string().url(), // Image URL (must be valid URL)
  price: z.number(), // Price (must be a number)
  description: z.string().min(10), // Description (minimum 10 characters)
});

/**
 * CreateHotelForm component - Form for creating new hotel listings
 * Uses React Hook Form with Zod validation and RTK Query for API calls
 */
const CreateHotelForm = () => {
  // RTK Query mutation hook for creating a hotel
  const [createHotel, { isLoading }] = useCreateHotelMutation();

  // Initialize form with Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  /**
   * Handle form submission
   * Sends validated form data to the API and shows toast notifications
   * @param {Object} values - Validated form values
   */
  const handleSubmit = async (values) => {
    const { name, location, image, price, description } = values;
    try {
      toast.loading("Creating hotel...");
      await createHotel({
        name,
        location,
        image,
        price,
        description,
      }).unwrap();
      toast.success("Hotel created successfully");
    } catch (error) {
      toast.error("Error creating hotel");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <div className="grid gap-6 sm:gap-8">
          {/* Hotel Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Hotel Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Hotel Name"
                    {...field}
                    className="text-sm sm:text-base py-2 bg-white"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Enter the name of the hotel.
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          {/* Location Field */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Location"
                    {...field}
                    className="text-sm sm:text-base py-2 bg-white"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Enter the location of the hotel.
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          {/* Image URL Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Image URL"
                    {...field}
                    className="text-sm sm:text-base py-2 bg-white"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Enter the image URL of the hotel.
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          {/* Price Field - with special handling for number conversion */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price per night"
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value));
                    }}
                    value={field.value}
                    className="text-sm sm:text-base py-2 bg-white"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Enter the price per night in USD.
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
          {/* Description Field - uses Textarea for longer content */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="text-sm sm:text-base min-h-[100px] sm:min-h-[120px] bg-white"
                  />
                </FormControl>
                <FormDescription className="text-xs sm:text-sm">
                  Enter the description of the hotel.
                </FormDescription>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
        {/* Form Submission Button - shows loading state */}
        <div className="mt-10">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto text-sm sm:text-base py-2 px-4 bg-teal-600 hover:bg-teal-700"
          >
            {isLoading ? "Creating..." : "Create Hotel"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;
