import logo from "@/assets/care24-logo.png";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Page() {
  const navigate = useNavigate();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const t = setTimeout(() => {
      navigate("/sign-in");
    }, 2000);
    return () => clearTimeout(t);
  }, []);
  
  return (
    <div className="mx-auto min-w-[390px]">
      <div className="flex flex-col space-y-2 text-center">
        <img
          src={logo}
          className="mx-auto"
          alt="Carestream 24 Logo"
          width={200}
        />
        <h1 className="text-2xl font-semibold tracking-tight">
          Signing out...
        </h1>
        <p className="text-sm text-muted-foreground">
          Wait until you are redirected to the sign in page
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative min-h-[280px] w-fit min-w-[390px] bg-slate-100">
          <p className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="mr-2 size-4 animate-spin" /> Loading...
          </p>
        </div>
      </div>
      {/* <SignOutComponent /> */}
    </div>
  );
}
