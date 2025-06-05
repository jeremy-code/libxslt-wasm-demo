import { memo, Suspense } from "react";
import { jsxDEV } from "react/jsx-dev-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import { toJsxRuntime, type Options } from "hast-util-to-jsx-runtime";
import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";

import { useStarryNight, type Scope } from "#hooks/useStarryNight.tsx";

const toJsxRuntimeOptions = { Fragment, jsx, jsxDEV, jsxs } satisfies Options;

type CodeBlockItemProps = { value: string; scope: Scope };

const CodeBlockItemHelper = memo(function CodeBlockItemHelper({
  value,
  scope,
}: CodeBlockItemProps) {
  const starryNight = useStarryNight();

  return toJsxRuntime(starryNight.highlight(value, scope), toJsxRuntimeOptions);
});

const CodeBlockItem = ({ value, scope }: CodeBlockItemProps) => {
  return (
    // Suspend with the syntax value to prevent layout shift
    <Suspense fallback={value}>
      <CodeBlockItemHelper value={value} scope={scope} />
    </Suspense>
  );
};

type CodeBlockProps = PrimitivePropsWithRef<"div">;

const CodeBlock = ({ asChild, children, ...props }: CodeBlockProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp {...props}>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
};

export { CodeBlockItem, type CodeBlockProps, CodeBlock };
