import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateBookingMutation } from "@/lib/api";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema using zod
const formSchema = z
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

// Country codes for the dropdown
const countryCodes = [
  { id: 1, value: "+93", label: "Afghanistan (+93)" },
  { id: 2, value: "+355", label: "Albania (+355)" },
  { id: 3, value: "+213", label: "Algeria (+213)" },
  { id: 4, value: "+376", label: "Andorra (+376)" },
  { id: 5, value: "+244", label: "Angola (+244)" },
  { id: 6, value: "+1-264", label: "Anguilla (+1-264)" },
  { id: 7, value: "+1-268", label: "Antigua and Barbuda (+1-268)" },
  { id: 8, value: "+54", label: "Argentina (+54)" },
  { id: 9, value: "+374", label: "Armenia (+374)" },
  { id: 10, value: "+297", label: "Aruba (+297)" },
  { id: 11, value: "+61", label: "Australia (+61)" },
  { id: 12, value: "+43", label: "Austria (+43)" },
  { id: 13, value: "+994", label: "Azerbaijan (+994)" },
  { id: 14, value: "+1-242", label: "Bahamas (+1-242)" },
  { id: 15, value: "+973", label: "Bahrain (+973)" },
  { id: 16, value: "+880", label: "Bangladesh (+880)" },
  { id: 17, value: "+1-246", label: "Barbados (+1-246)" },
  { id: 18, value: "+375", label: "Belarus (+375)" },
  { id: 19, value: "+32", label: "Belgium (+32)" },
  { id: 20, value: "+501", label: "Belize (+501)" },
  { id: 21, value: "+229", label: "Benin (+229)" },
  { id: 22, value: "+1-441", label: "Bermuda (+1-441)" },
  { id: 23, value: "+975", label: "Bhutan (+975)" },
  { id: 24, value: "+591", label: "Bolivia (+591)" },
  { id: 25, value: "+387", label: "Bosnia and Herzegovina (+387)" },
  { id: 26, value: "+267", label: "Botswana (+267)" },
  { id: 27, value: "+55", label: "Brazil (+55)" },
  { id: 28, value: "+246", label: "British Indian Ocean Territory (+246)" },
  { id: 29, value: "+1-284", label: "British Virgin Islands (+1-284)" },
  { id: 30, value: "+673", label: "Brunei (+673)" },
  { id: 31, value: "+359", label: "Bulgaria (+359)" },
  { id: 32, value: "+226", label: "Burkina Faso (+226)" },
  { id: 33, value: "+257", label: "Burundi (+257)" },
  { id: 34, value: "+855", label: "Cambodia (+855)" },
  { id: 35, value: "+237", label: "Cameroon (+237)" },
  { id: 36, value: "+1", label: "Canada (+1)" },
  { id: 37, value: "+238", label: "Cape Verde (+238)" },
  { id: 38, value: "+1-345", label: "Cayman Islands (+1-345)" },
  { id: 39, value: "+236", label: "Central African Republic (+236)" },
  { id: 40, value: "+235", label: "Chad (+235)" },
  { id: 41, value: "+56", label: "Chile (+56)" },
  { id: 42, value: "+86", label: "China (+86)" },
  { id: 43, value: "+61", label: "Christmas Island (+61)" },
  { id: 44, value: "+61", label: "Cocos (Keeling) Islands (+61)" },
  { id: 45, value: "+57", label: "Colombia (+57)" },
  { id: 46, value: "+269", label: "Comoros (+269)" },
  { id: 47, value: "+242", label: "Congo (+242)" },
  { id: 48, value: "+243", label: "Congo, Democratic Republic of the (+243)" },
  { id: 49, value: "+682", label: "Cook Islands (+682)" },
  { id: 50, value: "+506", label: "Costa Rica (+506)" },
  { id: 51, value: "+385", label: "Croatia (+385)" },
  { id: 52, value: "+53", label: "Cuba (+53)" },
  { id: 53, value: "+599", label: "Curaçao (+599)" },
  { id: 54, value: "+357", label: "Cyprus (+357)" },
  { id: 55, value: "+420", label: "Czech Republic (+420)" },
  { id: 56, value: "+45", label: "Denmark (+45)" },
  { id: 57, value: "+253", label: "Djibouti (+253)" },
  { id: 58, value: "+1-767", label: "Dominica (+1-767)" },
  { id: 59, value: "+1-809", label: "Dominican Republic (+1-809)" },
  { id: 60, value: "+670", label: "East Timor (+670)" },
  { id: 61, value: "+593", label: "Ecuador (+593)" },
  { id: 62, value: "+20", label: "Egypt (+20)" },
  { id: 63, value: "+503", label: "El Salvador (+503)" },
  { id: 64, value: "+240", label: "Equatorial Guinea (+240)" },
  { id: 65, value: "+291", label: "Eritrea (+291)" },
  { id: 66, value: "+372", label: "Estonia (+372)" },
  { id: 67, value: "+251", label: "Ethiopia (+251)" },
  { id: 68, value: "+500", label: "Falkland Islands (+500)" },
  { id: 69, value: "+298", label: "Faroe Islands (+298)" },
  { id: 70, value: "+679", label: "Fiji (+679)" },
  { id: 71, value: "+358", label: "Finland (+358)" },
  { id: 72, value: "+33", label: "France (+33)" },
  { id: 73, value: "+594", label: "French Guiana (+594)" },
  { id: 74, value: "+689", label: "French Polynesia (+689)" },
  { id: 75, value: "+241", label: "Gabon (+241)" },
  { id: 76, value: "+220", label: "Gambia (+220)" },
  { id: 77, value: "+995", label: "Georgia (+995)" },
  { id: 78, value: "+49", label: "Germany (+49)" },
  { id: 79, value: "+233", label: "Ghana (+233)" },
  { id: 80, value: "+350", label: "Gibraltar (+350)" },
  { id: 81, value: "+30", label: "Greece (+30)" },
  { id: 82, value: "+299", label: "Greenland (+299)" },
  { id: 83, value: "+1-473", label: "Grenada (+1-473)" },
  { id: 84, value: "+590", label: "Guadeloupe (+590)" },
  { id: 85, value: "+1-671", label: "Guam (+1-671)" },
  { id: 86, value: "+502", label: "Guatemala (+502)" },
  { id: 87, value: "+44-1481", label: "Guernsey (+44-1481)" },
  { id: 88, value: "+224", label: "Guinea (+224)" },
  { id: 89, value: "+245", label: "Guinea-Bissau (+245)" },
  { id: 90, value: "+595", label: "Guyana (+595)" },
  { id: 91, value: "+509", label: "Haiti (+509)" },
  { id: 92, value: "+504", label: "Honduras (+504)" },
  { id: 93, value: "+852", label: "Hong Kong (+852)" },
  { id: 94, value: "+36", label: "Hungary (+36)" },
  { id: 95, value: "+354", label: "Iceland (+354)" },
  { id: 96, value: "+91", label: "India (+91)" },
  { id: 97, value: "+62", label: "Indonesia (+62)" },
  { id: 98, value: "+98", label: "Iran (+98)" },
  { id: 99, value: "+964", label: "Iraq (+964)" },
  { id: 100, value: "+353", label: "Ireland (+353)" },
  { id: 101, value: "+44-1624", label: "Isle of Man (+44-1624)" },
  { id: 102, value: "+972", label: "Israel (+972)" },
  { id: 103, value: "+39", label: "Italy (+39)" },
  { id: 104, value: "+225", label: "Ivory Coast (+225)" },
  { id: 105, value: "+1-876", label: "Jamaica (+1-876)" },
  { id: 106, value: "+81", label: "Japan (+81)" },
  { id: 107, value: "+962", label: "Jordan (+962)" },
  { id: 108, value: "+7", label: "Kazakhstan (+7)" },
  { id: 109, value: "+254", label: "Kenya (+254)" },
  { id: 110, value: "+686", label: "Kiribati (+686)" },
  { id: 111, value: "+965", label: "Kuwait (+965)" },
  { id: 112, value: "+996", label: "Kyrgyzstan (+996)" },
  { id: 113, value: "+856", label: "Laos (+856)" },
  { id: 114, value: "+371", label: "Latvia (+371)" },
  { id: 115, value: "+961", label: "Lebanon (+961)" },
  { id: 116, value: "+266", label: "Lesotho (+266)" },
  { id: 117, value: "+231", label: "Liberia (+231)" },
  { id: 118, value: "+218", label: "Libya (+218)" },
  { id: 119, value: "+423", label: "Liechtenstein (+423)" },
  { id: 120, value: "+370", label: "Lithuania (+370)" },
  { id: 121, value: "+352", label: "Luxembourg (+352)" },
  { id: 122, value: "+853", label: "Macao (+853)" },
  { id: 123, value: "+389", label: "Macedonia (+389)" },
  { id: 124, value: "+261", label: "Madagascar (+261)" },
  { id: 125, value: "+265", label: "Malawi (+265)" },
  { id: 126, value: "+60", label: "Malaysia (+60)" },
  { id: 127, value: "+960", label: "Maldives (+960)" },
  { id: 128, value: "+223", label: "Mali (+223)" },
  { id: 129, value: "+356", label: "Malta (+356)" },
  { id: 130, value: "+692", label: "Marshall Islands (+692)" },
  { id: 131, value: "+222", label: "Mauritania (+222)" },
  { id: 132, value: "+230", label: "Mauritius (+230)" },
  { id: 133, value: "+262", label: "Mayotte (+262)" },
  { id: 134, value: "+52", label: "Mexico (+52)" },
  { id: 135, value: "+691", label: "Micronesia (+691)" },
  { id: 136, value: "+373", label: "Moldova (+373)" },
  { id: 137, value: "+377", label: "Monaco (+377)" },
  { id: 138, value: "+976", label: "Mongolia (+976)" },
  { id: 139, value: "+382", label: "Montenegro (+382)" },
  { id: 140, value: "+1-664", label: "Montserrat (+1-664)" },
  { id: 141, value: "+212", label: "Morocco (+212)" },
  { id: 142, value: "+258", label: "Mozambique (+258)" },
  { id: 143, value: "+95", label: "Myanmar (+95)" },
  { id: 144, value: "+264", label: "Namibia (+264)" },
  { id: 145, value: "+674", label: "Nauru (+674)" },
  { id: 146, value: "+977", label: "Nepal (+977)" },
  { id: 147, value: "+31", label: "Netherlands (+31)" },
  { id: 148, value: "+687", label: "New Caledonia (+687)" },
  { id: 149, value: "+64", label: "New Zealand (+64)" },
  { id: 150, value: "+505", label: "Nicaragua (+505)" },
  { id: 151, value: "+227", label: "Niger (+227)" },
  { id: 152, value: "+234", label: "Nigeria (+234)" },
  { id: 153, value: "+683", label: "Niue (+683)" },
  { id: 154, value: "+672", label: "Norfolk Island (+672)" },
  { id: 155, value: "+47", label: "Norway (+47)" },
  { id: 156, value: "+968", label: "Oman (+968)" },
  { id: 157, value: "+92", label: "Pakistan (+92)" },
  { id: 158, value: "+680", label: "Palau (+680)" },
  { id: 159, value: "+970", label: "Palestine (+970)" },
  { id: 160, value: "+507", label: "Panama (+507)" },
  { id: 161, value: "+675", label: "Papua New Guinea (+675)" },
  { id: 162, value: "+595", label: "Paraguay (+595)" },
  { id: 163, value: "+51", label: "Peru (+51)" },
  { id: 164, value: "+63", label: "Philippines (+63)" },
  { id: 165, value: "+48", label: "Poland (+48)" },
  { id: 166, value: "+351", label: "Portugal (+351)" },
  { id: 167, value: "+1-787", label: "Puerto Rico (+1-787)" },
  { id: 168, value: "+974", label: "Qatar (+974)" },
  { id: 169, value: "+262", label: "Réunion (+262)" },
  { id: 170, value: "+40", label: "Romania (+40)" },
  { id: 171, value: "+7", label: "Russia (+7)" },
  { id: 172, value: "+250", label: "Rwanda (+250)" },
  { id: 173, value: "+685", label: "Samoa (+685)" },
  { id: 174, value: "+378", label: "San Marino (+378)" },
  { id: 175, value: "+239", label: "São Tomé and Príncipe (+239)" },
  { id: 176, value: "+966", label: "Saudi Arabia (+966)" },
  { id: 177, value: "+221", label: "Senegal (+221)" },
  { id: 178, value: "+381", label: "Serbia (+381)" },
  { id: 179, value: "+248", label: "Seychelles (+248)" },
  { id: 180, value: "+232", label: "Sierra Leone (+232)" },
  { id: 181, value: "+65", label: "Singapore (+65)" },
  { id: 182, value: "+421", label: "Slovakia (+421)" },
  { id: 183, value: "+386", label: "Slovenia (+386)" },
  { id: 184, value: "+677", label: "Solomon Islands (+677)" },
  { id: 185, value: "+252", label: "Somalia (+252)" },
  { id: 186, value: "+27", label: "South Africa (+27)" },
  { id: 187, value: "+82", label: "South Korea (+82)" },
  { id: 188, value: "+211", label: "South Sudan (+211)" },
  { id: 189, value: "+34", label: "Spain (+34)" },
  { id: 190, value: "+94", label: "Sri Lanka (+94)" },
  { id: 191, value: "+249", label: "Sudan (+249)" },
  { id: 192, value: "+597", label: "Suriname (+597)" },
  { id: 193, value: "+47", label: "Svalbard and Jan Mayen (+47)" },
  { id: 194, value: "+268", label: "Swaziland (Eswatini) (+268)" },
  { id: 195, value: "+46", label: "Sweden (+46)" },
  { id: 196, value: "+41", label: "Switzerland (+41)" },
  { id: 197, value: "+963", label: "Syria (+963)" },
  { id: 198, value: "+886", label: "Taiwan (+886)" },
  { id: 199, value: "+992", label: "Tajikistan (+992)" },
  { id: 200, value: "+255", label: "Tanzania (+255)" },
  { id: 201, value: "+66", label: "Thailand (+66)" },
  { id: 202, value: "+228", label: "Togo (+228)" },
  { id: 203, value: "+690", label: "Tokelau (+690)" },
  { id: 204, value: "+676", label: "Tonga (+676)" },
  { id: 205, value: "+1-868", label: "Trinidad and Tobago (+1-868)" },
  { id: 206, value: "+216", label: "Tunisia (+216)" },
  { id: 207, value: "+90", label: "Turkey (+90)" },
  { id: 208, value: "+993", label: "Turkmenistan (+993)" },
  { id: 209, value: "+1-649", label: "Turks and Caicos Islands (+1-649)" },
  { id: 210, value: "+688", label: "Tuvalu (+688)" },
  { id: 211, value: "+1-340", label: "U.S. Virgin Islands (+1-340)" },
  { id: 212, value: "+256", label: "Uganda (+256)" },
  { id: 213, value: "+380", label: "Ukraine (+380)" },
  { id: 214, value: "+971", label: "United Arab Emirates (+971)" },
  { id: 215, value: "+44", label: "United Kingdom (+44)" },
  { id: 216, value: "+1", label: "United States (+1)" },
  { id: 217, value: "+598", label: "Uruguay (+598)" },
  { id: 218, value: "+998", label: "Uzbekistan (+998)" },
  { id: 219, value: "+678", label: "Vanuatu (+678)" },
  { id: 220, value: "+379", label: "Vatican City (+379)" },
  { id: 221, value: "+58", label: "Venezuela (+58)" },
  { id: 222, value: "+84", label: "Vietnam (+84)" },
  { id: 223, value: "+681", label: "Wallis and Futuna (+681)" },
  { id: 224, value: "+967", label: "Yemen (+967)" },
  { id: 225, value: "+260", label: "Zambia (+260)" },
  { id: 226, value: "+263", label: "Zimbabwe (+263)" },
];

