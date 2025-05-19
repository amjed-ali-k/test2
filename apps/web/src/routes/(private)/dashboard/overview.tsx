import { useAvailability } from "@/hooks/use-availability";
import { Button } from "@repo/ui/components/button";
import { Skeleton } from "@repo/ui/components/skeleton";
import { Check, X } from "lucide-react";
import { WithLoaderIcon } from "@repo/ui/components/loader-mask";
import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { ShiftViewComponent } from "@/components/shift/shift-view";
import { useUser } from "@/hooks/use-user";
import CurrentShiftCard from "@/components/shift/current-shift-card";
import AllshiftsComponent from "@/components/shift/all-shifts";

export default function Page() {
  const user = useUser();
  return (
    <main className="px-4">
      <h2 className="lg:text-3xl">
        Welcome back, {user?.firstName} {user?.lastName}{" "}
      </h2>
      <p className=" lg:text-base">
        Track your shifts and monitor your earnings seamlessly.
      </p>
      <div className="mt-2 grow">
        <AvailabilityCard />
        <CurrentShiftCard />
        <UpcomingShifts />
      </div>
      <AllshiftsComponent />
    </main>
  );
}

function AvailabilityCard() {
  const { show, handleUnvailable, handleIsAvailable, isLoading } =
    useAvailability();
  if (!show) return null;
  if (isLoading) return <Skeleton className="h-[180px] w-full " />;
  return (
    <div className=" mt-5 w-full space-y-2 rounded-lg border bg-white p-4 ">
      <h2 className="text-base font-semibold text-[#101828] lg:text-lg">
        Are you available tomorrow ?
      </h2>
      <p className=" text-sm font-normal text-[#475467] lg:text-base ">
        It seems you didn't marked your availablity for close calls tommorrow.
        You can mark the availablity from the calendar.
      </p>
      <div className="flex grow items-center justify-end space-x-3 pt-4">
        <Button
          disabled={isLoading}
          onClick={handleUnvailable}
          variant="destructive"
          className=" bg-error-border"
          size="sm"
        >
          <WithLoaderIcon isLoading={isLoading}>
            <X />
          </WithLoaderIcon>
        </Button>
        <Button
          size="sm"
          variant="lighter"
          data-cy="availibity-card"
          disabled={isLoading}
          onClick={handleIsAvailable}
        >
          <WithLoaderIcon isLoading={isLoading}>
            <Check className="mr-1" />
          </WithLoaderIcon>
          Mark as available
        </Button>
      </div>
    </div>
  );
}

function UpcomingShifts() {
  const eden = useEden();
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["upcoming-jobs"],
    queryFn: () => eden.user.shift.upcoming.get().then((k) => k.data),
  });

  const upcoming = jobs
    ?.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 4);

  const shiftAdId = upcoming?.find((e) => e.shiftAdId)?.shiftAdId;

  const { data: shiftAd } = useQuery({
    queryKey: ["shift-ad", shiftAdId],
    queryFn: () =>
      eden.user
        .shiftAds({
          shiftAdId: shiftAdId || "",
        })
        .get()
        .then((k) => k.data),
    enabled: !!shiftAdId,
  });

  if (!isLoading && upcoming?.length === 0) return <div />;

  return (
    <>
      {upcoming && shiftAd && upcoming.length > 0 && (
        <div>
          {isLoading ? (
            <Skeleton className="h-[28px] lg:h-[32px] " />
          ) : (
            <h2 className="pt-6 lg:text-2xl ">Upcoming Shifts</h2>
          )}
          <div className="w-full space-y-2 rounded-lg border p-5">
            <ShiftViewComponent ad={shiftAd} />
            <div className=" pt-4 lg:flex lg:justify-end ">
              <Link to={`/shift/${upcoming[0]?.id}`}>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full lg:w-auto"
                >
                  View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
