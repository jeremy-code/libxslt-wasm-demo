import { useEffect, useState } from "react";

import { XmlDocumentViewer } from "#XmlDocumentViewer.tsx";
import {
  Checkbox,
  Dropzone,
  Input,
  type InputProps,
  Label,
  LoadingButton,
} from "#components/index.ts";
import { useXmlDocumentStore } from "#hooks/useXmlDocumentStore.tsx";
import { applyFormStylesheet } from "#utils/applyFormStylesheet.ts";
import { cn } from "#utils/cn.ts";

const UrlInputOrDropzone = ({ name, ...props }: InputProps) => (
  <>
    <Input name={name} {...props} />
    <div className="flex items-center gap-4 text-muted-foreground before:h-px before:grow before:bg-muted after:h-px after:grow after:bg-muted">
      OR
    </div>
    <Dropzone
      name={name}
      dropzoneOptions={{ maxFiles: 1 }}
      inputProps={{ name }}
    />
  </>
);

const Reader = () => {
  const [useEmbeddedStylesheet, setUseEmbeddedStylesheet] = useState(true);
  const isXmlDocumentNull = useXmlDocumentStore(
    (state) => state.xmlDocument === null,
  );
  const setXmlDocument = useXmlDocumentStore((state) => state.setXmlDocument);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Cleanup function to delete the XML document when the component unmounts
    return () => {
      useXmlDocumentStore.getState().xmlDocument?.delete();
      useXmlDocumentStore.setState((prev) => ({ ...prev, xmlDocument: null }));
    };
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <form
        action={async (formData: FormData) => {
          try {
            const document = await applyFormStylesheet(formData);
            setXmlDocument(document);
            setError(null);
          } catch (error) {
            if (error instanceof Error) {
              setXmlDocument(null);
              setError(error);
            }
          }
        }}
        className="flex flex-col gap-4"
      >
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
        <LoadingButton className="w-fit" type="submit">
          Apply Transformation
        </LoadingButton>
      </form>
      <div
        className={cn(
          "rounded-md bg-subtle wrap-break-word whitespace-pre-line text-foreground transition-colors",
          {
            "border border-red-400 bg-red-200 dark:border-red-500 dark:bg-red-900":
              !!error,
          },
        )}
      >
        {!isXmlDocumentNull ?
          <XmlDocumentViewer />
        : error !== null ?
          <p className="p-6 font-mono">
            {`An error occurred while transforming the XML document: ${error.message}`}
          </p>
        : <p className="p-6 font-mono italic">Output will be displayed here</p>}
      </div>
    </div>
  );
};

export { Reader };
