import type { Nullable } from "#interfaces.ts";

/**
 *
 * @throws {Error} If the source is not a File or a string URL
 */
const fromSource = <T>(
  source: Nullable<FormDataEntryValue>,
  classDefinition: {
    from: (buffer: Uint8Array) => Promise<T>;
    fromUrl: (url: string) => Promise<T>;
  },
  ...[message, options]: ConstructorParameters<ErrorConstructor>
): Promise<T> => {
  if (source instanceof File) {
    return source.bytes().then((bytes) => classDefinition.from(bytes));
  } else if (typeof source === "string") {
    return classDefinition.fromUrl(source);
  }
  throw new Error(message ?? "Invalid source", options);
};

export { fromSource };
