import { XmlDocument, XsltStylesheet } from "libxslt-wasm";

import { isEmptyFile } from "./isEmptyFile.ts";

const getValidFormItem = (
  formData: FormData,
  name: string,
): FormDataEntryValue | null => {
  return (
    formData
      .getAll(name)
      .filter((item) => item !== "" && !isEmptyFile(item))
      .at(0) ?? null
  );
};

const fromSource = <T>(
  source: FormDataEntryValue | null,
  classDefinition: {
    from: (data: Uint8Array) => Promise<T>;
    fromUrl: (url: string) => Promise<T>;
  },
  errorMessage?: string,
): Promise<T> => {
  if (source instanceof File) {
    return source.bytes().then((bytes) => classDefinition.from(bytes));
  } else if (typeof source === "string") {
    return classDefinition.fromUrl(source);
  }
  throw new Error(errorMessage ?? "Invalid source");
};

const applyFormStylesheet = async (formData: FormData) => {
  const xmlDocumentSource = getValidFormItem(formData, "xmlDocument");
  const xsltStylesheetSource = getValidFormItem(formData, "xsltStylesheet");

  const xmlDocument = await fromSource(
    xmlDocumentSource,
    XmlDocument,
    "XML document is required",
  );

  const xsltStylesheet = await (formData.get("useEmbeddedStylesheet") === "on" ?
    XsltStylesheet.fromEmbeddedXmlDocument(xmlDocument)
  : fromSource(
      xsltStylesheetSource,
      XsltStylesheet,
      "XSLT stylesheet is required",
    ));

  if (xsltStylesheet === null) {
    throw new Error(
      "XML document did not contain processing instruction for XSLT stylesheet",
    );
  }

  const result = await xsltStylesheet.apply(xmlDocument);
  xsltStylesheet.delete();
  xmlDocument.delete();
  return result;
};

export { applyFormStylesheet };
