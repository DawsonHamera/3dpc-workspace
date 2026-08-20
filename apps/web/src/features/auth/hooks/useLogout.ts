import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/client";
import { useRevalidator } from "react-router-dom";
import { apiFetch } from "@/features/apiFetch";

export function useLogout() {
  const queryClient = useQueryClient();

  const revalidator = useRevalidator();

  return useMutation({

    mutationFn: async () => {
      const res = await api.auth.logout.$post();

      return apiFetch(res);
    },

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["auth", "me"],
      });
      revalidator.revalidate();
    },

  });
}