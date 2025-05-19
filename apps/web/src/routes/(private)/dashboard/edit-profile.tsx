import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Form, useForm } from "react-hook-form";
import { useEden } from "@/lib/api";
import { useUser } from "@clerk/react-router";
import { Button } from "@repo/ui/components/button";
import { DataTable } from "@repo/ui/components/data-table";
import { Label } from "@repo/ui/components/label";
import { ScrollArea, ScrollBar } from "@repo/ui/components/scroll-area";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/tabs";
import { toast } from "sonner";

import type { z } from "zod";
import { useDetailedUser } from "@/hooks/use-user";
import { useQueryClient } from "@tanstack/react-query";
import { PasswordChange } from "@repo/ui/form/password-edit";
import { DocsEdit } from "@/components/form/doc-edit-form";
import { NotificationSettings } from "@/components/form/notification-settings";
import MapPicker from "@repo/ui/components/map-picker";
import { AvatarUpload } from "@/components/form/doc-upload";
import { basicDetailsEdit, BasicEdit} from '@/components/form/basic-edit-form'
import { AddressEdit, addressEdit } from "@/components/form/address-edit-form";
const nItems = [
  {
    head: "Shift Reminder",
    description: "Receive notifications for upcoming shifts.",
    emailId: "shiftReminderEmail",
    smsId: "shiftReminderSMS",
    slug: "shiftReminder" as const,
    emailDescription: "You will receive an email two hours before your shift.",
    smsDescription: "You will receive an SMS two hours before your shift.",
  },
  {
    head: "Shift Invitation",
    description:
      "Receive notifications for when someone invites you to a shift.",
    emailId: "shiftInvitationEmail",
    smsId: "shiftInvitationSMS",
    slug: "shiftInvitation" as const,
    emailDescription:
      "You will receive an email when someone invites you to a shift.",
    smsDescription:
      "You will receive an SMS when someone invites you to a shift.",
  },
  {
    head: "Shift Approval",
    description:
      "Receive notifications when your shift is approved or rejected.",
    emailId: "shiftApprovalEmail",
    smsId: "shiftApprovalSMS",
    slug: "shiftApproval" as const,
    emailDescription:
      "You will receive an email when your shift is approved or rejected.",
    smsDescription:
      "You will receive an SMS when your shift is approved or rejected.",
  },
  {
    head: "Shift Cancellation",
    description: "Receive notifications when your shift is cancelled.",
    emailId: "shiftCancellationEmail",
    smsId: "shiftCancellationSMS",
    slug: "shiftCancellation" as const,
    emailDescription: "You will receive an email when your shift is cancelled.",
    smsDescription: "You will receive an SMS when your shift is cancelled.",
  },
  {
    head: "Password Change",
    description: "Receive notifications for password change.",
    emailId: "passwordChangeEmail",
    smsId: "passwordChangeSMS",
    slug: "passwordChange" as const,
    emailDescription:
      "You will receive an email when your password is changed.",
    smsDescription: "You will receive an SMS when your password is changed.",
  },
  {
    head: "Login Notification",
    description: "Receive notifications for login.",
    emailId: "loginEmail",
    smsId: "loginSMS",
    slug: "login" as const,
    emailDescription:
      "You will receive an email when someone logs in to your account.",
    smsDescription:
      "You will receive an SMS when someone logs in to your account.",
  },

  {
    head: "Timesheet Approval",
    description: "Receive notifications for timesheet approval.",
    emailId: "timesheetApprovalEmail",
    smsId: "timesheetApprovalSMS",
    slug: "timesheetApproval" as const,
    emailDescription:
      "You will receive an email when your timesheet is approved.",
    smsDescription: "You will receive an SMS when your timesheet is approved.",
  },
  {
    head: "Timesheet Rejection",
    description: "Receive notifications for timesheet rejection.",
    emailId: "timesheetRejectionEmail",
    smsId: "timesheetRejectionSMS",
    slug: "timesheetRejection" as const,
    emailDescription:
      "You will receive an email when your timesheet is rejected.",
    smsDescription: "You will receive an SMS when your timesheet is rejected.",
  },
];

