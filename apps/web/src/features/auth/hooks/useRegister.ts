import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "../../../api/client";
import { apiFetch } from "@/features/apiFetch";


export function useRegister() {

    const queryClient = useQueryClient();


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


        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    "auth",
                    "me",
                ],
            });

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