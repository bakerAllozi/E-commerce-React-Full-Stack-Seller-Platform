import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import { UserType } from "../types/user.type";

export default function useUser() {
  const { isLoading, data: user } = useQuery<UserType | null>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
