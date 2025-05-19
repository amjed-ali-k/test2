import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ActivityType } from "@/types/general";

export const useEntries = (id?: number | string) => {
    const entryKey = ["entries", id];
    const eden = useEden()
    const {
      data: entries,
    } = useQuery({
      queryKey: entryKey,
      queryFn: () => eden.user.timesheet({ timesheetId: id || 0 }).entries.get().then((k) => k.data),
      enabled: !!id,
    });
    const checkin = entries?.find((e) => e.type === ActivityType.CHECK_IN);
    const checkout = entries?.find((e) => e.type === ActivityType.CHECK_OUT);
    return { entries, checkin, checkout, entryKey };
  };
  