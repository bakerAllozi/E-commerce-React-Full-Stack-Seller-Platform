import { useMutation, useQueryClient } from '@tanstack/react-query';
import { insertNewReview } from '../backend/apiReviews';
import { CommentsOfProductType } from '@/types/CommentsOfProduct.type';

const useInsertNewReview = () => {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (row: CommentsOfProductType) => insertNewReview(row),
    onSuccess: () => {
      queryClient.invalidateQueries(['Reviews']);
    },
    onError: (err) => {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred');
      }
    },
  });

  return { isLoading, mutate };
};

export default useInsertNewReview;
