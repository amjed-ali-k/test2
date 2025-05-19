import { useAvailability } from "@/hooks/use-availability";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui/components/alert";
import { WithLoaderText } from "@repo/ui/components/loader-mask";

export function AvailabilityCard() {
  const { show, setIsAvailableTommorow, handleIsAvailable, isLoading } =
    useAvailability();

  if (!show) return null;

  return (
    <Alert className="mb-2 hidden h-36 rounded-[8px] border-none bg-[#F9FAFB] lg:block">
      <AlertTitle className="text-sm font-semibold text-[#101828]">
        Are you available tomorrow?
      </AlertTitle>
      <AlertDescription className="text-xs font-normal text-[#475467]">
        It seems you didn't marked your availablity for close calls tommorrow.
        You can mark the availablity from the calendar.
      </AlertDescription>

      <div className="mt-3 space-x-3 font-semibold lg:text-[13px] xl:text-sm ">
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(
              "dismissedAvailability",
              new Date().toISOString()
            );
            setIsAvailableTommorow(false);
          }}
          className="cursor-pointer text-[#475467] hover:text-[#475467c2] "
        >
          Dismiss
        </button>
        <button
          type="button"
          onClick={handleIsAvailable}
          className="text-[#1290E5] hover:text-[#1291e5c1] "
        >
          <WithLoaderText isLoading={isLoading}>Mark available</WithLoaderText>
        </button>
      </div>
    </Alert>
  );
}
