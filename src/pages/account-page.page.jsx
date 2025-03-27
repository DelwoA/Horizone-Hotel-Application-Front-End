import { useUser } from "@clerk/clerk-react";

const AccountPage = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
        My Account
      </h1>
      <div className="mt-4 sm:mt-6 md:mt-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-2 sm:space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              Name: {user?.fullName}
            </p>
          </div>
          <div className="space-y-2 sm:space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              Email: {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
