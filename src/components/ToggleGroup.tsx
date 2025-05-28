"use client";

import * as React from "react";
import { type ComponentPropsWithRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { twMerge } from "tailwind-merge";

import { cn } from "#utils/cn.ts";

const toggleVariants = cva(
  [
    "grid place-content-center rounded-md text-sm font-medium transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-subtle text-muted-foreground hover:bg-muted hover:text-foreground",
          "data-[state=on]:bg-muted data-[state=on]:text-foreground data-[state=on]:hover:bg-subtle-foreground/50",
          "data-[disabled]:bg-transparent data-[disabled]:text-muted-foreground data-[disabled]:hover:bg-transparent",
        ],
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

const ToggleGroup = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToggleGroupPrimitive.Root>) => (
  <ToggleGroupPrimitive.Root
    className={cn(
      "flex items-center justify-center gap-2 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
      className,
    )}
    {...props}
  />
);

const ToggleGroupItem = ({
  className,
  variant,
  size,
  ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) => {
  return (
    <ToggleGroupPrimitive.Item
      className={twMerge(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export { ToggleGroup, ToggleGroupItem };
