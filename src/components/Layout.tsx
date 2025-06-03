import { Link } from "./Link.tsx";
import { Separator } from "./Separator.tsx";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="border-b">
        <div className="container flex items-center justify-center py-4">
          <Link
            className="flex items-center gap-2 font-semibold hover:no-underline"
            href="/"
          >
            <svg className="size-[1em]">
              {/* https://caniuse.com/mdn-svg_elements_use_omit_external_fragment */}
              <use href="/favicon.svg#favicon" />
            </svg>
            libxslt-wasm-demo
          </Link>
        </div>
      </header>
      {children}
      <footer className="mt-4 grid place-content-center border-t">
        <div className="container flex gap-4 py-4">
          <p>
            {"Made with ❤️ by "}
            <Link
              className="font-bold text-blue-500"
              href="https://github.com/jeremy-code"
            >
              Jeremy
            </Link>
          </p>
          <Separator orientation="vertical" />
          <Link
            className="text-blue-500"
            href="https://github.com/jeremy-code/libxslt-wasm-demo"
            isExternal
          >
            Source code
          </Link>
        </div>
      </footer>
    </>
  );
};

export { Layout };
