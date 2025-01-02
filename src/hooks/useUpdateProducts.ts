import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductsInBulk } from "../services/apiDataOfProduct";
import MyProductType from "@/types/product.type";

function useUpdateProducts() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateMultipleProducts } = useMutation({
    mutationFn: async (
      products: { id: string; updateData: MyProductType }[]
    ) => {
      return updateProductsInBulk(products);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["DataOfProduct"]);
    },
    onError: (error) => {
      console.error("Error updating products:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    },
  });

  return { updateMultipleProducts, isLoading };
}

export default useUpdateProducts;
