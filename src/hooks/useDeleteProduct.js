import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProduct } from "../services/apiDataOfProduct";

function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteProductById } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      console.log("Product deleted successfully:", data);
      queryClient.invalidateQueries(["DataOfProduct"]);
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      alert(error.message);
    },
  });

  return { deleteProductById, isLoading };
}

export default useDeleteProduct;
