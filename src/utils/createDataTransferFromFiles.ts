/**
 * Creates a DataTransfer object from an array of File objects
 */
const createDataTransferFromFiles = (files: File[]): DataTransfer => {
  return files.reduce((dataTransfer, file) => {
    dataTransfer.items.add(file);
    return dataTransfer;
  }, new DataTransfer());
};

export { createDataTransferFromFiles };
