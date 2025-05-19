import { useEden } from "@/lib/api";
import { AvatarUploadPrimitive } from "@repo/ui/custom/avatar-upload";
import { DocUploadPrimitive } from "@repo/ui/custom/file-upload";
import { useState, useCallback } from "react";
import { toast } from "sonner";

export function DocumentUpload({
  afterUpload,
  discription = "SVG, PNG, JPG or GIF (max. 800x400px)",
  validationFn,
}: {
  afterUpload?: (e: {
    url: string;
    size: number;
    name: string;
  }) => Promise<void>;
  discription?: string;
  validationFn?: (file: File) => string | boolean;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const api = useEden();
  const error = (e: string) => {
    toast(e);
    setLoading(false);
  };

  const file = files[0];

  const handleDelete = useCallback(() => {
    setFiles([]); // Clear the files array
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const handleUpload = useCallback(async () => {
    setLoading(true);

    if (!file) return error("Please select a file");
    if (file.size > 800000) return error("File size exceeds 800kb");
    if (!file.type.startsWith("image/")) return error("Please select an image");

    const validation = validationFn ? validationFn(file) : true;
    if (validation !== true) return error(validation as string);

    const { data } = await api.user.onboarding.upload.post({
      document: file,
      name: file.name,
    });
    if (data?.success === false) {
      return error("Failed to upload file");
    }
    await afterUpload?.({
      url: data?.url || "",
      size: file.size,
      name: file.name,
    });
    handleDelete();
    setLoading(false);
  }, [file]);

  return (
    <DocUploadPrimitive
      files={files}
      setFiles={setFiles}
      loading={loading}
      discription={discription}
      onDelete={handleDelete}
      onUpload={handleUpload}
    />
  );
}

export const AvatarUpload = ({
  image,
  onSubmit: onSubmitFn,
  fallBack,
}: {
  image: string | undefined | null;
  fallBack?: string;
  onSubmit: (e: { url: string; size: number; name: string }) => Promise<void>;
}) => {
  return (
    <AvatarUploadPrimitive
      image={image}
      onSubmit={onSubmitFn}
      fallBack={fallBack}
    >
      {({ onSubmit }) => <DocumentUpload afterUpload={onSubmit} />}
    </AvatarUploadPrimitive>
  );
};
