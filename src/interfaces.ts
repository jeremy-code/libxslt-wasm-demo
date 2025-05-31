type IterableElement<T> =
  T extends Iterable<infer U> ? U
  : T extends AsyncIterable<infer U> ? U
  : never;

export type { IterableElement };
