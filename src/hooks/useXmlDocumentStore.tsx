import type { XmlDocument } from "libxslt-wasm";
import { create } from "zustand";

const useXmlDocumentStore = create<{
  xmlDocument: XmlDocument | null;
  setXmlDocument: (xmlDocument: XmlDocument | null) => void;
}>()((set) => ({
  xmlDocument: null,
  setXmlDocument: (xmlDocument) => {
    set((prev) => {
      if (prev.xmlDocument !== null) {
        prev.xmlDocument.delete();
      }
      return { ...prev, xmlDocument };
    });
  },
}));

export { useXmlDocumentStore };
