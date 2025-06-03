import { XmlDocument, XsltStylesheet } from "libxslt-wasm";

import { fromSource } from "./fromSource.ts";
import { isEmptyFormDataEntry } from "./isEmptyFormDataEntry.ts";

const applyFormStylesheet = async (formData: FormData) => {
  const xmlDocumentSource = formData
    .getAll("xmlDocument")
    .find((value) => !isEmptyFormDataEntry(value));
  const xsltStylesheetSource = formData
    .getAll("xsltStylesheet")
    .find((value) => !isEmptyFormDataEntry(value));

  const xmlDocumentPromise = fromSource(
    xmlDocumentSource,
    XmlDocument,
    "XML document is required",
  );

  const xsltStylesheetPromise =
    formData.get("useEmbeddedStylesheet") === "on" ?
      xmlDocumentPromise.then((xmlDocument) =>
        XsltStylesheet.fromEmbeddedXmlDocument(xmlDocument),
      )
    : fromSource(
        xsltStylesheetSource,
        XsltStylesheet,
        "XSLT stylesheet is required",
      );

  const [xmlDocument, xsltStylesheet] = await Promise.all([
    xmlDocumentPromise,
    xsltStylesheetPromise,
  ]);

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
