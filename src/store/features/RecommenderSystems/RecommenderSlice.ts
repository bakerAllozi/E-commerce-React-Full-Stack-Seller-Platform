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
  SearchWorld: string[];
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
  SearchWorld: [],
  BehaviorData: {}

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
      state.BehaviorData = {user_id:state.userId , category: state.dataAfterSort};//


        },
    getUserId(state, action) {
    state.userId = action.payload;
  },
  getSearchWorld(state, action) {
    state.SearchWorld = [...state.SearchWorld, action.payload];
  },



  },
});

export default RecommenderSlice.reducer;

export const {
  fetchDataRecommender,
  getDataToRecommend,
  getUserId,
  getSearchWorld,
  
} = RecommenderSlice.actions;
