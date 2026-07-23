import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/client";
import { useRevalidator } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();

  const revalidator = useRevalidator();

  return useMutation({

    mutationFn: async () => {
      const res = await api.auth.logout.$post();

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      return res.json();
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
      revalidator.revalidate();
    },

  });
}