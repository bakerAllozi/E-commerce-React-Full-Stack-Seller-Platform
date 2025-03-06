import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  Data: [],
  randomProduct: [],
};

const RecommenderSlice = createSlice({
  name: 'Recommender',
  initialState,
  reducers: {
    fetchProductItem(state, action) {
      state.Data = action.payload;
    },
  },
});

export default RecommenderSlice.reducer;

export const {
  fetchProductItem,
} = RecommenderSlice.actions;
