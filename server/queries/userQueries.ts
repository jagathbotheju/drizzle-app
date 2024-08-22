import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../actions/userActions";

export const useUserById = (userId: string) => {
  return useQuery({
    queryKey: ["uer-by-id", userId],
    queryFn: () => getUserById(userId),
  });
};
