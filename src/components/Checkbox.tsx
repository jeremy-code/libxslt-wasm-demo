import type { ComponentPropsWithRef } from "react";

import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "#utils/cn.ts";

export const Checkbox = ({
  className,
  ...props
}: Omit<ComponentPropsWithRef<typeof CheckboxPrimitive.Root>, "children">) => (
  <CheckboxPrimitive.Root
    className={cn(
      "flex size-4 appearance-none items-center justify-center rounded transition",
      "border border-muted bg-input hover:border-subtle-foreground",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
      "data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-background data-[state=checked]:hover:border-accent-hover data-[state=checked]:hover:bg-accent-hover",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="group">
      <Minus className="size-3 stroke-3 not-group-data-[state=indeterminate]:hidden" />
      <Check className="size-3 stroke-3 not-group-data-[state=checked]:hidden" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
