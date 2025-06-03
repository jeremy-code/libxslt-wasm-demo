type IterableElement<T> =
  T extends Iterable<infer U> ? U
  : T extends AsyncIterable<infer U> ? U
  : never;

type Nullable<T> = T | null | undefined;

export type { IterableElement, Nullable };
