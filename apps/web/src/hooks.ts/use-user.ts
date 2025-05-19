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
