import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChat } from "../services/apiChat";

function useUpdateChat() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateChatsById } = useMutation({
    mutationFn: updateChat,
    onSuccess: (chats) => {
      queryClient.setQueryData(["Chats"], chats);
      queryClient.invalidateQueries(["Chats"]);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert(error.message);
    },
  });

  return { updateChatsById, isLoading };
}

export default useUpdateChat;
