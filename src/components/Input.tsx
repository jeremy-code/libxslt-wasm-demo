import type { ComponentPropsWithRef } from "react";

import { cn } from "#utils/cn.ts";

export type InputProps = ComponentPropsWithRef<"input">;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-muted bg-input px-3 py-1 text-sm shadow-sm transition-opacity hover:border-subtle-foreground",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-subtle-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "invalid:border-red-500",
        className,
      )}
      {...props}
    />
  );
};
