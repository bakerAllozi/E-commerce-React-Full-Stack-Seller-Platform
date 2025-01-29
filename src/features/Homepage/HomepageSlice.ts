import { createSlice } from '@reduxjs/toolkit';
import { MyProductType } from '../../types/product.type';

type ProductArray = MyProductType[];

interface InitialState {
  [key: string]: ProductArray;
}

const initialState: InitialState = {
  Data: [],
  randomProduct: [],
  BestSellingProducts: [],
  wishlistData: [],
  productsILiked: [],
  ProductDetails: [],
  categoryName: [],
};

const HomepageReducer = createSlice({
  name: 'Homepage',
  initialState,
  reducers: {
    fetchProductItem(state, action) {
      state.Data = action.payload;
    },
    gitRandomProduct(state) {
      const randomNumbersArray = Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * 20) + 1
      );
      state.randomProduct = state.Data.filter((data, i) =>
        randomNumbersArray.includes(i)
      );
    },

    gitBestSellingProducts(state) {
      state.BestSellingProducts = state.Data.map((data) => data).sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
    },

    setProductDetails(state, action) {
      state.ProductDetails = action.payload;
    },
    setCategoryName(state, action) {
      state.categoryName = state.Data.filter(
        (arr) => arr.category === action.payload
      );
    },
    getProductsILiked(state, action) {
      const findProduct = state.Data.find((data) => data.id === action.payload);
      if (findProduct) {
        if (!state.productsILiked.some((e) => e.id === action.payload)) {
          state.productsILiked.push(findProduct);
        } else {
          state.productsILiked = state.productsILiked.filter(
            (arr) => arr.id !== findProduct.id
          );
        }
      }
    },
  },
});

export default HomepageReducer.reducer;
export const {
  fetchProductItem,
  gitRandomProduct,
  gitBestSellingProducts,
  getProductsILiked,
  setProductDetails,
  setCategoryName,
} = HomepageReducer.actions;