export default function Page() {
  const eden = useEden();
  return (
    <main>
      <h2 className="lg:text-3xl">Settings</h2>
      <p className="pb-8 lg:text-base ">Here you can edit your details.</p>
      <Tabs defaultValue="details">
        <TabsList className=" w-full">
          <ScrollArea className=" w-screen overflow-visible whitespace-nowrap ">
            <TabsTrigger value="details">Basic details</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notification">
              Notification Settings
            </TabsTrigger>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsList>

        <TabsContent value="details">
          <BasicDetails />
        </TabsContent>
        <TabsContent value="address">
          <AddressDetails />
        </TabsContent>
        <TabsContent value="location">
          <LocationEdit />
        </TabsContent>

        <TabsContent value="password">
          <PasswordChange
            onSubmit={async (currentPassword, newPassword) =>
              eden.user.updatepassword
                .post({ currentPassword, newPassword })
                .then((d) => {
                  console.log(d);
                  if (d.error) {
                    toast("Password cannot be updated, try again");
                    return;
                  }
                  toast(d.data);
                })
            }
          />
          <Passkey />
        </TabsContent>
        <TabsContent value="documents">
          <DocsEdit />
        </TabsContent>
        <TabsContent value="notification">
          <NotificationSettings nItems={nItems} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function LocationEdit() {
  const api = useEden();

  const [loc, setloc] = useState<{ lat: number; lng: number } | null>(null);
  const queryClient = useQueryClient();
  const handleSubmit = async () => {
    if (!loc) return;
    await api.user.onboarding.location.post({
      lat: loc.lat,
      lng: loc.lng,
    });
    toast("Location updated", {
      description: "Location updated successfully",
    });
    await queryClient.invalidateQueries({
      queryKey: ["current-user"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["detailed-user"],
    });
  };
  return (
    <section>
      <div className="flex items-center justify-between border-b py-5">
        <div>
          <h3>Location Details</h3>
          <p>Update your location details here.</p>
        </div>
      </div>
      <div className="space-y-2 border-b py-5 lg:flex lg:space-x-2 lg:space-y-0">
        <Label className="lg:w-[320px]">Map location</Label>
        <MapPicker
          onChange={(latLng) => {
            setloc(latLng);
          }}
        />
        <Button
          variant="primary"
          type="button"
          size="lg"
          className="w-full lg:w-auto"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </div>
    </section>
  );
}

function BasicDetails() {
  function onFinished() {
    toast("Data Updated", {
      description: "Basic Details Updated Succesfully",
    });
  }

  const userData = useDetailedUser();

  const basic = useForm<z.infer<typeof basicDetailsEdit>>({
    resolver: zodResolver(basicDetailsEdit),
  });

  const api = useEden();
  const queryClient = useQueryClient();
  async function onSubmit(values: z.infer<typeof basicDetailsEdit>) {
    await api.user.onboarding.basicProfile.post(values).then(({ error }) => {
      if (!error) onFinished();
    });
    await queryClient.invalidateQueries({
      queryKey: ["current-user"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["detailed-user"],
    });
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (userData) {
      basic.reset({
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        ...(userData as any),
        dob: format(userData.dob || new Date(), "yyyy-MM-dd"),
      });
    }
  }, [userData]);

  return (
    <section>
      <div className="flex items-center justify-between border-b py-5">
        <div>
          <h3>Basic info</h3>
          <p>Update personal details here.</p>
        </div>
      </div>

      <AvatarUpload
        fallBack={`${userData?.firstName?.[0] || ""} ${userData?.lastName?.[0] || ""}`}
        image={userData?.avatar || undefined}
        onSubmit={async (e) => {
          await api.user.onboarding.document.post({
            url: e.url,
            size: e.size || 0,
            fileName: e.name,
            fileType: "AVATAR",
          });
          await queryClient.invalidateQueries({
            queryKey: ["detailed-user"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["current-user"],
          });
        }}
      />

      <Form {...basic}>
        <form onSubmit={basic.handleSubmit(onSubmit)}>
          <BasicEdit userData={userData} />
        </form>
      </Form>
    </section>
  );
}


function AddressDetails() {
  const userData = useDetailedUser();

  const address = useForm<z.infer<typeof addressEdit>>({
    resolver: zodResolver(addressEdit),
  });

  const api = useEden();
  const queryClient = useQueryClient();

  async function onSubmit(values: z.infer<typeof addressEdit>) {
    await api.user.onboarding.addressDetails.post(values).then(({ error }) => {
      if (!error)
        toast("Data Updated", {
          description: "Address Details Updated Succesfully",
        });
    });
    await queryClient.invalidateQueries({
      queryKey: ["current-user"],
    });
    await queryClient.invalidateQueries({
      queryKey: ["detailed-user"],
    });
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (userData?.address) {
      address.reset(userData.address);
    }
  }, [userData]);

  return (
    <section>
      <div className="flex items-center justify-between border-b py-5">
        <div>
          <h3>Address</h3>
          <p>Update your address details here.</p>
        </div>
      </div>
      <Form {...address}>
        <form onSubmit={address.handleSubmit(onSubmit)}>
          <AddressEdit userData={userData} />
        </form>
      </Form>
    </section>
  );
}

function Passkey() {
  const { user } = useUser();

  return (
    <section>
      <div className="flex items-center justify-between border-b py-5 ">
        <div>
          <h3>Passkeys</h3>
          <p>Add or remove passkeys here.</p>
        </div>
      </div>
      <div>
        <DataTable
          data={user?.passkeys || []}
          columns={[
            {
              accessorKey: "id",
              header: "ID",
            },
            {
              accessorKey: "name",
              header: "Name",
            },
            {
              accessorKey: "lastUsedAt",
              header: "Last Used At",
              cell: (e) => {
                const v = e.getValue() as Date | undefined;
                const date = v ? format(new Date(v), "PPp") : "";
                return <p>{date}</p>;
              },
            },
            {
              id: "action",
              header: " ",
              cell: (e) => {
                return (
                  <div className="flex space-x-2 duration-200">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={e.row.original.delete}
                    >
                      Remove
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <CreatePasskeyButton />
      </div>
    </section>
  );
}

function CreatePasskeyButton() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="primary" onClick={createClerkPasskey}>
      Add passkey
    </Button>
  );
}
