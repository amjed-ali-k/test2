import type { UserType } from "@/types/general";
import { Badge } from "@repo/ui/components/badge";
import { title } from "radash";

const userTypeVarients = [
    "REGISTERED_NURSE",
    "REGISTERED_PRACTICAL_NURSE",
    "PERSONAL_SUPPORT_WORKER",
    "DIETARY_AIDE",
    "DOCTOR_OF_SOCIAL_WORK",
    "NURSE_PRACTITIONER",
    "CARER",
    "INTERNAL_STAFF",
  ];
export const UserTypeBadge = ({ type }: { type?: UserType }) => {
    const t = Array.isArray(type) ? type[0] : type;
    const isIncluded = userTypeVarients.includes(t);
  
    return (
      <Badge
        variant={isIncluded ? t : "warning"}
        className=" whitespace-nowrap capitalize"
      >
        {title(t?.toLowerCase())}
      </Badge>
    );
  };