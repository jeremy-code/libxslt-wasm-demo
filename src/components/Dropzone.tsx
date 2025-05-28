import {
  useRef,
  useState,
  type ComponentProps,
  type ComponentPropsWithoutRef,
} from "react";

import { useDropzone, type DropzoneOptions } from "react-dropzone";

import { cn } from "#utils/cn.ts";
import { formatBytes } from "#utils/formatBytes.ts";

type DropzoneProps = {
  dropzoneOptions?: DropzoneOptions;
  inputProps?: ComponentPropsWithoutRef<"input">;
} & ComponentProps<"input">;

const Dropzone = ({ dropzoneOptions, inputProps }: DropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    if (hiddenInputRef.current !== null) {
      hiddenInputRef.current.files = acceptedFiles.reduce(
        (dataTransfer, acceptedFile) => {
          dataTransfer.items.add(acceptedFile);
          return dataTransfer;
        },
        new DataTransfer(),
      ).files;
      setFiles(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, open } =
    useDropzone({
      noClick: true,
      noKeyboard: true,
      onDrop,
      ...dropzoneOptions,
    });

  return (
    <div
      className={cn(
        "grid min-h-20 max-w-full place-content-center rounded border border-dashed p-4 text-muted-foreground",
        { "border-blue-500 bg-blue-500/10": isDragAccept },
      )}
      {...getRootProps()}
    >
      <p>
        {isDragActive ?
          <span>Drop a file here</span>
        : <>
            {files.length > 0 ?
              <>
                <span className="font-semibold">{files.at(0)?.name}</span>
                {` (${formatBytes(files.at(0)?.size ?? 0, undefined, {
                  maximumFractionDigits: 2,
                })})`}
              </>
            : "Drag an image here"}
            {" or "}
            <button
              type="button"
              className="inline cursor-pointer appearance-none text-blue-500 select-text hover:underline"
              onClick={open}
            >
              upload a file
            </button>
          </>
        }
      </p>
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
  );
};

export { type DropzoneProps, Dropzone };
