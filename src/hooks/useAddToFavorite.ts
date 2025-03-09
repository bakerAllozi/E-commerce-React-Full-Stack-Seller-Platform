import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertProductFavorite } from '@/backend/apiProductFavorite';

const useAddToFavorite = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (row: { userId: string; productId: string }) => insertProductFavorite(row),
    onSuccess: () => {
      queryClient.invalidateQueries(['ProductFavorite']);
    },
    onError: (err: Error) => {
      alert(err.message);
    },
  });

  return { isLoading, mutate };
};

export default useAddToFavorite;
