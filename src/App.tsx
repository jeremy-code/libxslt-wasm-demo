import { lazy, Suspense } from "react";

import { Callout, CalloutText } from "#components/Callout.tsx";
import { Link } from "#components/Link.tsx";
import { Skeleton } from "#components/Skeleton.tsx";

// Deferring the import of the Reader component, so `libxslt-wasm` does not
// throw error when JSPI is not enabled in the browser
const LazyReader = lazy(() =>
  import("./Reader").then((mod) => ({ default: mod.Reader })),
);

const App = () => {
  const isJspiEnabled =
    typeof WebAssembly === "object" && "Suspending" in WebAssembly;

  return (
    <>
      <title>libxslt-wasm-demo</title>
      <header className="border-b">
        <div className="container flex items-center justify-center py-4">
          <Link className="font-semibold hover:no-underline" href="/">
            libxslt-wasm-demo
          </Link>
        </div>
      </header>
      <main className="container flex max-w-4xl flex-col items-center gap-4 py-4">
        {!isJspiEnabled && (
          <Callout variant="destructive">
            <CalloutText>
              {
                "JS Promise Integration (JSPI) is not enabled in this browser. See "
              }
              <Link
                className="text-blue-500"
                href="https://webassembly.org/features/"
                isExternal
              >
                webassembly.org/features
              </Link>
              {" for more information on browser compatibility."}
            </CalloutText>
          </Callout>
        )}
        <p className="my-4">
          {"This is a demo of "}
          <Link
            className="text-blue-500"
            href="https://npmjs.com/package/libxslt-wasm"
            isExternal
          >
            libxslt-wasm
          </Link>
          {` (v. ${__LIBXSLT_WASM_VERSION__}), a WebAssembly port of the `}
          <Link
            className="text-blue-500"
            href="https://gitlab.gnome.org/GNOME/libxslt"
            isExternal
          >
            libxslt
          </Link>
          {` library. Note that many URLs may not work as intended due to CORS
          errors, as most XML documents either expect API requests to come from
          either a server or the same origin. You can try `}
          <Link
            className="text-blue-500"
            href="https://google.github.io/styleguide/vimscriptguide.xml"
            isExternal
          >
            https://google.github.io/styleguide/vimscriptguide.xml
          </Link>
          {" to see the demo in action."}
        </p>
        {isJspiEnabled ?
          <Suspense fallback={<Skeleton className="h-[25.75rem] w-full" />}>
            <LazyReader />
          </Suspense>
        : <div className="grid min-h-28 place-content-center rounded bg-muted p-4">
            <p className="italic">
              The demo is disabled since JSPI is not enabled.
            </p>
          </div>
        }
      </main>
      <footer className="mt-4 grid place-content-center border-t">
        <div className="container py-4">
          <p>
            {"Made with ❤️ by "}
            <Link
              className="font-bold text-blue-500"
              href="https://github.com/jeremy-code"
            >
              Jeremy
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export { App };
