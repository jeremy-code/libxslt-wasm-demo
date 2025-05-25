import { Link } from "#components/Link.tsx";

const App = () => {
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
      <main className="container my-4">
        <p className="my-4 mx-auto">
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
          {` library.`}
        </p>
      </main>
      <footer className="grid place-content-center border-t">
        <div className="container py-4">
          <p>
            {"Made with ❤️ by "}
            <Link
              className="text-blue-500 font-bold"
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
