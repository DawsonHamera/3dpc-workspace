import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/client";
import { useRevalidator } from "react-router-dom";

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

      if (!res.ok) {
        throw new Error("Login failed");
      }

      return res.json();
    },

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["auth", "me"],
      });
      revalidator.revalidate();
    },
  });
}