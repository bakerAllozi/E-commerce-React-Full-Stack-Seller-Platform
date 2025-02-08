import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../backend/apiDataOfProduct';

function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: updateProductById } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['DataOfProduct']);
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

  return { updateProductById, isLoading };
}

export default useUpdateProduct;
