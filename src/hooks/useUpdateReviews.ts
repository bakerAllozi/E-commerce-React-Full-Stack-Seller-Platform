import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReview } from '../backend/apiReviews';

function useUpdateReview() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateReviewId } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries(['Reviews']);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    },
  });

  return { updateReviewId, isLoading };
}

export default useUpdateReview;
