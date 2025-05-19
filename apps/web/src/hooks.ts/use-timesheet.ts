import { useEden } from "@/lib/api";
import { TimesheetStatus } from "@/types/general";
import { useQuery } from "@tanstack/react-query";

export const useTimesheet = (id?: number | string) => {
  const eden = useEden();
  const key = ["timesheet", id];
  const { data: timesheet } = useQuery({
    queryKey: key,
    queryFn: () =>
      eden.user
        .timesheet({
          timesheetId: id || 0,
        })
        .get()
        .then((e) => e.data),

    enabled: !!id,
  });
  const showEdit = [
    TimesheetStatus.DRAFT,
    TimesheetStatus.REJECTED_BY_ADMIN,
    TimesheetStatus.REJECTED_BY_ORGANIZATION,
  ].includes(timesheet?.status);

  return { timesheet, showEdit, key };
};
