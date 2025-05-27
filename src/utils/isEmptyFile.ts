const isEmptyFile = (file: unknown): file is File =>
  file instanceof File &&
  file.size === 0 &&
  file.type === "application/octet-stream" &&
  file.name === "";

export { isEmptyFile };
