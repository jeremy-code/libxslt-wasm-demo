import { useActionState, useEffect, useState } from "react";

import { XmlDocument, XsltStylesheet } from "libxslt-wasm";

import { XmlDocumentViewer } from "#XmlDocumentViewer.tsx";
import {
  Button,
  Checkbox,
  Dropzone,
  Input,
  type InputProps,
  Label,
} from "#components/index.ts";
import { cn, isEmptyFile, throwError } from "#utils/index.ts";

const UrlInputOrDropzone = ({ name, ...props }: InputProps) => (
  <>
    <Input name={name} {...props} />
    <div className="flex items-center gap-4">
      <div className="h-px grow bg-muted" />
      <span className="text-muted-foreground">OR</span>
      <div className="h-px grow bg-muted" />
    </div>
    <Dropzone
      name={name}
      dropzoneOptions={{ maxFiles: 1 }}
      inputProps={{ name }}
    />
  </>
);

type TransformStylesheetFormState = {
  data?: XmlDocument;
  error?: Error;
} | null;

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
    xsltStylesheet.delete();
    xmlDocument.delete();
    return { data: result, error: undefined };
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

  useEffect(() => {
    return () => {
      if (state?.data) {
        state.data.delete();
      }
    };
  }, [state?.data]);

  return (
    <div className="flex w-full flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4">
        <Label>XML Document</Label>
        <UrlInputOrDropzone
          name="xmlDocument"
          placeholder="https://example.com/document.xml"
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
          <UrlInputOrDropzone
            name="xsltStylesheet"
            placeholder="https://example.com/stylesheet.xsl"
          />
        )}
        <Button className="w-fit" type="submit">
          Apply Transformation
        </Button>
      </form>
      <div
        className={cn(
          "rounded-md bg-muted wrap-break-word whitespace-pre-line text-muted-foreground transition-colors",
          {
            "border border-red-400 bg-red-200 text-gray-950 dark:border-red-500 dark:bg-red-900 dark:text-white":
              !!state?.error,
          },
        )}
      >
        {state?.data instanceof XmlDocument ?
          <XmlDocumentViewer xmlDocument={state.data} />
        : state?.error !== undefined ?
          <p className="p-6 font-mono">
            {`An error occurred while transforming the XML document: ${state.error.message}`}
          </p>
        : state === null ?
          <p className="p-6 font-mono italic">Output will be displayed here</p>
        : null}
      </div>
    </div>
  );
};

export { Reader };
