import { useCallback } from "react";
import { getDataOfProduct } from "../services/apiDataOfProduct";
import { fetchProductItem } from "../features/Homepage/HomepageSlice";
import useRedux from "./useRedux";
import { useQuery } from "@tanstack/react-query";
import { getDataChats } from "../features/User/userSlice";
import useUser from "./useUser";
import useReadChats from "./useReadChats";

interface ProductData {
  id: string;
  name: string;
}

interface ChatData {
  id: string;
  message: string;
}

interface UseProductDataReturn {
  data: ProductData[] | undefined;
  isLoading: boolean;
  updateData: () => void;
}

const useProductData = (): UseProductDataReturn => {
  const { dispatch } = useRedux();
  const { user } = useUser();

  const { data: chatData } = useReadChats(user?.id || "");

  const { data, isLoading } = useQuery<ProductData[]>({
    queryKey: ["DataOfProduct"],
    queryFn: getDataOfProduct,
  });

  const updateData = useCallback(() => {
    if (!user || !chatData || !data) return;
    dispatch(fetchProductItem(data));
    dispatch(getDataChats(chatData));
  }, [dispatch, data, chatData, user]);

  return { data, isLoading, updateData };
};

export default useProductData;
