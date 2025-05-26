import { useActionState } from "react";

import { XmlDocument, XsltStylesheet } from "libxslt-wasm";

import { Button } from "#components/Button.tsx";
import { Input } from "#components/Input.tsx";
import { Label } from "#components/Label.tsx";
import { cn } from "#utils/cn.ts";

type TransformStylesheetFormState = null | { data: string } | { error: Error };

const transformStylesheet = async (
  _: TransformStylesheetFormState,
  formData: FormData,
) => {
  try {
    const xmlDocumentSource = formData.get("xmlDocument");
    const xsltStylesheetSource = formData.get("xsltStylesheet");

    if (
      xmlDocumentSource === null ||
      xsltStylesheetSource === null ||
      xmlDocumentSource === "" ||
      xsltStylesheetSource === ""
    ) {
      throw new Error("Both XML document and XSLT stylesheet are required.");
    }

    const xmlDocument =
      xmlDocumentSource instanceof File ?
        await XmlDocument.from(await xmlDocumentSource.bytes())
      : await XmlDocument.fromUrl(xmlDocumentSource);

    if (xmlDocument === null) {
      throw new Error("Invalid XML document");
    }

    const xsltStylesheet =
      xsltStylesheetSource instanceof File ?
        await XsltStylesheet.from(await xsltStylesheetSource.bytes())
      : await XsltStylesheet.fromUrl(xsltStylesheetSource);

    if (xsltStylesheet === null) {
      throw new Error("Invalid XSLT stylesheet");
    }

    const result = await xsltStylesheet.apply(xmlDocument);

    const xmlDocumentOutput = result.toString();

    result.delete();
    xsltStylesheet.delete();
    xmlDocument.delete();

    return { data: xmlDocumentOutput, error: undefined };
  } catch (error) {
    if (error instanceof Error) {
      return { error };
    }
  }
  return null;
};

const Reader = () => {
  const [state, formAction] = useActionState(transformStylesheet, null);

  return (
    <div className="flex w-full flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4">
        <Label>XML Document</Label>
        <Input name="xmlDocument" />
        <Label>XSLT Stylesheet</Label>
        <Input name="xsltStylesheet" />
        <Button className="w-fit" type="submit">
          Transform Stylesheet
        </Button>
      </form>
      <div
        className={cn(
          "rounded-md bg-muted p-4 font-mono wrap-break-word whitespace-pre-line text-muted-foreground transition-colors",
          {
            "border border-red-400 bg-red-200 text-gray-950 dark:border-red-500 dark:bg-red-900 dark:text-white":
              !!state?.error,
          },
        )}
      >
        {state === null ?
          <p className="italic">Output will be displayed here</p>
        : state.error ?
          state.error.message
        : state.data}
      </div>
    </div>
  );
};

export { Reader };
