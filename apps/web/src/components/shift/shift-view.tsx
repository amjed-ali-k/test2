import { type eden, useEden } from "@/lib/api";
import { ShiftAdStatus, type UserType } from "@/types/general";
import { Badge } from "@repo/ui/components/badge";
import { differenceInHours, format } from "date-fns";
import { Mask } from "../user/maks";
import { Sparkle } from "lucide-react";
import { title } from "radash";
import {
  OrganizationAvatar,
  OrganizationMiniAddress,
  OrganizationName,
  OrgGetDirections,
  OrgTimezoneBadge,
} from "../org/org-comp";
import { useQuery } from "@tanstack/react-query";
import { UserTypeBadge } from "../user/badge";

type EdenType = typeof eden;

const fetcher = (eden: EdenType, shiftAdId: number) =>
  eden.user
    .shiftAds({ shiftAdId })
    .get()
    .then((k) => k.data);
type ShiftAdType = Awaited<ReturnType<typeof fetcher>>;

export function ShiftAdView({ id }: { id: number }) {
  const eden = useEden();
  const { data: shiftAd } = useQuery({
    queryKey: ["shift-ad", id],
    queryFn: () => fetcher(eden, id),
    enabled: !!id,
  });

  return <ShiftViewComponent ad={shiftAd} />;
}

export function ShiftViewComponent({
  ad,
  hideVacancy = false,
}: {
  ad: ShiftAdType;
  hideVacancy?: boolean;
}) {
  const isPremium =
    ad.status === ShiftAdStatus.INVITATION_SENT_TO_INTERNAL_STAFF;
  const startDate = new Date(ad.shiftStart);
  const endDate = new Date(ad.shiftEnd);
  const hoursDifference = differenceInHours(endDate, startDate);
  const eden = useEden();
  const { data: applicationStatus } = useQuery({
    queryKey: ["application-status", ad.id],
    queryFn: () =>
      eden.user
        .shiftAds({
          shiftAdId: ad.id,
        })
        .applicationStatus.get()
        .then((k) => k.data),
    enabled: !!ad.id,
  });

  return (
    <>
      <Mask.AllExceptOrgAdmin>
        {isPremium && (
          <Badge
            className="mb-2 items-center space-x-1 text-[#C4320A]"
            variant="error"
          >
            <Sparkle size={14} />
            <span className="text-sm font-medium">Premium</span>
          </Badge>
        )}
      </Mask.AllExceptOrgAdmin>

      <section className="justify-between lg:flex">
        <div className="space-y-2">
          <div className=" flex items-center space-x-4">
            <h6 className="lg:text-base">
              {format(ad.shiftStart, "MMMM d, yyy")}
            </h6>
            <Mask.AllUsers>
              {applicationStatus !== undefined &&
                applicationStatus !== null && (
                  <Badge className="capitalize" variant="warning">
                    {title(applicationStatus.status.toLowerCase())}
                  </Badge>
                )}
            </Mask.AllUsers>
          </div>
          <div className=" flex items-center space-x-2 ">
            <h6 className="lg:text-base">
              {format(ad.shiftStart, "hh:mm a")} -{" "}
              {format(ad.shiftEnd, "hh:mm a")}
            </h6>
            <OrgTimezoneBadge id={ad.organizationId} />
          </div>
          <div className="bg-primary-bg-subtle text-primary-text inline-flex items-center space-x-2 rounded-full p-1 pr-3 ">
            <Badge variant="primary" className="bg-white">
              {getShiftType(ad.type)}
            </Badge>
            <span className=" text-primary-text text-xs font-medium ">
              {hoursDifference} hour shift
            </span>
          </div>
        </div>
        <div className="space-y-2 lg:flex lg:flex-col lg:items-end lg:space-y-3">
          {!hideVacancy && (
            <Mask.AdminsOnly>
              <h6 className="pt-3 lg:text-base">{ad.vacancy} Vacancy</h6>
            </Mask.AdminsOnly>
          )}
          <div className="mt-2">
            <UserTypeBadge type={ad.userType as UserType} />
          </div>
        </div>
      </section>

      <div className="border-b pb-5">
        <div className="lg:flex lg:justify-between">
          <div className="pt-3 lg:flex lg:items-center lg:space-x-4 ">
            <div className="hidden lg:block ">
              <OrganizationAvatar size={"lg"} id={ad.organizationId} />
            </div>
            <div>
              <OrganizationName
                className="text-2xl  font-semibold uppercase text-[#101828] lg:text-2xl"
                id={ad.organizationId}
              />
              <div className="hidden lg:block">
                <OrganizationMiniAddress id={ad.organizationId} />
              </div>
            </div>
          </div>
          <div>
            <Mask.AllCare24Users>
              <h1 className="lg:text-end">${ad.hourlyRate}/hour</h1>
            </Mask.AllCare24Users>
            <div className="hidden lg:block">
              <OrgGetDirections orgId={ad.organizationId} />
            </div>
          </div>
        </div>
        <div className=" lg:flex lg:hidden lg:justify-between ">
          <p className="mt-4 ">
            <OrganizationMiniAddress id={ad.organizationId} />
          </p>
          <OrgGetDirections orgId={ad.organizationId} />
        </div>
      </div>
    </>
  );
}

export const getShiftType = (type?: string) => {
  if (!type) return "Unknown";
  return title(type?.split("_")[0]?.toLowerCase());
};
