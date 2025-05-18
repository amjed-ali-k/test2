import { SignedIn } from "@clerk/react-router";
import { Outlet } from "react-router";

export const LayoutAuthenticated = () => {
  return (
    <SignedIn>
      <div>
        <Outlet />
      </div>
    </SignedIn>
  );
};
