import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../services/apiReviews";

function useUpdateReview() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateReviewId } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["Reviews"]);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert(error.message);
    },
  });

  return { updateReviewId, isLoading };
}

export default useUpdateReview;
