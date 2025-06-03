import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow]",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: "bg-accent text-background shadow hover:bg-accent-hover",
        secondary: "bg-subtle text-foreground shadow hover:bg-muted",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = PrimitivePropsWithRef<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      className={twMerge(buttonVariants({ className, variant, size }))}
      {...props}
    />
  );
};
