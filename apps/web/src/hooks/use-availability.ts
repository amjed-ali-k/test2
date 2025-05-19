import { useState } from "react";
import {
  addDays,
  isToday,
  setHours,
  startOfDay,
  startOfMinute,
  subMinutes,
} from "date-fns";
import { useUser } from "./use-user";
import { UserType } from "@/types/general";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEden } from "@/lib/api";
import { toast } from "sonner";

const timeVals = {
  morning: [6, 14],
  evening: [14, 22],
  night: [22, 30],
} as const;
const getBasicSlot = (day: Date, time: keyof typeof timeVals) => {
  return {
    start: startOfMinute(setHours(startOfDay(day), timeVals[time][0])),
    end: startOfMinute(
      subMinutes(setHours(startOfDay(day), timeVals[time][1]), 1)
    ),
  };
};

const tommorow = addDays(new Date(), 1);

export const useAvailability = () => {
  const dismissedData = localStorage.getItem("dismissedAvailability");
  const isTodayDismissed = dismissedData && isToday(new Date(dismissedData));
  const [isAvailableTommorow, setIsAvailableTommorow] = useState<
    boolean | null
  >(null);

  const user = useUser();
  const isInternalStaff = user && user?.type === UserType.INTERNAL_STAFF;

  const eden = useEden();

  const queryClient = useQueryClient();

  const { data: availablity } = useQuery({
    queryKey: ["availablity", startOfDay(tommorow)],
    queryFn: () =>
      eden.user
        .availablity({
          date: tommorow.toISOString(),
        })
        .get()
        .then((k) => k.data),
  });

  const [isLoading, setisLoading] = useState(false);

  const handleIsAvailable = async () => {
    setisLoading(true);
    const monring = getBasicSlot(tommorow, "morning");
    const eveing = getBasicSlot(tommorow, "evening");
    const night = getBasicSlot(tommorow, "night");
    await Promise.all([
      eden.user.availablity.put({
        start: monring.start,
        end: monring.end,
        available: true,
      }),
      eden.user.availablity.put({
        start: eveing.start,
        end: eveing.end,
        available: true,
      }),
      eden.user.availablity.put({
        start: night.start,
        end: night.end,
        available: true,
      }),
    ]);
    await queryClient.invalidateQueries({
      queryKey: ["availablity", startOfDay(tommorow)],
    });
    setIsAvailableTommorow(false);
    setisLoading(false);
    toast("Availablity updated", {
      description: `You are now available for tommorrow's shifts`,
    });
  };
  const handleUnvailable = () => {
    localStorage.setItem("dismissedAvailability", new Date().toISOString());
    setIsAvailableTommorow(false);
  };
  let show = true;

  if (isTodayDismissed) show = false;
  if (isInternalStaff) show = false;
  if (isAvailableTommorow === false) show = false;
  if (availablity && availablity.length > 0) show = false;
  return {
    isLoading,
    handleIsAvailable,
    setIsAvailableTommorow,
    handleUnvailable,
    show,
  };
};
