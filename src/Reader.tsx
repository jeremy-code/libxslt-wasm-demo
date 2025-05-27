import { useActionState, useState } from "react";

import { XmlDocument, XsltStylesheet } from "libxslt-wasm";

import { Button, Checkbox, Dropzone, Input, Label } from "#components/index.ts";
import { cn, isEmptyFile, throwError } from "#utils/index.ts";

type TransformStylesheetFormState = { data?: string; error?: Error } | null;

const transformStylesheet = async (
  _: TransformStylesheetFormState,
  formData: FormData,
): Promise<TransformStylesheetFormState> => {
  try {
    const [xmlDocumentSource, xsltStylesheetSource] = [
      "xmlDocument",
      "xsltStylesheet",
    ].map((name) =>
      formData
        .getAll(name)
        .filter((item) => item !== "" && !isEmptyFile(item))
        .at(0),
    );
    const useEmbeddedStylesheet = formData.get("useEmbeddedStylesheet");

    const xmlDocument =
      xmlDocumentSource instanceof File ?
        await XmlDocument.from(await xmlDocumentSource.bytes())
      : typeof xmlDocumentSource === "string" ?
        await XmlDocument.fromUrl(xmlDocumentSource)
      : throwError("XML document is required");
    if (xmlDocument === null) {
      throw new Error("Invalid XML document");
    }
    const xsltStylesheet =
      useEmbeddedStylesheet === "on" ?
        await XsltStylesheet.fromEmbeddedXmlDocument(xmlDocument)
      : xsltStylesheetSource instanceof File ?
        await XsltStylesheet.from(await xsltStylesheetSource.bytes())
      : typeof xsltStylesheetSource === "string" ?
        await XsltStylesheet.fromUrl(xsltStylesheetSource)
      : throwError("XSLT stylesheet is required");
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
  const [useEmbeddedStylesheet, setUseEmbeddedStylesheet] = useState(true);

  return (
    <div className="flex w-full flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4">
        <Label>XML Document</Label>
        <Input
          name="xmlDocument"
          placeholder="https://example.com/document.xml"
        />
        <div className="flex items-center gap-4">
          <div className="h-px grow bg-muted" />
          <span className="text-muted-foreground">OR</span>
          <div className="h-px grow bg-muted" />
        </div>
        <Dropzone
          name="xmlDocument"
          dropzoneOptions={{ maxFiles: 1 }}
          inputProps={{ name: "xmlDocument" }}
        />
        <Label>XSLT Stylesheet</Label>
        <div className="flex items-center gap-2">
          <Checkbox
            name="useEmbeddedStylesheet"
            checked={useEmbeddedStylesheet}
            onCheckedChange={(checked) => setUseEmbeddedStylesheet(!!checked)}
          />
          <Label>Use embedded stylesheet</Label>
        </div>
        {!useEmbeddedStylesheet && (
          <>
            <Input
              name="xsltStylesheet"
              placeholder="https://example.com/stylesheet.xsl"
            />
            <div className="flex items-center gap-4">
              <div className="h-px grow bg-muted" />
              <span className="text-muted-foreground">OR</span>
              <div className="h-px grow bg-muted" />
            </div>
            <Dropzone
              name="xsltStylesheet"
              dropzoneOptions={{ maxFiles: 1 }}
              inputProps={{ name: "xsltStylesheet" }}
            />
          </>
        )}
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
          `An error occurred while transforming the XML document: ${state.error.message}`
        : state.data}
      </div>
    </div>
  );
};

export { Reader };
