import type { DetailedUser } from "@/hooks/use-user";
import { Button } from "@repo/ui/components/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { MapIcon, MapPin } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";


export const addressEdit = z.object({
    addressLine1: z
      .string()
      .min(2, "Address line 1 must be at least 2 characters")
      .max(40, "Address line 1 cannot exceed 40 characters"),
    addressLine2: z
      .string()
      .min(2, "Address line 2 must be at least 2 characters")
      .max(40, "Address line 2 cannot exceed 40 characters"),
    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .max(25, "City cannot exceed 25 characters"),
    pinCode: z
      .string()
      .min(5, "Postal code must be at least 5 digits")
      .max(7, "Postal code cannot exceed 7 digits"),
  });
  

export function AddressEdit({ userData }: { userData?: DetailedUser | null }) {
    const address = useFormContext<z.infer<typeof addressEdit>>();
    return (
      <div>
        <section className="space-y-4 border-b py-5">
          <FormField
            control={address.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="lg:flex">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0  flex items-center">
                      <MapPin className="mx-3 h-5 w-5 text-[#667085]" />
                    </div>
                    <div>
                      <Input
                        placeholder="Enter Address Line 1"
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
          <FormField
            control={address.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem className="lg:flex">
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0  flex items-center">
                      <MapPin className="mx-3 h-5 w-5 text-[#667085]" />
                    </div>
                    <div>
                      <Input
                        placeholder="Enter Address Line 2"
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
  
        <section className="space-y-4 border-b py-5">
          <FormField
            control={address.control}
            name="pinCode"
            render={({ field }) => (
              <FormItem className="lg:flex">
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0  flex items-center">
                      <MapPin className="mx-3 h-5 w-5 text-[#667085]" />
                    </div>
                    <div>
                      <Input
                        placeholder="Enter your postal code"
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
  
          <FormField
            control={address.control}
            name="city"
            render={({ field }) => (
              <FormItem className="lg:flex">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute inset-y-0  flex items-center">
                      <MapIcon
                       className="mx-3 h-5 w-5 text-[#667085]" />
                    </div>
                    <div>
                      <Input
                        placeholder="Enter your City"
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
  
        <section>
          <div className="space-y-2 py-6 lg:flex lg:justify-end lg:space-x-2 lg:space-y-0">
            <Button
              size="lg"
              onClick={() => {
                address.reset({
                  addressLine1: userData?.address?.addressLine1 || undefined,
                  addressLine2: userData?.address?.addressLine2 || undefined,
                  city: userData?.address?.city || undefined,
                  pinCode: userData?.address?.pinCode || undefined,
                });
              }}
              disabled={address.formState.isSubmitting}
              variant="outline"
              className="w-full lg:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="w-full lg:w-auto"
              disabled={address.formState.isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </section>
      </div>
    );
  }
  