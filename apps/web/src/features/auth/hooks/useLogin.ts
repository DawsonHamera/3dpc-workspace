import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/client";
import { useRevalidator } from "react-router-dom";
import { apiFetch } from "@/features/apiFetch";

export function useLogin() {
  const queryClient = useQueryClient();

  const revalidator = useRevalidator();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      password: string;
    }) => {
      const res = await api.auth.login.$post({
        json: data,
      });

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

export type LoginData = {
  email: string;
  password: string;
};