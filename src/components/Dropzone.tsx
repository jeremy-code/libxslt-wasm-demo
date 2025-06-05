import {
  useRef,
  useState,
  type ComponentProps,
  type ComponentPropsWithoutRef,
} from "react";

import { FileUp, FileIcon, X } from "lucide-react";
import { AccessibleIcon } from "radix-ui";
import { useDropzone, type DropzoneOptions } from "react-dropzone";

import { Button } from "./Button.tsx";
import { Link } from "./Link.tsx";

import { useToastStore } from "#hooks/useToast.tsx";
import { cn } from "#utils/cn.ts";
import { createDataTransferFromFiles } from "#utils/createDataTransferFromFiles.ts";
import { formatBytes } from "#utils/formatBytes.ts";

type DropzoneProps = {
  dropzoneOptions?: DropzoneOptions;
  inputProps?: ComponentPropsWithoutRef<"input">;
} & ComponentProps<"input">;

const Dropzone = ({ dropzoneOptions, inputProps }: DropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const toasts = useToastStore((state) => state.addToast);

  const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles, fileRejections) => {
    if (hiddenInputRef.current !== null) {
      hiddenInputRef.current.files =
        createDataTransferFromFiles(acceptedFiles).files;
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }
    if (fileRejections.length > 0) {
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((error) => {
          toasts({
            id: `dropzone-error-${file.name}-${Date.now()}`,
            title: "File upload error",
            description: `${file.name}: ${error.message}`,
            variant: "destructive",
          });
        });
      });
    }
  };

  const validator: DropzoneOptions["validator"] = () => {
    if (dropzoneOptions?.maxFiles && files.length >= dropzoneOptions.maxFiles) {
      return { message: "Too many files", code: "too-many-files" };
    }
    return null;
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    open,
    fileRejections,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop,
    validator,
    ...dropzoneOptions,
  });

  return (
    <div
      {...getRootProps({
        className: cn(
          "flex flex-col gap-6 rounded border border-dashed p-6 text-muted-foreground",
          { "border-red-500 bg-red-500/10": fileRejections.length > 0 },
          { "border-blue-500 bg-blue-500/10": isDragAccept },
        ),
      })}
    >
      <div className="flex justify-center gap-2">
        <AccessibleIcon.Root label="Upload file">
          <FileUp className="text-muted-foreground" />
        </AccessibleIcon.Root>

        <div>
          {isDragActive ?
            <span>Drop a file here</span>
          : <>
              {"Drag a file here or "}
              <Link asChild>
                <button
                  type="button"
                  className="inline cursor-pointer appearance-none text-blue-500 select-text"
                  onClick={open}
                >
                  upload a file
                </button>
              </Link>
            </>
          }
        </div>
        <input
          className="sr-only"
          type="file"
          readOnly
          tabIndex={-1}
          ref={hiddenInputRef}
          {...inputProps}
        />
        <input {...getInputProps()} />
      </div>
      {files.length !== 0 && (
        <div className="flex flex-col gap-2">
          {files.map((file, index) => (
            <div
              key={file.name}
              className="flex justify-between gap-3 rounded bg-subtle p-3"
            >
              <div className="grid aspect-square place-content-center rounded bg-gray-100 dark:bg-gray-800">
                <FileIcon className="size-[1em] text-muted-foreground" />
              </div>
              <div className="grow">
                <p className="line-clamp-1 text-sm font-semibold text-muted-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-subtle-foreground">
                  {formatBytes(file.size, undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="grid aspect-square place-content-center">
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-7 text-muted-foreground shadow-none"
                  onClick={() => {
                    setFiles((prevFiles) => {
                      const newFiles = [...prevFiles];
                      newFiles.splice(index, 1);
                      if (hiddenInputRef.current !== null) {
                        hiddenInputRef.current.files =
                          createDataTransferFromFiles(newFiles).files;
                      }
                      return newFiles;
                    });
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { type DropzoneProps, Dropzone };
