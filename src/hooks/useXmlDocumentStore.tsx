import type { XmlDocument } from "libxslt-wasm";
import { create } from "zustand";

import type { Nullable } from "#interfaces.ts";

export type XmlDocumentStore = {
  xmlDocument: Nullable<XmlDocument>;
  setXmlDocument: (xmlDocument: Nullable<XmlDocument>) => void;
};

const useXmlDocumentStore = create<XmlDocumentStore>()((set) => ({
  xmlDocument: null,
  setXmlDocument: (xmlDocument) => set(() => ({ xmlDocument })),
}));

export { useXmlDocumentStore };
