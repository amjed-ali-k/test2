import { CloudUpload, Image, X } from "lucide-react";
import { WithLoaderIcon } from "../components/loader-mask.js";
import { useDropzone } from "react-dropzone";
import { Button } from "../components/button.js";

export function DocUploadPrimitive({
    files,
    setFiles,
    loading = false,
    discription = "SVG, PNG, JPG or GIF (max. 800x400px)",
    onDelete,
    onUpload,
  }: {
    files: File[];
    loading?: boolean;
    setFiles: (e: File[]) => void;
    discription?: string;
    onDelete?: () => void;
    onUpload?: () => void;
  }) {
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      multiple: false,
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles);
      },
    });
  
    const file = files[0];
  
    return (
      <div>
        <div {...getRootProps({ className: "dropzone" })}>
          {!file && (
            <>
              <input {...getInputProps()} />
              <div className="rounded-lg border">
                <div className="flex flex-col items-center p-5 ">
                  <CloudUpload
                    className=" size-10 rounded-full bg-[#F2F4F7] p-2 "
                    color="#475467"
                  />
                  <p className=" pt-2">
                    <span className=" text-sm font-semibold text-[#1290E5] ">
                      Click to upload
                    </span>{" "}
                    <span className=" text-sm font-normal text-[#475467] ">
                      or drag and drop
                    </span>{" "}
                    <br />
                    <span className=" text-xs font-normal text-[#475467] ">
                      {discription}
                    </span>
                  </p>
                </div>
              </div>
            </>
          )}
          {file && (
            <div className="my-3 flex flex-col items-center rounded-lg border  p-5">
              <div className="flex flex-col items-center">
                <Image
                  className=" size-10 rounded-md bg-[#F2F4F7] p-2 "
                  color="#475467"
                />
                {onDelete && (
                  <div className="flex items-center text-sm">
                    <span>{file.name}</span>
                    <Button
                      disabled={loading}
                      variant="link"
                      size="xs"
                      onClick={onDelete}
                    >
                      <X className="size-4 text-red-500" />
                    </Button>
                  </div>
                )}
                <div className="flex w-full items-center space-x-2 pt-4">
                  <div>
                    {onUpload && (
                      <Button
                        variant="primary"
                        disabled={loading}
                        size="sm"
                        type="button"
                        onClick={onUpload}
                      >
                        Upload{" "}
                        <WithLoaderIcon isLoading={loading}>
                          <CloudUpload className="ml-2 size-4" />
                        </WithLoaderIcon>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }