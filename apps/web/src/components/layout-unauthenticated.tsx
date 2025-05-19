import { SignedOut } from "@clerk/react-router";
import { Outlet } from "react-router";
import logo from "@/assets/care24-logo.png";
import SignOutButton from "@/components/auth/sign-out-button";
import { Mail } from "lucide-react";
import cover from "@/assets/images/login-cover.jpg";
import { Toaster } from "@repo/ui/components/sonner";

export const LayoutUnauthenticated = () => {
  return (
    <SignedOut>
         <div className="grid h-screen w-screen grid-rows-1 lg:grid-cols-2">
      <div className="flex flex-col ">
        <div className="flex w-full items-center justify-between">
          <img
            
            src={logo}
            className="mx-4 mt-2"
            alt="Carestream 24 Logo"
            width={200}
          />
          <SignOutButton className="mx-3" />
        </div>
        <div className="mx-auto flex w-full grow flex-col justify-center space-y-6 ">
          <div className="mx-auto min-w-[390px]"><Outlet /></div>
        </div>
        <div className="flex items-center justify-between px-6 py-4">
          <div>&copy; Carestream 24</div>
          <div className="flex items-center">
            <Mail className="mr-2 size-4" />
            <span>support@carestream24.ca</span>
          </div>
        </div>
      </div>
      <div>
        <img
          src={cover}
          alt="Cover"
          className="hidden h-full w-full object-cover lg:!block"
        />
      </div>
      <Toaster />
    </div>
    </SignedOut>
  );
};
