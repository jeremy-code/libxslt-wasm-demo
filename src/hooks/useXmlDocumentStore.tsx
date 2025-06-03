import type { XmlDocument } from "libxslt-wasm";
import { create } from "zustand";

import type { Nullable } from "#interfaces.ts";

const useXmlDocumentStore = create<{
  xmlDocument: Nullable<XmlDocument>;
  setXmlDocument: (xmlDocument: Nullable<XmlDocument>) => void;
}>()((set) => ({
  xmlDocument: null,
  setXmlDocument: (xmlDocument) => set((prev) => ({ ...prev, xmlDocument })),
}));

export { useXmlDocumentStore };
