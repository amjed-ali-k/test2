import { useEden } from "@/lib/api";
import { ActivityType, ShiftStatus } from "@/types/general";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@repo/ui/components/dialog";
import { Badge, Loader2Icon, DoorOpen, DoorClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { isAfter, isSameMinute } from "date-fns";
import { useTimesheet } from "@/hooks.ts/use-timesheet";
import { useQueryClient } from "@tanstack/react-query";
import { useEntries } from "@/hooks.ts/use-entries";

export function NewEntryModal({ id }: { id: string }) {
  const api = useEden();
  const queryClient = useQueryClient();
  const { timesheet, showEdit, key } = useTimesheet(id);
  const { checkin, checkout, entryKey } = useEntries(id);

  const status = timesheet?.shift.status;
  const time = timesheet?.shift?.start || new Date();

  const [processing, setProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const addStatus = async (activity: ActivityType) => {
    setProcessing(true);
    const { data } = await api.user
      .shift({
        shiftId: id,
      })
      .put({
        activity,
      });
    await queryClient.invalidateQueries({queryKey: key});
    await queryClient.invalidateQueries({queryKey: entryKey});
    toast(data?.message);
    setProcessing(false);
  };

  const handleCheckin = () => {
    addStatus(ActivityType.CHECK_IN).finally(() => {
      setIsOpen(false);
    });
  };

  const handleCheckOut = () => {
    addStatus(ActivityType.CHECK_OUT).finally(() => {
      setIsOpen(false);
    });
  };

  if (!time || !(isSameMinute(new Date(), time) || isAfter(new Date(), time))) {
    return null;
  }
  if (!status) return null;
  if ([ShiftStatus.CANCELLED, ShiftStatus.COMPLETED].includes(status))
    return null;
  if (!showEdit) return null;

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="md" className="w-full">
          {status !== "STARTED" ? "Check In " : "Check Out"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            Create an Entry
            {processing && (
              <Badge variant="outline">
                <Loader2Icon className="mr-1 size-4 animate-spin" /> Updating...
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Adding entries will record in the log with current time.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1">
          {!checkin && (
            <Button
              disabled={processing}
              onClick={handleCheckin}
              className="h-40 w-full hover:text-sky-600"
              variant="outline"
            >
              <div className="flex flex-col items-center text-lg">
                <DoorOpen className="h-12 w-12" />
                <span>Check in</span>
              </div>
            </Button>
          )}
          {checkin && !checkout && (
            <Button
              disabled={processing}
              onClick={handleCheckOut}
              className="h-40 w-full hover:text-lime-600"
              variant="outline"
            >
              <div className="flex flex-col items-center text-lg">
                <DoorClosed className="h-12 w-12" />
                <span>Check Out</span>
              </div>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
