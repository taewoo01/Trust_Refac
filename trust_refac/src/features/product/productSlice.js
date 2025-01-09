import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // 상품 리스트
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload; // 상품 리스트 설정
    },
    addProduct(state, action) {
      state.products.push(action.payload); // 새로운 상품 추가
    },
    removeProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      ); // 상품 삭제
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
