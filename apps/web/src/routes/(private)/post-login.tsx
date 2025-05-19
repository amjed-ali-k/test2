import { Disc3 } from "lucide-react";
import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function PostLogin() {
  const eden = useEden();
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["current-user"],
    queryFn: () =>
      eden().then((e) => e.user["get-current-user"].get().then((k) => k.data)),
  });

  useEffect(() => {
    refetch().then(({ data }) => {
      if (!data) {
        return navigate("/sign-out");
      }
      if (data.isApproved) {
        return navigate("/dashboard/overview");
      }
      if (
        data.type &&
        ["SYSTEM_ADMIN", "ORGANISATION_ADMIN"].includes(data.type)
      ) {
        toast("You are logged in as a organisation admin", {
          description:
            "You will be signed out. Login to organization dashboard to continue.",
        });
        return navigate("/sign-out");
      }
    });
    // Get IP and User agent and send to backend
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(async (data) => {
        const ip = data.ip;
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        const e = await eden();
        return e.user.meta.newLogin.post({ ip, userAgent, platform });
      });
  }, [eden, refetch, navigate]);

  return (
    <div className="flex grow items-center justify-center">
      <div className="flex flex-col items-center">
        <Disc3 className="h-20 w-20 animate-spin" />
        Logging in...
      </div>
    </div>
  );
}
