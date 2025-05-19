import  { useState } from "react";
import { AtSign, MessageSquareMore } from "lucide-react";
import { assign } from "radash";
import { useEden } from "@/lib/api";
import type { NotificationMeta, OnboardingMeta } from "@/types/general";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Label } from "@repo/ui/components/label";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export function NotificationSettings({
  nItems,
}: {
  nItems: {
    head: string;
    description: string;
    emailId: string;
    smsId?: string;
    slug: keyof Omit<NotificationMeta, "type">;
    emailDescription: string;
    smsDescription: string;
  }[];
}) {
  const [value, setValue] = useState<Partial<Omit<OnboardingMeta, "type">>>({});
  const api = useEden();

  

  const { data: metaData } = useQuery({
    queryKey: ["meta", "NOTIFICATION"],
    queryFn: () =>
      api.user.meta({
        key: "NOTIFICATION",
      }).get().then(e => e.data),
  });

  const meta = assign(
    metaData?.value as NotificationMeta,
    value as NotificationMeta,
  );
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false);
  const handleMetaSave = async () => {
    setLoading(true);
    await api.user
      .meta({
        key: "NOTIFICATION",
      })
      .put({ value: meta })
      .then((e) => {
        if (e.data) {
          queryClient.setQueryData(["meta", "NOTIFICATION"], e.data);
        }
      });
    setLoading(false);
  };
  return (
    <section>
      <div className="flex items-center justify-between border-b py-5">
        <div>
          <h3>Notification Settings</h3>
          <p>Update your Notification Settings here.</p>
        </div>
      </div>

      {nItems.map((item) => {
        return (
          <section
            key={item.slug}
            className="space-y-4 border-b py-5 xl:flex xl:gap-8 xl:space-y-0"
          >
            <div className="xl:w-[280px]">
              <Label className="text-sm font-semibold text-[#344054]">
                {item.head}
              </Label>
              <p className="pb-2">{item.description}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 xl:gap-8">
              <Label
                htmlFor={item.emailId}
                className="rounded-lg border p-4 duration-200 [&:has(button[role='checkbox'][data-state='checked'])]:border-blue-600 [&:has(button[role='checkbox'][data-state='checked'])]:bg-blue-50"
              >
                <div className="relative flex justify-between space-x-4">
                  <div className="flex space-x-3">
                    <div className="flex justify-center">
                      <AtSign
                        className=" bg-primary-bg-subtle size-10 rounded-full p-2"
                        color="#065A9E"
                      />
                    </div>
                    <div className="max-w-[300px] pt-1">
                      <span className="text-sm font-medium text-[#344054]">
                        Email
                      </span>
                      <p className="pb-2">{item.emailDescription}</p>
                    </div>
                  </div>
                  <Checkbox
                    id={item.emailId}
                    checked={meta?.[item.slug]?.email ?? true}
                    onCheckedChange={(e) => {
                      setValue((prev) =>
                        assign(prev, { [item.slug]: { email: e } }),
                      );
                    }}
                  />
                </div>
              </Label>
              <Label className="rounded-lg border p-4 duration-200 [&:has(button[role='checkbox'][data-state='checked'])]:border-blue-600 [&:has(button[role='checkbox'][data-state='checked'])]:bg-blue-50">
                <div className="relative flex justify-between space-x-4">
                  <div className="flex space-x-3">
                    <div className="flex justify-center">
                      <MessageSquareMore
                        className=" bg-primary-bg-subtle size-10 rounded-full p-2"
                        color="#065A9E"
                      />
                    </div>

                    <div className="max-w-[300px] pt-1">
                      <span className="text-sm font-medium text-[#344054]">
                        SMS
                      </span>
                      <p className="pb-2">{item.smsDescription}</p>
                    </div>
                  </div>
                  <Checkbox
                    id={item.smsId}
                    checked={meta?.[item.slug]?.sms ?? true}
                    onCheckedChange={(e) => {
                      setValue((prev) =>
                        assign(prev, { [item.slug]: { sms: e } }),
                      );
                    }}
                  />
                </div>
              </Label>
            </div>
          </section>
        );
      })}
      <section>
        <div className="space-y-2 py-6 lg:flex lg:justify-end lg:space-x-2 lg:space-y-0">
          <Button
            disabled={loading}
            className="w-full lg:w-auto"
            variant="outline"
            size="lg"
            onClick={() => setValue({})}
          >
            Cancel
          </Button>{" "}
          <Button
            disabled={loading}
            className="w-full lg:w-auto"
            variant="primary"
            size="lg"
            onClick={handleMetaSave}
          >
            Save Changes
          </Button>
        </div>
      </section>
    </section>
  );
}
