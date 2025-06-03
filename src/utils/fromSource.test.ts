import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import { fromSource } from "./fromSource.ts";

describe("fromSource", () => {
  const mockResult = { foo: "bar" };

  let mockClassDefinition: {
    from: Mock<() => Promise<typeof mockResult>>;
    fromUrl: Mock<() => Promise<typeof mockResult>>;
  };

  beforeEach(() => {
    mockClassDefinition = {
      from: vi.fn().mockResolvedValue(mockResult),
      fromUrl: vi.fn().mockResolvedValue(mockResult),
    };
  });

  it("calls classDefinition.from with bytes when source is a File", async () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const file = new File([bytes], "test.txt");
    const spy = vi.spyOn(file, "bytes");
    const result = await fromSource(file, mockClassDefinition);

    expect(mockClassDefinition.from).toHaveBeenCalledWith(bytes);
    expect(spy).toHaveBeenCalled();
    expect(result).toBe(mockResult);
  });

  it("calls classDefinition.fromUrl when source is a string", async () => {
    const url = "http://example.com/file";
    const result = await fromSource(url, mockClassDefinition);
    expect(mockClassDefinition.fromUrl).toHaveBeenCalledWith(url);
    expect(result).toBe(mockResult);
  });

  it("throws error with default message when source is undefined", () => {
    expect(() => fromSource(undefined, mockClassDefinition)).toThrow(
      "Invalid source",
    );
  });

  it("throws error with custom message when source is undefined", () => {
    const customErrorMessage = "Custom error message";

    expect(() =>
      fromSource(undefined, mockClassDefinition, customErrorMessage),
    ).toThrow(customErrorMessage);
  });
});
