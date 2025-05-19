import { Dot } from "lucide-react";
import { Badge } from "../components/badge.js";
import { ShiftStatus } from "../types/general.js";

const shiftStatusMap = {
  [ShiftStatus.ASSIGNED]: "primary" as const,
  [ShiftStatus.REASSIGNED]: "primary" as const,
  [ShiftStatus.STARTED]: "gray" as const,
  [ShiftStatus.COMPLETED]: "success" as const,
  [ShiftStatus.CANCELLED]: "error" as const,
  [ShiftStatus.UNKNOWN]: "error" as const,
} as const;

export const ShiftStatusBadge = ({
  status,
  value,
}: {
  value?: string;
  status: ShiftStatus;
}) => {
  return (
    <Badge
      size="sm"
      className="pl-[6px] font-medium capitalize "
      variant={
        value && (status === "ASSIGNED" || status === "REASSIGNED")
          ? "primary"
          : shiftStatusMap[status] as any
      }
    >
      <Dot fill="currentColor" color="currentColor" strokeWidth={4} />
      {value
        ? value.toLowerCase().replaceAll("_", " ")
        : status === "ASSIGNED" || status === "REASSIGNED"
          ? "Upcoming"
          : status?.toLowerCase().replaceAll("_", " ")}
    </Badge>
  );
};
