import { useCallback } from "react";
import { getDataOfProduct } from "../services/apiDataOfProduct";
import { fetchProductItem } from "../features/Homepage/HomepageSlice";
import useRedux from "./useRedux";
import { useQuery } from "@tanstack/react-query";
import { getDataChats } from "../features/User/userSlice";
import useUser from "./useUser";
import useReadChats from "./useReadChats";

const useProductData = () => {
  const { dispatch } = useRedux();
  const { user } = useUser();
  const { data: chatData } = useReadChats(user?.id);
  const { data, isLoading } = useQuery({
    queryKey: ["DataOfProduct"],
    queryFn: getDataOfProduct,
  });

  const updateData = useCallback(() => {
    dispatch(fetchProductItem(data));
    dispatch(getDataChats(chatData, user?.id));
  }, [dispatch, data, chatData, user?.id]);

  return { data, isLoading, updateData };
};

export default useProductData;
