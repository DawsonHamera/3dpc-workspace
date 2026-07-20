import { useQuery } from "@tanstack/react-query";
import { api } from "../../../api/client";

export function useAuth() {
  return useQuery({
    queryKey: ["auth", "me"],

    queryFn: async () => {
      const res = await api.auth.me.$get();

      if (res.status === 401) {
        return null;
      }

      if (!res.ok) {
        throw new Error("Failed to load user");
      }

      return res.json();
    },
  });
}