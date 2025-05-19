import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Clock } from "lucide-react";
import { Link } from "react-router";
import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ShiftViewComponent } from "./shift-view";
import { RemainingTime } from "@repo/ui/components/time";
import { NewEntryModal } from "../dialog/new-entry";

function CurrentShiftCard() {
  const eden = useEden();
  const { data: currentShift } = useQuery({
    queryKey: ["current-shift"],
    queryFn: () => eden.user.shift.current.get().then((k) => k.data),
  });

  const { data: shiftAd, isLoading } = useQuery({
    queryKey: ["shift-ad", currentShift?.shiftAdId],
    queryFn: () =>
      eden.user
        .shiftAds({ shiftAdId: currentShift?.shiftAdId || "" })
        .get()
        .then((k) => k.data),
    enabled: !!currentShift?.shiftAdId,
  });

  if (!shiftAd) return null;

  if (isLoading) return <Skeleton className="h-[200px] w-full" />;

  return (
    <>
      <h2 className="pt-6 lg:text-2xl ">Current Shift</h2>

      <div className="w-full space-y-2 rounded-lg border p-5">
        <ShiftViewComponent ad={shiftAd} />
        <div className="w-full pt-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
          <div className="mb-2 flex w-full items-center justify-center space-x-4 rounded-2xl border px-6 py-4  pr-12 lg:mb-0 lg:h-24 lg:w-auto ">
            <Clock className="h-12 w-12 " />
            <div className="flex flex-col justify-center">
              <p>Remaining time</p>
              <p className="text-2xl font-extrabold">
                <RemainingTime to={currentShift?.end} />
              </p>
            </div>
          </div>
          <div>
            {currentShift && (
              <div className="hidden lg:mb-2 lg:block ">
                <NewEntryModal id={currentShift.id.toString()} />
              </div>
            )}
            <Link to={`/timesheet/${currentShift?.id}`}>
              <Button variant="primary" size="md" className=" w-full">
                View Timesheet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentShiftCard;
