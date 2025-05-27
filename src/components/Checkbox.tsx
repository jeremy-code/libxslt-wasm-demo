import type { ComponentPropsWithRef } from "react";

import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "../utils/cn";

export const Checkbox = ({
  className,
  ...props
}: Omit<ComponentPropsWithRef<typeof CheckboxPrimitive.Root>, "children">) => (
  <CheckboxPrimitive.Root
    className={cn(
      "flex size-4 appearance-none items-center justify-center rounded",
      "border border-gray-400 bg-transparent hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="group">
      <Minus className="size-3 not-group-data-[state=indeterminate]:hidden" />
      <Check className="size-3 not-group-data-[state=checked]:hidden" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
