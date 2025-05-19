"use client";

import { useOrg } from "@/hooks.ts/use-org";
import { useEden } from "@/lib/api";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/avatar";
import { Badge } from "@repo/ui/components/badge";
import { Button, type ButtonProps } from "@repo/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { cn } from "@repo/ui/lib/utils";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-redeclare
import { Factory, Globe, Map as MapIcon, MapPin, Verified } from "lucide-react";

export function OrganizationName({
  id,
  className,
}: {
  id?: number | null;
  className?: string;
}) {
  const eden = useEden();
  const { organization, isLoading } = useOrg(id);

  const { data: orgStatus } = useQuery({
    queryKey: ["org-status", id],
    queryFn: () =>
      eden.user
          .organization({
            organizationId: id || 0,
          })
          .status.get()
          .then((e) => e.data
      ),
    enabled: !!id,
  });
  if (!id) return <p className={className}>N/A</p>;

  if (isLoading) {
    return <p className={className}>Loading...</p>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className={cn(className, " whitespace-nowrap")}>
            {organization?.name}
          </p>
        </TooltipTrigger>
        <TooltipContent className="hidden min-w-[350px] space-y-2 rounded-lg border bg-white p-4 text-sm font-normal text-[#475467] md:block">
          <div className="relative">
            <div className="flex justify-between space-x-4">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-0 right-0 -m-4 h-[60px] w-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent to-white" />
                    <img
                      alt="Cover"
                      src={
                        organization?.coverImage
                          ? organization.coverImage
                          : "https://care24-uploads.nyc3.digitaloceanspaces.com/d332owf4pf9sia3o2yznbfnf.png"
                      }
                      className="w-full object-cover"
                    />
                  </div>
                  <Avatar size="lg" className="border-2 bg-white">
                    <AvatarImage src={organization?.logo || undefined} />
                    <AvatarFallback>
                      {organization?.name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="mt-[70px]">
                  <h4 className="flex items-center ">
                    {organization?.name}
                    <Verified className="ml-2 inline-block size-5 text-green-600" />
                  </h4>
                  <h6 className="font-normal text-gray-800">
                    {organization?.email} | {organization?.phone}{" "}
                  </h6>
                  <h6 className="font-normal text-[#175CD3]">
                    {organization?.addressLine1} | {organization?.addressLine2}{" "}
                    | {organization?.city}
                  </h6>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-center">
                  <MapPin
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${organization?.latitude},${organization?.longitude}`
                      )
                    }
                    className="bg-primary-bg-subtle hover:bg-primary-bg-subtle/60 size-10 cursor-pointer rounded-full border border-[#1290E5] p-2.5"
                    color="#1290E5"
                  />
                </div>
                {organization?.website && (
                  <div className="flex justify-center">
                    <a
                      href={organization?.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe
                        className="bg-primary-bg-subtle hover:bg-primary-bg-subtle/60 size-10 cursor-pointer rounded-full border border-[#1290E5] p-2.5"
                        color="#1290E5"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <p className=" max-w-[300px] text-xs text-gray-500 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            corrupti maiores saepe quibusdam, necessitatibus suscipit.
          </p> */}
          {orgStatus && (
            <div className="grid grid-cols-3 gap-2 pt-6">
              <div className="flex flex-col  border-r border-gray-300 text-center">
                <h3> {orgStatus.totalAdsPosted || 0}</h3>
                <p className="text-xs font-normal text-[#475467]">
                  Ads <br /> Posted
                </p>
              </div>
              <div className="flex flex-col border-r border-r-gray-300 text-center">
                <h3> {orgStatus.totalJobs || 0}</h3>
                <p className="text-xs font-normal text-[#475467]">
                  Jobs <br /> Created
                </p>
              </div>
              <div className="flex flex-col text-center">
                <h3>{Math.round(orgStatus.totalPaidAmount || 0)}</h3>
                <p className="text-xs font-normal text-[#475467]">
                  Paid <br /> Amount
                </p>
              </div>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function OrganizationNameWithoutTooltip({ id }: { id?: number }) {
  const { organization, isLoading } = useOrg(id);

  if (!id) return <span>Unknown</span>;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return <span>{organization?.name}</span>;
}

export function OrganizationMiniAddress({ id }: { id?: number }) {
  const { organization, isLoading } = useOrg(id);

  if (!id) return <span>Unknown</span>;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <span>
      {organization?.city}, {organization?.pinCode}
    </span>
  );
}

export function OrganizationAvatar({
  id,
  size = "md",
}: {
  id?: number;
  size?: "default" | "sm" | "md" | "lg" | null | undefined;
}) {
  const { organization } = useOrg(id);

  if (!id) return null;

  return (
    <Avatar>
      <AvatarImage src={organization?.logo} />
      <AvatarFallback>{organization?.name.slice(0, 1)}</AvatarFallback>
    </Avatar>
  );
}

export function OrganizationPhone({ id }: { id?: number }) {
  const { organization } = useOrg(id);

  if (!id) return null;

  return <p>{organization?.phone}</p>;
}

export function OrganizationTimezone({ id }: { id?: number }) {
  const { organization, isLoading } = useOrg(id);

  if (!id) return <span>Unknown</span>;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return <span> {organization?.timezone} </span>;
}

export function SubBlockName({
  id,
  subBlockid,
}: {
  id?: number;
  subBlockid?: number;
}) {
  const { organization, isLoading } = useOrg(id);

  if (!id || !subBlockid) return <span>Unknown</span>;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <span className="whitespace-nowrap">
      {organization?.subBlocks.find((e) => e.id === subBlockid)?.name}
    </span>
  );
}

export function OrgLogo({
  id,
  className,
}: {
  id?: number;
  className?: string;
}) {
  const { organization, isLoading } = useOrg(id);

  if (!id) return <span />;

  if (isLoading) {
    return <span>...</span>;
  }

  if (!organization?.logo) return <Factory className="size-4" />;

  return (
    <img
      src={
        organization?.logo ||
        "https://utfs.io/f/8f647978-2556-421e-ac6a-c21debc2181f-hoodn9.png"
      }
      alt={organization?.name}
      className={className}
      width={16}
      height={16}
    />
  );
}

export function OrgGetDirectionsButton({ orgId, ...props }: ButtonProps & { orgId?: number | string }) {
  const { organization, isLoading } = useOrg(Number(orgId));

  if (!orgId) return <span />;

  if (isLoading) {
    return <span>...</span>;
  }

  return (
    <Button
      {...props}
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${organization?.latitude},${organization?.longitude}`
        )
      }
    />
  );
}

export function OrgGetDirections({ orgId }: { orgId?: number | string }) {
  const { organization, isLoading } = useOrg(Number(orgId));

  if (!orgId) return <span />;

  if (isLoading) {
    return <span>...</span>;
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${organization?.latitude},${organization?.longitude}`
        )
      }
      className="text-primary-bg-darker mt-2 inline-flex cursor-pointer items-center gap-1 text-sm font-medium"
    >
      <MapIcon />
      See direction
    </button>
  );
}



export function OrgTimezoneBadge({ id }: { id?: number }) {
  const { organization } = useOrg(id)

  if (!id) return null;

  return (
    organization?.timezone && (
      <Badge className=" text-medium " variant="gray">
        <span> {organization?.timezone} </span>
      </Badge>
    )
  );
}
