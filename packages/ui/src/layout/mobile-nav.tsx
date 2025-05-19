import type * as React from "react";
import { Menu, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../components/sheet.js";
import { ScrollArea } from "../components/scroll-area.js";
import { iconList, type MainNavItem, NavLinkItem, UserAccountNav, type UserNavProps } from "./main-nav.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion.js";
import { cn } from "../lib/utils.js";
import { useLocation } from "react-router";

type MobileNavProps = {
  items: MainNavItem[];
  children?: React.ReactNode;
  Care24logo?: string;
  isUserApproved?: boolean;
} & UserNavProps

export function MobileNavbar({ items, children, Care24logo, isUserApproved, ...rest }: MobileNavProps) {
  // const user = useUser();
  const location = useLocation();
  const segment = location.pathname.split("/")[1];

  return (
    <Sheet>
      <SheetTrigger className="flex items-center space-x-3 md:!hidden">
        <Menu size={30} strokeWidth={1.5} />
        <span>
          {Care24logo ? (
            <img src={Care24logo} alt="Carestream 24 Logo" width={125} />
          ) : (
            <span className="text-xl font-medium">Carestream 24</span>
          )}
        </span>
      </SheetTrigger>
      <SheetContent
        className="shadow-blue-gray-900/5 flex !h-[calc(100dvh)] w-[280px] flex-col p-0 shadow-xl"
        side="left"
      >
        <div className="flex h-[72px] items-center border-b px-6">
          <button
            type="button"
            className="flex items-center space-x-3 md:!hidden"
          >
            <SheetClose asChild>
              <X size={30} strokeWidth={1.5} />
            </SheetClose>
            <span>
              {Care24logo ? (
                <img src={Care24logo} alt="Carestream 24 Logo" width={125} />
              ) : (
                <span className="text-xl font-medium">Carestream 24</span>
              )}
            </span>
          </button>
        </div>

        <ScrollArea className="flex-grow">
          <section className="p-4 pt-0">
            {items?.length ? (
              <nav className="space-y-2">
                {isUserApproved &&
                  items?.map((item) => {
                    const Icon = item.icon ? iconList[item.icon] : null;

                    if (item.child)
                      <Accordion
                        key={item.title}
                        type="single"
                        collapsible
                        className="mt-6 w-full"
                      >
                        <AccordionItem
                          className="border-b-0"
                          value={item.title}
                        >
                          <AccordionTrigger
                            className={cn(
                              "[&[data-state=open]>svg]:text-primary-text hover:bg-primary-bg-subtle flex items-center rounded-[8px] px-4 py-2 text-base font-semibold hover:no-underline",
                              item.href.startsWith(`/${segment}`)
                                ? "text-primary-text bg-primary-bg-subtle"
                                : "bg-white text-[#344054]",
                              item.disabled && "cursor-not-allowed opacity-80"
                            )}
                          >
                            <span className="flex items-center text-left">
                              <div className="">
                                {Icon && <Icon className="" />}
                              </div>
                              <div className="px-3">{item.title}</div>
                              <RenderBadge badge={item.badge} />
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="mt-2">
                            <div className="flex flex-col space-y-2">
                              {item.child.map((child) => (
                                <SheetClose asChild key={child.href}>
                                  <NavLinkItem item={child} isExpanded={true} />
                                </SheetClose>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>;

                    return (
                      <SheetClose asChild key={item.href}>
                        <NavLinkItem item={item} isExpanded={true} />
                      </SheetClose>
                    );
                  })}
              </nav>
            ) : null}
          </section>
          {children}
        </ScrollArea>
        <div className="shrink-0 grow-0 border-t pb-1 pt-2">
          <UserAccountNav expanded={true} {...rest} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export const RenderBadge = ({ badge }: { badge: string | React.ReactNode }) => {
  return badge;
};
