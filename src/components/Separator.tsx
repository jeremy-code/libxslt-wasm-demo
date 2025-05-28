import type { ComponentPropsWithRef } from "react";

import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "#utils/cn.ts";

const Separator = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    className={cn(
      "bg-muted data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className,
    )}
    {...props}
  />
);

export { Separator };
