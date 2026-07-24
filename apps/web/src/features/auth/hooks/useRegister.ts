import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "../../../api/client";
import { apiFetch } from "@/features/apiFetch";
import { useRevalidator } from "react-router-dom";


export function useRegister() {

    const queryClient = useQueryClient();

    const revalidator = useRevalidator()

    return useMutation({

        mutationFn: async (data: {
            email: string;
            name: string;
            password: string;
            confirmPassword: string;
            grade?: string;
        }) => {


            const res = await api.auth.register.$post({
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

export type RegisterData = {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    grade?: string;
};