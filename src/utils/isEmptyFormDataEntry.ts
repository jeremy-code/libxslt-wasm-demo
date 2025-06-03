const isEmptyFormDataEntry = (formDataEntry: FormDataEntryValue) =>
  formDataEntry instanceof File ?
    formDataEntry.size === 0 &&
    formDataEntry.type === "application/octet-stream" &&
    formDataEntry.name === ""
  : typeof formDataEntry === "string" && formDataEntry.trim() === "";

export { isEmptyFormDataEntry };
