import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertMassage } from "../services/apiChat";
import { ChatMessageType } from "@/types/chats.type";

const useInsertMassage = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation<void, Error, ChatMessageType>({
    mutationFn: (row: {
      message: string;
      message_id: string;
      sender_id: string;
      receiver_id: string;
    }) => insertMassage(row),
    onSuccess: () => {
      queryClient.invalidateQueries(["Chats"]);
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });

  return { isLoading, mutate };
};

export default useInsertMassage;
