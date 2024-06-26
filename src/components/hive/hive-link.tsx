import { cn } from "~/lib/utils";
import Link from "next/link";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button";

const linkVariants = cva("whitespace-nowrap ", {
  variants: {
    variant: {
      default: "text-secondary hover:underline",
      ghost: "text-sm text-primary/30 hover:underline",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      "button-outline": cn(
        buttonVariants({ variant: "outline" }),
        "hover:text-black"
      ),
      "button-secondary": cn(
        buttonVariants({ variant: "secondary" }),
        "hover:text-secondary-foreground"
      ),
    },
    size: {
      default: "",
      lg: "min-h-14 rounded-md px-8 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface HiveLinksProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof linkVariants> {
  asChild?: boolean;
}

const HiveLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  HiveLinksProps
>(({ className, variant, size, ...props }, ref) => (
  <Link
    ref={ref}
    className={cn(linkVariants({ variant, size, className }))}
    {...props}
  />
));

HiveLink.displayName = "HiveLink";

export { HiveLink };
