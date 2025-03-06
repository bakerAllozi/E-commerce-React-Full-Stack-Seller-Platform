import { MyProductType } from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';
const initialState:{
  Data: MyProductType[];
  recommendProduct:{
    timeSpent: number;
    productId: string;
    Category: string;
  }[];
  userId: string;
  productlike: MyProductType[];
  dataAfterSort :{
    timeSpent: number;
    productId: string;
    Category: string;
  }[];
} = {
  Data: [],
  recommendProduct: [],
  userId:'',
  dataAfterSort: [],
  productlike: [],
};

const RecommenderSlice = createSlice({
  name: 'Recommender',
  initialState,
  reducers: {
    fetchDataRecommender(state, action) {
      state.Data = action.payload;
    },
    getDataToRecommend(state, action) {
      state.recommendProduct = [...state.recommendProduct, action.payload];
      state.dataAfterSort = state.recommendProduct.sort((a, b) => b.timeSpent - a.timeSpent);
      state.productlike = action.payload.productsLiked.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});
        },
    getUserId(state, action) {
    state.userId = action.payload;
  },
  
  },
});

export default RecommenderSlice.reducer;

export const {
  fetchDataRecommender,
  getDataToRecommend,
  getUserId,
} = RecommenderSlice.actions;
