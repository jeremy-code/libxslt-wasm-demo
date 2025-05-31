import { type ComponentProps } from "react";

import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Select as SelectPrimitive, Slot } from "radix-ui";

import { cn } from "#utils/cn.ts";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) => (
  <SelectPrimitive.Trigger
    className={cn(
      "inline-flex h-9.5 items-center justify-center gap-1.5 rounded border border-subtle bg-white px-4 text-sm/none dark:bg-gray-800",
      "border-gray-300 shadow-xs dark:border-gray-700/50",
      "hover:border-subtle-foreground/70",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "data-[placeholder]:text-muted-foreground",
      className,
    )}
    {...props}
  >
    <Slot.Slottable>{children}</Slot.Slottable>
    <SelectPrimitive.Icon asChild>
      <span className="text-current/50" aria-hidden={true}>
        <ChevronDown className="size-4" />
      </span>
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

const SelectContent = ({
  className,
  children,
  position,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        "overflow-hidden rounded-md border bg-white dark:bg-gray-800",
        "border-gray-300 shadow-xs dark:border-gray-700/50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex h-6.5 cursor-default items-center justify-center">
        <ChevronUp className="size-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn("p-1.5", {
          "h-(--radix-select-trigger-height) max-h-(--radix-select-content-avaliable-height) w-(--radix-select-trigger-width) max-w-(--radix-select-content-avaliable-width) origin-(--radix-select-content-transform-origin)":
            position === "popper",
        })}
      >
        <Slot.Slottable>{children}</Slot.Slottable>
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex h-6.5 cursor-default items-center justify-center">
        <ChevronDown className="size-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

const SelectItem = ({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) => (
  <SelectPrimitive.Item
    className={cn(
      "relative flex h-6.5 items-center rounded-sm pr-9.5 pl-6.5 text-sm/none select-none",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "data-[highlighted]:bg-blue-500 data-[highlighted]:text-white data-[highlighted]:outline-none",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-6.5 items-center justify-center">
      <Check className="size-4" />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>
      <Slot.Slottable>{children}</Slot.Slottable>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

const SelectLabel = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    className={cn("px-6.5 text-xs/6 font-semibold text-foreground", className)}
    {...props}
  />
);

const SelectSeparator = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) => (
  <SelectPrimitive.Separator
    className={cn("m-1 h-px bg-muted", className)}
    {...props}
  />
);

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};
