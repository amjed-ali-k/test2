import { Label } from "@repo/ui/components/label";
import { Input } from "@repo/ui/components/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { Button } from "@repo/ui/components/button";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { Mail, Phone } from "lucide-react";
import { timezones } from "@repo/ui/lib/utils";
import { format } from "date-fns";
import { title } from "radash";
import type { DetailedUser } from "@/hooks/use-user";

export const basicDetailsEdit = z.object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(25, "First name cannot exceed 25 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(25, "Last name cannot exceed 25 characters"),
    dob: z.date(),
    sex: z.enum(["male", "female"]),
    phone: z
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .max(14, "Phone number cannot exceed 14 digits"),
    bio: z.string().max(255, "Bio cannot exceed 255 characters").optional(),
    timezone: z
      .string()
      .max(255, "Timezone cannot exceed 255 characters")
      .optional(),
    email: z.string().email("Invalid email address"),
  });

  
export function BasicEdit({ userData }: { userData?: DetailedUser | null }) {
    const basic = useFormContext<z.infer<typeof basicDetailsEdit>>();
    return (
      <>
        <div>
          <section className="border-b py-5 lg:flex">
            <Label className="text-sm font-semibold text-[#344054] lg:w-[320px] ">
              Name
            </Label>
            <div className="grid grid-cols-2 space-x-2 pt-2 lg:w-[550px] lg:pt-0 ">
              <FormField
                control={basic.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input placeholder="Your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={basic.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormControl>
                      <Input placeholder="Your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>
  
          <section className="space-y-4 border-b py-5">
            <div className="space-y-2 lg:flex">
              <Label className="text-sm font-semibold text-[#344054] lg:w-[320px]">
                Email address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0  flex items-center">
                  <Mail className="mx-3 h-5 w-5 text-[#667085]" />
                </div>
                <div>
                  <Input
                    type="email"
                    disabled
                    placeholder={userData?.email}
                    className="pl-10 lg:w-[550px]"
                  />
                </div>
              </div>
            </div>
            <FormField
              control={basic.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="lg:flex">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0  flex items-center">
                        <Phone className="mx-3 h-5 w-5 text-[#667085]" />
                      </div>
                      <div>
                        <Input
                          placeholder="Your phone number"
                          {...field}
                          className="pl-10 lg:w-[550px]"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
  
          <section className="py-5">
            <FormField
              control={basic.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="lg:flex">
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="lg:w-[550px]"
                      placeholder="Your Date of Birth"
                      {...field}
                      value={
                        format(field.value || new Date(), "yyyy-MM-dd")
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
  
          <section className="border-b pb-5">
            <FormField
              control={basic.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="lg:flex">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-2 lg:w-[550px]">
                      <Button
                        type="button"
                        size="md"
                        className="w-full"
                        variant={field.value === "male" ? "primary" : "outline"}
                        onClick={() => field.onChange("male")}
                      >
                        Male
                      </Button>
                      <Button
                        type="button"
                        size="md"
                        className="w-full"
                        variant={field.value === "female" ? "primary" : "outline"}
                        onClick={() => field.onChange("female")}
                      >
                        Female
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
  
          <section className="border-b py-5">
            <div className="space-y-2 lg:flex">
              <Label className="text-sm font-semibold text-[#344054] lg:w-[320px]">
                Role
              </Label>
              <Input
                disabled
                className="lg:w-[550px]"
                placeholder="Select your role"
                value={title(userData?.type.toLowerCase())}
              />
            </div>
          </section>
  
          <section className="space-y-4 border-b py-5">
            <FormField
              control={basic.control}
              name="timezone"
              render={({ field }) => (
                <FormItem className="lg:flex">
                  <FormLabel>Timezone</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone of your location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
  
          <section className=" border-b py-5">
            <FormField
              control={basic.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="lg:flex">
                  <div className=" lg:w-[320px]">
                    <FormLabel>Bio</FormLabel>
                    <p className="pb-2 text-sm font-normal text-[#475467]">
                      Write a short introduction
                    </p>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description..."
                      className="resize-none lg:w-[550px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <section>
            <div className="space-y-2 py-6 lg:flex lg:justify-end lg:space-x-2 lg:space-y-0">
              <Button
                size="lg"
                onClick={() => {
                  basic.reset({
                    firstName: userData?.firstName || undefined,
                    lastName: userData?.lastName || undefined,
                    phone: userData?.phone || undefined,
                    sex: userData?.sex as never,
                    dob: userData?.dob || undefined,
                  });
                }}
                disabled={basic.formState.isSubmitting}
                variant="outline"
                className="w-full lg:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="w-full lg:w-auto"
                disabled={basic.formState.isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </section>
        </div>
      </>
    );
  }
  