import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductsInBulk } from "../services/apiDataOfProduct";

function useUpdateProducts() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateMultipleProducts } = useMutation({
    mutationFn: async (products) => {
      return updateProductsInBulk(products);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["DataOfProduct"]);
    },
    onError: (error) => {
      console.error("Error updating products:", error);
      alert(error.message);
    },
  });

  return { updateMultipleProducts, isLoading };
}

export default useUpdateProducts;
