import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const eden = useEden();
  const { data } = useQuery({
    queryKey: ["current-user"],
    queryFn: () =>
      eden.user["get-current-user"].get().then((k) => k.data),
  });
  return data;
};


export const useDetailedUser = () => {
  const eden = useEden();
  const { data } = useQuery({
    queryKey: ["detailed-user"],
    queryFn: () =>
      eden.user.detailedUser.get().then((k) => k.data),
  });
  return data;
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof useUser>>>;

export type DetailedUser = NonNullable<Awaited<ReturnType<typeof useDetailedUser>>>;