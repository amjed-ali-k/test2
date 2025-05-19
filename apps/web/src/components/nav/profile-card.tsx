import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { group, isObject } from "radash";
import { differenceInDays } from "date-fns";
import { Link } from "react-router";
import type { OnboardingMeta } from "@/types/general";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui/components/alert";
import { Progress } from "@repo/ui/components/progress";

export function ProfileCard() {
    const eden = useEden()
    const { data } = useQuery({
      queryKey: ["onboarding"],
      queryFn: () => eden.user.onboarding.status.get().then((e) => e.data),
    });
    const [dissmissed, setDismissed] = useState(false);
    const val = data?.value as OnboardingMeta;
    const { progress } = useMemo(() => {
      if (!val) {
        return {
          progress: 0,
        };
      }
      const steps = Object.values(val).filter(
        (e) => isObject(e) && !!e.status && !!e.required,
      ) as OnboardingMeta["addressDetails"][];
      const prog = group(steps, (e) => e.status);
      const active = prog.active?.length || 0;
      const done = prog.done?.length || 0;
      const notDone = prog["not-done"]?.length || 0;
      const progress = Math.round((done / (done + notDone + active)) * 100) || 0;
      return {
        progress,
      };
    }, [val]);
    if (!val) return null;
    if (progress >= 100) return null;
    const dismissedData = localStorage.getItem("dismissedProfile");
    const isDismissed =
      dismissedData && differenceInDays(new Date(), new Date(dismissedData)) <= 2;
  
    if (isDismissed) return null;
  
    const handleDismiss = () => {
      localStorage.setItem("dismissedProfile", new Date().toISOString());
      setDismissed(!dissmissed);
    };
  
    return (
      <Alert className="mb-2 hidden h-36 rounded-[8px] border-none bg-[#F9FAFB] lg:block">
        <AlertTitle className="text-sm font-semibold text-[#101828]">
          Complete your profile
        </AlertTitle>
        <AlertDescription className="text-xs font-normal text-[#475467]">
          We appreciate your efforts! Need more shifts? Complete your profile.
        </AlertDescription>
        <Progress className="mt-3 h-2 bg-[#E1EFFD]" value={progress} />
        <div className="mt-3 space-x-3 font-semibold lg:text-[13px] xl:text-sm ">
          <button
            type="button"
            onClick={handleDismiss}
            className="cursor-pointer text-[#475467] hover:text-[#475467c2] "
          >
            Dismiss
          </button>
          <Link
            className="text-[#1290E5] hover:text-[#1291e5c1] "
            to="/edit-profile"
          >
            Complete Profile
          </Link>
        </div>
      </Alert>
    );
  }
  
 