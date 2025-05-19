import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate } from "react-router";

export const LayoutOnboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const eden = useEden();
  const { data } = useQuery({
    queryKey: ["onboarding"],
    queryFn: () =>
      eden.user.onboarding.status.get().then((k) => k.data),
  });

  console.log(location);
  return (
    <div>
      <Outlet />
    </div>
  );
};
