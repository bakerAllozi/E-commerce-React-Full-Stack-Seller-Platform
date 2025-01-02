import { useQuery } from "@tanstack/react-query";
import { getDataOfChats } from "../services/apiChat";

const useReadChats = (id: string) => {
  if (typeof id !== "string") {
    const { data, isLoading } = useQuery({
      queryKey: ["Chats"],
      queryFn: () => getDataOfChats(id),
      refetchInterval: 5000,
    });

    return { data, isLoading };
  }
};

export default useReadChats;
