import {  SignUp } from "@clerk/react-router";
import { Link } from "react-router";


export default function Page() {
  return (
    <div className="mx-auto min-w-[390px]">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-center">
          <div className="relative min-h-[100px] w-fit min-w-[390px] rounded-2xl ">
            <SignUp />
          </div>
        </div>
        <div className="flex items-center justify-center pt-8 text-sm text-gray-500">
        <span>Already have an account?</span>
          <Link
            to={import.meta.env.VITE_CLERK_SIGN_IN_URL || ""}
            className="text-primary mx-2 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
