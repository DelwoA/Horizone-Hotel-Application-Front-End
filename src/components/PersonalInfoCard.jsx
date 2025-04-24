import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Pencil } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PersonalInfoCard = ({ user, isLoading = false }) => {
  // Set default values for user data if it's not available
  const userData = {
    fullName: user?.fullName || "Not provided",
    email: user?.emailAddresses?.[0]?.emailAddress || "Not provided",
    phone: user?.phoneNumbers?.[0]?.phoneNumber || "No Phone Number",
    address: user?.address?.streetAddress || "No Address",
  };

  // Loading state UI with skeleton placeholders
  if (isLoading) {
    return (
      <div>
        <Card className="border border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-shrink-0">
                <Skeleton className="h-24 w-24 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 flex-grow">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Skeleton className="h-5 w-5 mt-0.5" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Card className="border border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Personal Information</CardTitle>
            <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">
              <Pencil size={14} className="mr-1" /> Edit
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-muted">
                <img
                  src={
                    user?.imageUrl ||
                    "https://media.licdn.com/dms/image/v2/D5603AQHNZ5yhUn9uwA/profile-displayphoto-shrink_200_200/B56ZQXB30HH0AY-/0/1735553155377?e=2147483647&v=beta&t=LF9qvyaz4_rqvfFrygEF1AGHIthSm_vaV6UViH7wlCo"
                  }
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 flex-grow">
              <div className="flex items-start gap-2">
                <User size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{userData.fullName}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{userData.address}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoCard;
