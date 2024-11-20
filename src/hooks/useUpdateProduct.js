import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../services/apiDataOfProduct";
// import { setCategoryName } from "../features/Homepage/HomepageSlice";
// import useRedux from "./useRedux";

function useUpdateProduct() {
  const queryClient = useQueryClient();
  // const { dispatch } = useRedux();

  const { isLoading, mutate: updateProductById } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      console.log("Product updated successfully:", data);
      queryClient.invalidateQueries(["DataOfProduct"]);
      // dispatch(setCategoryName(data));
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert(error.message);
    },
  });

  return { updateProductById, isLoading };
}

export default useUpdateProduct;
