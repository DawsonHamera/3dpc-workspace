import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    apiFetch,
} from "../apiFetch";

import {
    api,
} from "@/api/client";



export type OnshapeConnectionStatus = {
    connected: boolean;
};



export function useOnshapeConnection() {

    return useQuery<OnshapeConnectionStatus>({
        queryKey: [
            "onshape",
            "connection",
        ],

        queryFn: async () => {

            const res =
                await api.onshape.connection.$get();

            return apiFetch(res);
        },
    });
}



export function useConnectOnshape() {

    return () => {

        window.location.href =
            `${import.meta.env.VITE_API_URL}/onshape/connect`;
    };
}



export function useDisconnectOnshape() {

    const queryClient =
        useQueryClient();


    return useMutation({

        mutationFn: async () => {

            const res =
                await api.onshape.connection.$delete();

            return apiFetch(res);
        },


        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: [
                    "onshape",
                    "connection",
                ],
            });
        },
    });
}