const HotelBooking = (props) => {
  console.log(props.hotelId);
  // RTK Query mutation hook for creating a hotel
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const [open, setOpen] = useState(false);

  // Initialize the form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkInDate: undefined, // or new Date() if you prefer
      checkOutDate: undefined, // same here
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      roomNumber: 1,
    },
  });

  // Handle form submission
  // Here the data is sent to the backend.
  // TODO: find out more about this values parameter, and where it came from.
  const onSubmit = async (values) => {
    try {
      toast.loading("Creating hotel...");
      const {
        checkInDate,
        checkOutDate,
        firstName,
        lastName,
        email,
        //country code
        phoneNumber,
        roomNumber,
      } = values;
      await createBooking({
        hotelId: props.hotelId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        firstName,
        lastName,
        email,
        //country code
        phoneNumber,
        roomNumber: roomNumber || 1,
      }).unwrap();
      toast.dismiss();
      toast.success("Hotel created successfully");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.dismiss();
      toast.error("Error creating hotel : ", error);
      toast.error(error?.data?.message || "Error creating booking");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          // Reset form errors when dialog is closed
          form.clearErrors();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="font-medium h-9 sm:h-10 px-4 sm:px-8 text-sm sm:text-base"
          // onClick={handleBook}
        >
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md sm:max-w-[500px] p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-2rem)]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl">Book Your Stay</DialogTitle>
          <DialogDescription>
            Fill in your details to complete your reservation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Check-in Date */}
              <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-in Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal h-10",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Check-out Date */}
              <FormField
                control={form.control}
                name="checkOutDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-out Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal h-10",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const checkInDate = form.getValues("checkInDate");
                            return checkInDate
                              ? date <= checkInDate
                              : date <
                                  new Date(new Date().setHours(0, 0, 0, 0));
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number with Country Code */}
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* TODO: Check the warning causes due to the key not being unique. */}
                        {countryCodes.map((code) => (
                          <SelectItem key={code.id} value={code.value}>
                            {code.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="123-456-7890"
                        {...field}
                        className="h-10"
                        onChange={(e) => {
                          // Only allow numeric characters
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4 flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  form.setValue("checkInDate", undefined);
                  form.setValue("checkOutDate", undefined);
                  setOpen(false);
                }}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto order-1 sm:order-2"
              >
                Complete Booking
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default HotelBooking;
