import { cva, type VariantProps } from "class-variance-authority";
import { TriangleAlert } from "lucide-react";
import { AccessibleIcon, Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { twMerge } from "tailwind-merge";

const calloutVariants = cva(
  "mx-auto flex items-center gap-4 rounded p-4 shadow",
  {
    variants: {
      variant: {
        destructive:
          "bg-red-100 text-red-400 dark:bg-red-950 dark:text-red-300",
      },
    },
  },
);

export type CalloutProps = PrimitivePropsWithRef<"div"> &
  VariantProps<typeof calloutVariants>;

const Callout = ({
  asChild,
  children,
  className,
  variant,
  ...props
}: CalloutProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={twMerge(calloutVariants({ className, variant }))}
      {...props}
    >
      <div className="w-8">
        <AccessibleIcon.Root label="Warning">
          <TriangleAlert className="text-current" />
        </AccessibleIcon.Root>
      </div>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
};

const CalloutText = ({
  asChild,
  className,
  children,
  ...props
}: PrimitivePropsWithRef<"p">) => {
  const Comp = asChild ? Slot.Root : "p";

  return (
    <Comp
      className={twMerge("m-0 text-sm leading-6 font-normal", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { Callout, CalloutText };
