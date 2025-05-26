import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";

import { cn } from "#utils/cn.ts";

const Skeleton = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  );
};

export { Skeleton };
