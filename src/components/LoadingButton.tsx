import { useFormStatus } from "react-dom";

import { LoaderCircle } from "lucide-react";
import { AccessibleIcon, Slot } from "radix-ui";

import { Button, type ButtonProps } from "./Button.tsx";

export type LoadingButtonProps = ButtonProps;

export const LoadingButton = ({ children, ...props }: LoadingButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button aria-busy={pending} disabled={pending} {...props}>
      {pending ?
        <>
          <AccessibleIcon.Root label="Loading">
            <LoaderCircle className="absolute animate-spin" />
          </AccessibleIcon.Root>
          <span className="invisible">
            <Slot.Slottable>{children}</Slot.Slottable>
          </span>
        </>
      : <Slot.Slottable>{children}</Slot.Slottable>}
    </Button>
  );
};
