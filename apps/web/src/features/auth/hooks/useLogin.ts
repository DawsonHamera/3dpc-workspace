import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/client";

export function useLogin() {
  const queryClient = useQueryClient();

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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });
    },
  });
}