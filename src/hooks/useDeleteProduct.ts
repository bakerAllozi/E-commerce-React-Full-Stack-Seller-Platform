import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProduct } from '../services/apiDataOfProduct';

function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteProductById } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['DataOfProduct']);
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    },
  });

  return { deleteProductById, isLoading };
}

export default useDeleteProduct;
