/* eslint-disable @typescript-eslint/no-unused-vars */
import {CaseReducer, PayloadAction, createSlice} from '@reduxjs/toolkit';

type productSliceReducer<Payload> = CaseReducer<
  InitialState,
  PayloadAction<Payload>
>;

export type ProductList = {
  brand: string;
  id: string;
  category: string;
  description: string;
  title: string;
  images: string[];
  price: number;
  thumbnail: string;
  rating: string;
  discountPercentage: number;
  quantity: number;
};

type InitialState = {
  productList: {
    data: ProductList[];
    loading: boolean;
  };
  product: ProductList;
  favourites: ProductList[];
  cartItems: ProductList[];
};

const initialState: InitialState = {
  productList: {
    data: [],
    loading: false,
  },
  product: Object(null),
  favourites: [],
  cartItems: [],
};

const getAllProducts: productSliceReducer<void> = (state, action) => {
  state.productList.loading = true;
};

const setAllProducts: productSliceReducer<ProductList[]> = (state, action) => {
  state.productList.data = action.payload;
  state.productList.loading = false;
};

const getProduct: productSliceReducer<string> = (state, action) => state;

const setProduct: productSliceReducer<ProductList> = (state, action) => {
  state.product = action.payload;
};

const setCartItems: productSliceReducer<ProductList[]> = (state, action) => {
  state.cartItems = action.payload;
};

const setFavourites: productSliceReducer<ProductList[]> = (state, action) => {
  state.favourites = action.payload;
};

const addProduct: productSliceReducer<string> = (state, action) => {
  return {
    ...state,
    cartItems: state.cartItems.map(item =>
      item.id === action.payload
        ? {...item, quantity: item.quantity + 1}
        : item,
    ),
  };
};

const removeProduct: productSliceReducer<string> = (state, action) => {
  return {
    ...state,
    cartItems: state.cartItems
      .map(item =>
        item.id === action.payload
          ? {...item, quantity: item.quantity - 1}
          : item,
      )
      .filter(item => item.quantity > 0),
  };
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts,
    setAllProducts,
    getProduct,
    setProduct,
    setCartItems,
    setFavourites,
    addProduct,
    removeProduct,
  },
});

export default productSlice;
