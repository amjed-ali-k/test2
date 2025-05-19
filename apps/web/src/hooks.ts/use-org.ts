import { useEden } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useOrg = (id?: number | null) => {
  const eden = useEden();
  const { data: organization, isLoading } = useQuery({
    queryKey: ["organization", id],
    queryFn: () =>
      eden.user
        .organization({
          organizationId: id || 0,
        })
        .get()
        .then((e) => e.data),
    enabled: !!id,
  });
  return { organization, isLoading };
};
