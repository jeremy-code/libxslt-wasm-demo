import type { ComponentPropsWithRef } from "react";

import { cn } from "../utils/cn";

export type InputProps = ComponentPropsWithRef<"input">;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-gray-400 bg-transparent px-3 py-1 text-sm shadow-sm transition-opacity dark:border-gray-700 dark:bg-gray-900",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-gray-300",
        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50",
        "invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
};
