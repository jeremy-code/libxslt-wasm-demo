import { useState } from "react";

import type { XmlDocument } from "libxslt-wasm";
import { FileOutput } from "lucide-react";
import { AccessibleIcon } from "radix-ui";

import { CodeBlock, CodeBlockItem } from "#components/CodeBlock.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/Select.tsx";
import { Separator } from "#components/Separator.tsx";
import { ToggleGroup, ToggleGroupItem } from "#components/ToggleGroup.tsx";
import type { IterableElement } from "#interfaces.ts";

const xmlDocumentFormats = [
  { value: "xmlString", label: "XML String" },
  { value: "htmlString", label: "HTML String" },
  { value: "html", label: "HTML" },
] as const;
type XmlDocumentFormat = IterableElement<typeof xmlDocumentFormats>["value"];

const isXmlDocumentFormat = (value: string): value is XmlDocumentFormat =>
  xmlDocumentFormats.map<string>((format) => format.value).includes(value);

type XmlDocumentViewerProps = { xmlDocument: XmlDocument };

const XmlDocumentViewer = ({ xmlDocument }: XmlDocumentViewerProps) => {
  const [format, setFormat] = useState<XmlDocumentFormat>("xmlString");

  const onFormatChange = (value: string) => {
    // Guarantees value is not empty
    if (isXmlDocumentFormat(value)) {
      setFormat(value);
    }
  };

  return (
    <>
      <div className="flex justify-between p-6">
        <div className="flex items-center gap-2">
          <AccessibleIcon.Root label="File output icon">
            <FileOutput size="18" />
          </AccessibleIcon.Root>
          <h1 className="font-semibold text-foreground">Result</h1>
        </div>

        {/* Mobile */}
        <Select value={format} onValueChange={onFormatChange}>
          <SelectTrigger className="sm:hidden">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="sm:hidden">
            {xmlDocumentFormats.map((format) => (
              <SelectItem key={format.value} value={format.value}>
                {format.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Desktop */}
        <ToggleGroup
          className="not-sm:hidden"
          type="single"
          value={format}
          onValueChange={onFormatChange}
        >
          {xmlDocumentFormats.map((format) => (
            <ToggleGroupItem key={format.value} value={format.value}>
              {format.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <Separator />
      <CodeBlock
        // 5.25rem = height of header + py-4 to match container margin
        className="max-h-[calc(100dvh-7.25rem)] overflow-y-auto p-6"
      >
        {format === "xmlString" ?
          <CodeBlockItem value={xmlDocument.toString()} scope="text.xml" />
        : format === "htmlString" ?
          <CodeBlockItem value={xmlDocument.toHtmlString()} scope="text.xml" />
        : format === "html" ?
          <iframe
            className="h-200 w-full rounded-md border border-subtle bg-white"
            height="800" // 50rem = 800px, calc(var(--spacing) * 200)
            sandbox="allow-scripts"
            srcDoc={xmlDocument.toHtmlString()}
            title="XML Document Viewer"
          />
        : null}
      </CodeBlock>
    </>
  );
};

export { XmlDocumentViewer };
