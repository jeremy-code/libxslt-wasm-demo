import type { FallbackProps } from "react-error-boundary";

import { Button } from "#components/Button.tsx";
import { Layout } from "#components/Layout.tsx";
import { Link } from "#components/Link.tsx";
import { isObject } from "#utils/isObject.ts";

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <title>Error | libxslt-wasm-demo</title>
      <Layout>
        <main className="container grid place-content-center">
          {error instanceof Error ?
            error.name
          : isObject(error) ?
            error.constructor.name
          : `Unknown (${typeof error})`}
          <h1 className="text-2xl/relaxed font-bold">An error occurred</h1>
          <pre className="mt-2 rounded-lg bg-subtle p-5">
            <code>
              {error instanceof Error ?
                error.message
              : "An unknown error occurred"}
            </code>
          </pre>
          <div className="mt-4 space-x-2">
            <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            <Button variant="secondary" asChild>
              <Link href="/" className="hover:no-underline">
                Home
              </Link>
            </Button>
          </div>
        </main>
      </Layout>
    </>
  );
};

export { Fallback };
