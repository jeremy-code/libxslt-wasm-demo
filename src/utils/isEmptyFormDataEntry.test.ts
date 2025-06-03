import { describe, expect, it } from "vitest";

import { isEmptyFormDataEntry } from "./isEmptyFormDataEntry.ts";

describe("isEmptyFormDataEntry", () => {
  it("should return true for empty string form data entry", () => {
    const formData = new FormData();
    formData.append("emptyString", "");
    const entry = formData.get("emptyString");
    expect(entry).not.toBeNull();
    expect(typeof entry).toBe("string");
    expect(isEmptyFormDataEntry(entry!)).toBe(true);
  });
  it("should return true for empty file form data entry", () => {
    const formData = new FormData();
    formData.append(
      "emptyFile",
      new Blob([], { type: "application/octet-stream" }),
      "",
    );
    const entry = formData.get("emptyFile");
    expect(entry).not.toBeNull();
    expect(entry).toBeInstanceOf(File);
    expect(isEmptyFormDataEntry(entry!)).toBe(true);
  });
  it("should return true for empty string", () => {
    expect(isEmptyFormDataEntry("")).toBe(true);
  });
  it("should return true for empty file", () => {
    expect(
      isEmptyFormDataEntry(
        new File([], "", { type: "application/octet-stream" }),
      ),
    ).toBe(true);
  });
});
