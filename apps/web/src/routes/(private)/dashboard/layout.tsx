import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router";
import { MainNavbar } from "@repo/ui/layout/main-nav";
import { MobileNavbar } from "@repo/ui/layout/mobile-nav";

import logo from "@/assets/care24-logo.png";
import icon from "@/assets/icon.png";
import { Bell } from "lucide-react";

export const LayoutDashboard = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="w-full md:flex">
        <div className="h-full shrink-0">
          <MainNavbar
            Care24icon={icon}
            Care24logo={logo}
            items={_nav}
            // cards={
            //   <>
            //     <ProfileCard />
            //     <AvailabilityCard />
            //   </>
            // }
          />
        </div>
        <div className="flex h-[72px] items-center justify-between border-b px-6 md:hidden">
          <MobileNavbar items={_nav} Care24logo={logo}>
            {/* <>
              <ProfileCard />
              <AvailabilityCard />
            </> */}
          </MobileNavbar>
          <NotificationPill />
        </div>
        <div className="flex w-full grow flex-col overflow-hidden py-4">
          <Outlet />
        </div>
      </div>
      <div className="grow" />
    </div>
  );
};

function Badge() {
  const eden = useEden();
  const { data: count, isLoading } = useQuery({
    queryKey: ["notification-count"],
    queryFn: () =>
      eden().then((e) => e.user.invitations.unread.get().then((k) => k.data)),
  });

  if (!count) return null;
  if (isLoading) return null;
  if (!count.length) return null;
  if (Number(count[0]?.count) === 0) return null;
  return (
    <div className=" bg-error-border min-w-[21px] animate-pulse rounded-full p-1 text-center text-xs font-bold leading-3 tracking-tight text-white">
      {count[0]?.count}
    </div>
  );
}

export function NotificationPill() {
    const eden = useEden();
    const { data: count, isLoading } = useQuery({
      queryKey: ["notification-count"],
      queryFn: () =>
        eden().then((e) => e.user.invitations.unread.get().then((k) => k.data)),
    });
  
    if (!count) return null;
    if (isLoading) return null;
    if (!count.length) return null;
    if (Number(count[0]?.count) === 0) return null;
    return (
      <>
        <Link
          to="/invitations"
          className="flex items-center space-x-2 p-1 lg:hidden"
        >
          <Bell />
          <Badge />
        </Link>
      </>
    );
  }
  

const UserType = {
  UNKNOWN: "UNKNOWN",
  REGISTERED_NURSE: "REGISTERED_NURSE",
  CARER: "CARER",
  ORGANISATION_ADMIN: "ORGANISATION_ADMIN",
  SYSTEM_ADMIN: "SYSTEM_ADMIN",
  REGISTERED_PRACTICAL_NURSE: "REGISTERED_PRACTICAL_NURSE",
  DOCTOR_OF_SOCIAL_WORK: "DOCTOR_OF_SOCIAL_WORK",
  PERSONAL_SUPPORT_WORKER: "PERSONAL_SUPPORT_WORKER",
  INTERNAL_STAFF: "INTERNAL_STAFF",
  DIETARY_AIDE: "DIETARY_AIDE",
} as const;
type UserType = keyof typeof UserType;

const normalUsers = [
  UserType.CARER,
  UserType.DOCTOR_OF_SOCIAL_WORK,
  UserType.PERSONAL_SUPPORT_WORKER,
  UserType.REGISTERED_NURSE,
  UserType.DIETARY_AIDE,
  UserType.REGISTERED_PRACTICAL_NURSE,
];

const withInternalStaff: UserType[] = [...normalUsers, UserType.INTERNAL_STAFF];

export const _nav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    show: withInternalStaff,
    icon: "LayoutGrid",
    child: [
      {
        title: "Overview",
        href: "/dashboard/overview",
        show: withInternalStaff,
        icon: "GanttChart",
      },
      {
        title: "Stats",
        href: "/dashboard/stats",
        show: withInternalStaff,
        icon: "TrendingUp",
      },
    ],
  },
  {
    title: "Shifts",
    href: "/shift-list",
    show: withInternalStaff,
    icon: "Briefcase",
    child: [
      {
        title: "All Shifts",
        href: "/shift-list/all",
        show: withInternalStaff,
        icon: "List",
      },
      {
        title: "Upcoming",
        href: "/shift-list/upcoming",
        show: withInternalStaff,
        icon: "Rss",
      },
      {
        title: "Completed",
        href: "/shift-list/completed",
        show: withInternalStaff,
        icon: "CheckCheck",
      },
      {
        title: "Cancelled",
        href: "/shift-list/cancelled",
        show: withInternalStaff,
        icon: "CircleOff",
      },
    ],
  },
  {
    title: "Timesheets",
    href: "/timesheet",
    show: withInternalStaff,
    icon: "Sheet",
  },
  {
    title: "Invitations",
    href: "/invitations",
    show: withInternalStaff,
    icon: "MailPlus",
    badge: <Badge />,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    show: [...normalUsers],
    icon: "Store",
  },
  {
    title: "Calendar",
    href: "/calendar",
    show: [...normalUsers],
    icon: "Calendar",
  },
  {
    title: "Settings",
    href: "/edit-profile",
    show: withInternalStaff,
    icon: "Settings",
  },
];
