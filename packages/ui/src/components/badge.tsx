import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        primary: " bg-primary-bg-subtle text-primary-text ",
        warning: " bg-warning-bg-subtle text-warning-text",
        error: " bg-error-bg-subtle text-error-text",
        gray: " bg-body-bg-subtle text-body-text ",
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        REGISTERED_NURSE: " bg-[#EFF8FF] text-[#175CD3] ",
        REGISTERED_PRACTICAL_NURSE: " bg-[#FDF2FA] text-[#C11574]",
        PERSONAL_SUPPORT_WORKER: "bg-[#EEF4FF] text-[#6941C6] ",
        DIETARY_AIDE: " bg-[#F2F4F7] text-[#344054] ",
        DOCTOR_OF_SOCIAL_WORK: " bg-[#F4F3FF] text-[#5925DC]",
        UNKNOWN: " bg-[#F4F3FF] text-[#5925DC]",
        SYSTEM_ADMIN: " bg-[#F4F3FF] text-[#5925DC]",
        ORGANISATION_ADMIN: " bg-[#F4F3FF] text-[#5925DC]",
        NURSE_PRACTITIONER: " bg-[#FFFBED] text-[#FDA512] ",
        CARER: " bg-primary-bg-subtle text-[#1290E5]",
        INTERNAL_STAFF: "bg-warning-bg-subtle text-warning-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
