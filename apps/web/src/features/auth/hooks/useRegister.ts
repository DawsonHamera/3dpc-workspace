import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { api } from "../../../api/client";


export function useRegister() {

    const queryClient = useQueryClient();


    return useMutation({

        mutationFn: async (data: {
            email: string;
            name: string;
            password: string;
            grade?: string;
        }) => {


            const res = await api.auth.register.$post({
                json: data,
            });


            if (!res.ok) {

                const error =
                    await res.json()
                        .catch(() => null);


                throw new Error(
                    error?.error.message ??
                    "Registration failed"
                );

            }


            return res.json();

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