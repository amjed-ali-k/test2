import { useDetailedUser } from "@/hooks/use-user";
import { useEden } from "@/lib/api";
import { allDocs, type DocumentInputType } from "@/types/doc";
import type { OnboardingMeta } from "@/types/general";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@repo/ui/components/alert-dialog";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { formatBytes } from "@repo/ui/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BadgeInfo,  EyeIcon, TrashIcon } from "lucide-react";
import { sift, listify } from "radash";
import { useState } from "react";
import { toast } from "sonner";
import { DocumentUpload } from "./doc-upload";

export function DocsEdit() {
  const userData = useDetailedUser();
  const eden = useEden();

  const { data } = useQuery({
    queryKey: ["onboarding"],
    queryFn: () => eden.user.onboarding.status.get().then((k) => k.data),
  });

  const metaVal = data?.value as OnboardingMeta;
  const requiredDocs = sift(
    listify(metaVal, (key, value) => {
      if (typeof value === "object" && !!value.required) {
        const doc = allDocs.find((d) => d.name === key);
        if (doc)
          return {
            name: key,
            doc,
            ...value,
          };
      }
    })
  );

  return (
    <section>
      <div className="flex items-center justify-between border-b py-5 ">
        <div>
          <h3>Documents</h3>
          <p>Update necessary certificates.</p>
        </div>
      </div>
      {requiredDocs?.map((document) => (
        <DocContent
          key={document.name}
          document={document.doc}
          userDocs={
            userData?.documents?.filter(
              (d) => d.fileType === document.doc.type
            ) || []
          }
        />
      ))}
    </section>
  );
}

type FormDataType = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
};

function DocContent({
  document,
  userDocs,
}: {
  document: DocumentInputType;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  userDocs: any[];
}) {
  const api = useEden();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleDelete = async (id: number) => {
    await api.user
      .document({
        id,
      })
      .delete();
    queryClient.invalidateQueries({
      queryKey: ["detailedUser"],
    });
    toast("Document Deleted", {
      description: "Document Deleted Succesfully",
      className: "bg-red-600",
    });
  };

  const isNotApproved = !userDocs.find((d) => d.approvalStatus === "APPROVED");
  const doc = allDocs.find((d) => d.name === document.name);

  const [formData, setformData] = useState<FormDataType>({
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ...doc?.details?.reduce((acc: Record<string, any>, d) => {
      acc[d.slug] = "";
      return acc;
    }, {}),
  });

  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    size: number;
    name: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!uploadedFile) return;
    setLoading(true);
    await api.user.onboarding.document.post({
      url: uploadedFile.url,
      size: uploadedFile.size || 0,
      fileName: uploadedFile.name,
      fileType: document.type,
      otherDetails: formData,
    });
    queryClient.invalidateQueries({
      queryKey: ["detailedUser"],
    });
    queryClient.invalidateQueries({
      queryKey: ["onboarding"],
    });
    setLoading(false);
    setOpen(false);
  };

  return (
    <section className="space-y-2 border-b py-5">
      <div>
        <Label className=" text-sm font-semibold text-[#344054] ">
          {document.title}
        </Label>
        <p className="pb-2 text-sm font-normal">{document.description}</p>
      </div>
      {isNotApproved && (
        <div className="lg:max-w-[550px]">
          {userDocs.some((e) => e.approvalStatus === "PENDING") ? (
            <div className="border-error-border-ligher bg-error-bg-subtle flex items-center gap-2 rounded-md border p-4 text-gray-500">
              <BadgeInfo size={40} className=" text-error-text " />
              <p>
                You have a pending document. You cannot upload another until the
                current one is approved or rejected.
              </p>
            </div>
          ) : (
            <DocumentUpload
              afterUpload={async (e) => {
                setUploadedFile(e);
                if (!document.details?.length) {
                  await handleSave();
                } else {
                  setOpen(true);
                }
              }}
            />
          )}
        </div>
      )}
      <div className="grid gap-4">
        {userDocs?.map((docs) => {
          return (
            <div
              key={docs.id}
              className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-md border p-4"
            >
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{docs.fileType}</p>
                  <Badge variant="outline">
                    {docs.fileName
                      .split(".")
                      .pop()
                      .toUpperCase()
                      .replaceAll("_", " ")}
                  </Badge>
                  <Badge>{docs.approvalStatus}</Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {docs?.otherDetails?.documentDate && (
                    <span>
                      Expires:&nbsp;{docs?.otherDetails?.documentDate}
                      &nbsp;|
                    </span>
                  )}
                  Size:&nbsp;(
                  {formatBytes(docs.size)})
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-gray-300 text-gray-800 hover:bg-gray-200"
                      size="sm"
                      variant="ghost"
                    >
                      <EyeIcon className="size-4" />
                      <span className="sr-only">View Document</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{docs.fileType}</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      {(() => {
                        const fileExtension = docs.fileName
                          .split(".")
                          .pop()
                          .toLowerCase();

                        switch (fileExtension) {
                          case "jpg":
                          case "jpeg":
                          case "png":
                          case "webp":
                            return (
                              <img
                                className="max-h-[600px] w-full"
                                alt={docs.fileType}
                                src={docs.document}
                              />
                            );
                          default:
                            return <p>Error in finding file.</p>;
                        }
                      })()}
                    </div>
                  </DialogContent>
                </Dialog>
                {docs.approvalStatus !== "APPROVED" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="bg-gray-300 text-gray-800 hover:bg-gray-200"
                        size="sm"
                        variant="ghost"
                      >
                        <TrashIcon className="size-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your document from Carestream 24
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(docs.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add document details</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            {document.details?.map((d) => (
              <div key={d.slug} className="space-y-1 py-2">
                <Label htmlFor="picture">{d.name}</Label>
                <Input
                  type={d.type}
                  onChange={(e) =>
                    setformData({ ...formData, [d.slug]: e.target.value })
                  }
                  placeholder={d.name}
                  disabled={loading}
                />
              </div>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} disabled={loading}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
