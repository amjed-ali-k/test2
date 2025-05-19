import { CameraIcon, X } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar.js";
import { Label } from "../components/label.js";
import { Button } from "../components/button.js";

export function AvatarUploadPrimitive({
    image,
    onSubmit,
    fallBack,
    children,
  }: {
    image: string | undefined | null;
    fallBack?: string;
    onSubmit: (e: { url: string; size: number; name: string }) => Promise<void>;
    children: ({onSubmit}: {onSubmit: (e: { url: string; size: number; name: string }) => Promise<void>}) => React.ReactNode;
  }) {
    const [edit, setedit] = useState(false);

    const handleSubmit = async () => {
      await onSubmit({
        url: image || "",
        size: 0,
        name: "",
      });
      setedit(false);
    };
    
  
    return (
      <section className="border-b py-5 lg:flex">
        <div className="lg:w-[320px]">
          <Label className="text-sm font-semibold text-[#344054] ">
            Your photo
          </Label>
          <p className=" pb-2 text-sm font-normal text-[#475467]">
            This will be displayed on your profile.
          </p>
        </div>
        <div className="grpw max-w-[550px] grow lg:flex lg:space-x-4 ">
          {!edit && (
            <div className="block">
              <Avatar className="size-32 rounded-lg">
                <AvatarImage alt="User Profile Photo" src={image || undefined} />
                <AvatarFallback className="rounded-lg">
                  <p className="text-xl">{fallBack}</p>
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="link"
                size={"xs"}
                className="text-error-border-darker mt-2"
                onClick={() => setedit(true)}
              >
                <CameraIcon className="mr-2 size-4" />
                Change Picture
              </Button>
            </div>
          )}
          {edit && (
            <div className=" grow  ">
            {children({onSubmit: handleSubmit})}
              
              <Button
                type="button"
                variant="link"
                size={"xs"}
                className="text-error-border-darker mt-2"
                onClick={() => setedit(false)}
              >
                <X className="mr-2 size-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }
  