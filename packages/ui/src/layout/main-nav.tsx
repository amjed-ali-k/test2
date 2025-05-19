import type * as React from "react";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  Ambulance,
  Award,
  BadgeDollarSign,
  Briefcase,
  Building2,
  Calendar,
  CalendarCheck,
  CalendarDays,
  CheckCheck,
  ChevronRight,
  CircleOff,
  Factory,
  File,
  FileClock,
  FileSearch2Icon,
  GanttChart,
  LayoutGrid,
  List,
  type LucideIcon,
  MailPlus,
  Megaphone,
  Rss,
  Search,
  Settings,
  Sheet,
  Store,
  TrendingUp,
  User,
  User2,
  UserPlus2Icon,
  UsersRound,
  Wrench,
} from "lucide-react";

import { cn } from "../lib/utils.js";
import { ScrollArea } from "../components/scroll-area.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion.js";
import { RenderBadge } from "./mobile-nav.js";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: string;
  badge?: React.ReactNode;
  child?: NavItem[];
};

export type MainNavItem = NavItem;

interface MainNavProps {
  items?: MainNavItem[];
  Care24logo: string;
  Care24icon: string;
  cards?: React.ReactNode | React.ReactNode[];
  isUserApproved?: boolean;
}

export function MainNavbar({
  items,
  Care24logo,
  Care24icon,
  cards,
  isUserApproved,
}: MainNavProps) {
  //   const segment = useSelectedLayoutSegment();
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const segment = location.pathname.split("/")[1];



  return (
    <div
      className={cn(
        "shadow-blue-gray-900/5 sticky left-0 top-0 hidden !h-screen w-fit flex-col border-r md:flex md:p-4 lg:w-[240px] xl:w-[315px]",
        isExpanded ? "left-[240px] md:w-[240px]" : "left-[110px] md:w-[110px]",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="shrink-0 grow-0">
        <Link
          to="/dashboard"
          className="mt-2 hidden h-8 items-center space-x-2 lg:flex"
        >
          <img src={Care24logo} alt="Carestream 24 Logo" width={180} />
        </Link>

        <div className="mb-6 mt-4 flex items-center justify-between lg:hidden">
          <Link
            to="/dashboard"
            className="flex items-center justify-center space-x-2"
          >
            <img
              src={Care24icon}
              alt="Carestream 24 Logo"
              width={40}
              className={cn(isExpanded ? "hidden" : "block")}
            />
            <img
              src={Care24logo}
              alt="Carestream 24 Logo"
              width={155}
              className={cn(isExpanded ? "block" : "hidden")}
            />
          </Link>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            className="p-2"
          >
            <ChevronRight
              className={cn(
                "transition-transform duration-300",
                isExpanded ? "rotate-180" : ""
              )}
            />
          </button>
        </div>
      </div>
      <div className="grow overflow-hidden pb-5 lg:py-4">
        <ScrollArea className="flex h-full w-full shrink flex-col pr-0.5 ">
          {isUserApproved && items?.length ? (
            <nav className="space-y-1">
              {items?.map((item) => {
                const Icon = item.icon ? iconList[item.icon] : null;
                if (item.child)
                  return (
                    <Accordion
                      key={item.title}
                      type="single"
                      collapsible
                      className="w-full"
                    >
                      <AccordionItem className="border-b-0" value={item.title}>
                        <AccordionTrigger
                          className={cn(
                            "[&[data-state=open]>svg]:text-primary-text hover:bg-primary-bg-subtle flex items-center justify-between rounded-[8px] px-4 text-base font-semibold hover:no-underline",
                            isExpanded
                              ? "md:justify-between"
                              : "md:justify-center",
                            " md:h-12 md:p-3 lg:h-10 lg:justify-between",
                            item.href.startsWith(`/${segment}`)
                              ? "text-primary-text bg-primary-bg-subtle"
                              : "bg-white text-[#344054]",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          <span className="flex items-center">
                            <div className="md:size-8 lg:size-6">
                              {Icon && (
                                <Icon className=" md:size-8 md:p-1 lg:size-6 lg:p-0" />
                              )}
                            </div>
                            <div
                              className={cn(
                                "px-3",
                                isExpanded ? "md:block" : "md:hidden",
                                "lg:block"
                              )}
                            >
                              {item.title}
                            </div>
                          </span>
                          {item.badge && (
                            <div
                              className={cn(
                                "ml-auto",
                                isExpanded ? "md:block" : "md:hidden",
                                "lg:block"
                              )}
                            >
                              <RenderBadge badge={item.badge} />
                            </div>
                          )}
                        </AccordionTrigger>
                        <AccordionContent className="mt-1">
                          <div className="flex flex-col space-y-1">
                            {item.child.map((child) => (
                              <NavLinkItem
                                item={child}
                                isExpanded={isExpanded}
                                key={child.title}
                              />
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                return (
                  <NavLinkItem
                    item={item}
                    isExpanded={isExpanded}
                    key={item.title + item.href}
                  />
                );
              })}
            </nav>
          ) : null}
        </ScrollArea>
      </div>
      {cards}
      <div className="shrink-0 grow-0 border-t pb-1 pt-2">
        {/* <UserAccountNav expanded={isExpanded} /> */}
      </div>
    </div>
  );
}

export function NavLinkItem({
  item,
  isExpanded,
}: {
  item: NavItem;
  isExpanded: boolean;
}) {

  const Icon = item.icon ? iconList[item.icon] : null;

  return (
    <NavLink
      to={item.disabled ? "#" : item.href}
      className={({isActive, isPending}) => cn(
        "hover:bg-primary-bg-subtle text-gray-500 flex items-center justify-between rounded-[8px] px-4 py-2 text-base font-semibold",
        isExpanded ? "md:justify-between" : "md:justify-left",
        "md:h-14 md:p-3 lg:h-10 lg:justify-between",
        isActive
          ? "text-primary-text bg-primary-bg-subtle"
          : "bg-white text-[#344054]",
        isPending && "cursor-not-allowed opacity-80",
        item.disabled && "cursor-not-allowed opacity-80"
      )}
    >
      <div className="flex items-center">
        <div className="md:size-8 lg:size-6">
          {Icon && (
            <Icon
              className={cn(" md:size-8 md:p-1 lg:size-6 lg:p-0")}
            />
          )}
        </div>
        <div
          className={cn(
            "px-3",
            isExpanded ? "md:block" : "md:hidden",
            "lg:block"
          )}
        >
          {item.title}
        </div>
      </div>
      {item.badge && (
        <div className={cn(isExpanded ? "md:block" : "md:hidden", "lg:block")}>
          <RenderBadge badge={item.badge} />
        </div>
      )}
    </NavLink>
  );
}

export const iconList: { [key: string]: LucideIcon } = {
  Briefcase: Briefcase,
  Calendar: Calendar,
  CheckCheck: CheckCheck,
  CircleOff: CircleOff,
  GanttChart: GanttChart,
  LayoutGrid: LayoutGrid,
  List: List,
  MailPlus: MailPlus,
  Rss: Rss,
  Settings: Settings,
  Sheet: Sheet,
  Store: Store,
  TrendingUp: TrendingUp,
  Search: Search,
  Award: Award,
  BadgeDollarSign: BadgeDollarSign,
  CalendarCheck: CalendarCheck,
  Factory: Factory,
  File: File,
  FileClock: FileClock,
  FileSearch2Icon: FileSearch2Icon,
  Megaphone: Megaphone,
  User: User,
  User2: User2,
  UsersRound: UsersRound,
  UserPlus2Icon,
  Wrench,
  Building2,
  CalendarDays,
  Ambulance,
};
