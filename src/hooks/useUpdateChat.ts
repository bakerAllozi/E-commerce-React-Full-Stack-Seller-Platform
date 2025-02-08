import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateChat } from '../backend/apiChat';

function useUpdateChat() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateChatsById } = useMutation({
    mutationFn: updateChat,
    onSuccess: (chats) => {
      queryClient.setQueryData(['Chats'], chats);
      queryClient.invalidateQueries(['Chats']);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    },
  });

  return { updateChatsById, isLoading };
}

export default useUpdateChat;
