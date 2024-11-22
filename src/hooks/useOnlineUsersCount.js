import { useQuery } from "@tanstack/react-query";
import { trackUserPresence } from "../services/apiAuth";

const useOnlineUsersCount = (userId) => {
  const { data: onlineUsersCount = 0, isLoading } = useQuery({
    queryKey: ["onlineUsersCount"],
    queryFn: () => trackUserPresence(userId),
    refetchInterval: 5000, // تحديث العدد كل 5 ثوانٍ
  });

  return { onlineUsersCount, isLoading };
};

export default useOnlineUsersCount;
//قسم لجزان
