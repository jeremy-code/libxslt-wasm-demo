import { ExternalLink } from "lucide-react";
import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";

import { cn } from "../utils/cn";

export type LinkProps = {
  /**
   * Opens link in new tab and adds an {@link ExternalLink} icon
   */
  isExternal?: boolean;
} & PrimitivePropsWithRef<"a">;

export const Link = ({
  asChild,
  className,
  isExternal,
  children,
  ...props
}: LinkProps) => {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      className={cn(
        "transition-colors transition-discrete",
        "decoration-current/75 decoration-from-font underline-offset-1 hover:underline",
        className,
      )}
      // target="_blank" implies rel="noopener": https://caniuse.com/mdn-html_elements_a_implicit_noopener
      {...(isExternal && { target: "_blank" })}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {isExternal && (
        <ExternalLink className="inline-block size-[2ex] pl-0.5 align-sub" />
      )}
    </Comp>
  );
};
