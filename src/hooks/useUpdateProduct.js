import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../services/apiDataOfProduct";

function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateProductById } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["DataOfProduct"]);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert(error.message);
    },
  });

  return { updateProductById, isLoading };
}

export default useUpdateProduct;
