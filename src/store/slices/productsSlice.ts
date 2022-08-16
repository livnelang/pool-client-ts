import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsResponse } from "../../interfaces/Product";

export interface ProductsState {
  products: Product[] | null;
}

const productsInitialState: ProductsState = {
  products: null,
};

const productsSlice = createSlice({
  name: "productsData",
  initialState: productsInitialState,
  reducers: {
    setProductsResponse: (
    state: ProductsState,
      { payload }: PayloadAction<{ productsResponse: ProductsResponse }>
    ) => {
      state.products = payload.productsResponse.products;
    },
  },
});

// ACTIONS
export const { setProductsResponse: setProductsResponse } =
  productsSlice.actions;

// REDUCER
export default productsSlice;
