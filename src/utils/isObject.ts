const isObject = (value: unknown) =>
  typeof value === "object" && value !== null;

export { isObject };
