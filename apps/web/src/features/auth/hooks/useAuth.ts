import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../authQuery";

export function useAuth() {
    return useQuery(authQuery);
}