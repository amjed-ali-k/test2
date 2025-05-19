"use client";

import React, { useState } from "react";
import { EyeIcon, Lock } from "lucide-react";

import { Label } from "../components/label.js";
import { toast } from "sonner";
import { Input } from "../components/input.js";
import { Button } from "../components/button.js";

export function PasswordChange({
  onSubmit,
  isSystemAdmin,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onSubmit?: (currentPassword: string, newPassword: string) => Promise<any>;
  isSystemAdmin?: boolean;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = () => {
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      toast("New passwords do not match");
      setIsLoading(false);
      return;
    }
    if (newPassword === currentPassword) {
      toast("New password cannot be the same as current password");
      setIsLoading(false);
      return;
    }
    onSubmit?.(currentPassword, newPassword)
      .then(() => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  return (
    <section>
      <div className="flex items-center justify-between border-b py-5 ">
        <div>
          <h3>Password</h3>
          <p>Update password here.</p>
        </div>
      </div>

      {!isSystemAdmin && (
        <section className="space-y-4 border-b py-5">
          <div className="space-y-2 lg:flex">
            <Label
              htmlFor="currentPassword"
              className="text-sm font-semibold text-[#344054] lg:w-[320px]"
            >
              Current Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0  flex items-center">
                <Lock className="mx-3 h-5 w-5 text-[#667085]" />
              </div>
              <div>
                <Input
                  className="pl-10 lg:w-[550px]"
                  id="currentPassword"
                  placeholder="Enter current password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4 border-b py-5">
        <div className="space-y-2 lg:flex">
          <Label
            htmlFor="newPassword"
            className="text-sm font-semibold text-[#344054] lg:w-[320px]"
          >
            New Password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Lock className="mx-3 h-5 w-5 text-[#667085]" />
            </div>

            <Input
              className="px-10 lg:w-[550px]"
              id="newPassword"
              placeholder="Enter new password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
              type="button"
                className="h-full px-4"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <EyeIcon className="h-5 w-5 text-[#667085]" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 lg:flex">
          <Label
            className="text-sm font-semibold text-[#344054] lg:w-[320px]"
            htmlFor="confirmPassword"
          >
            Re-enter New Password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Lock className="mx-3 h-5 w-5 text-[#667085]" />
            </div>
            <Input
              className="px-10 lg:w-[550px]"
              id="confirmPassword"
              placeholder="Confirm new password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
              type="button"
                className="h-full px-4"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <EyeIcon className="h-5 w-5 text-[#667085]" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="space-y-2 py-6 lg:flex lg:justify-end lg:space-x-2 lg:space-y-0">
        <Button className=" w-full lg:w-auto " size="lg" variant="outline">
          Cancel
        </Button>
        <Button
          variant="primary"
          size="lg"
          className=" w-full lg:w-auto"
          onClick={handleUpdatePassword}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </section>
  );
}
