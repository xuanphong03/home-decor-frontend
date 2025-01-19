import { storage_keys } from "@/constants/storage-keys";
import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const productList =
  JSON.parse(localStorage.getItem(storage_keys.HOME_DECOR_CART)) || [];
const totalProducts = productList.reduce(
  (prevResult, product) => prevResult + product.quantity,
  0
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productList,
    totalProducts,
  },
  reducers: {
    addToCart(state, action) {
      const { product, quantity: addedQuantity } = action.payload;
      const cloneProductList = cloneDeep(state.productList);
      const targetProduct = cloneProductList.find((p) => p.id === product.id);
      if (targetProduct) {
        const productQuantity = targetProduct.quantity + addedQuantity;
        if (productQuantity <= targetProduct.totalQuantity) {
          targetProduct.quantity = productQuantity;
          state.productList = cloneProductList;
        }
      } else {
        state.productList.push({
          ...product,
          totalQuantity: product.quantity,
          quantity: addedQuantity,
        });
      }
      state.totalProducts += addedQuantity;

      localStorage.setItem(
        storage_keys.HOME_DECOR_CART,
        JSON.stringify(state.productList)
      );
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const targetProduct = state.productList.find((p) => p.id === productId);
      state.productList = state.productList.filter((p) => p.id !== productId);
      state.totalProducts -= targetProduct.quantity;
      localStorage.setItem(
        storage_keys.HOME_DECOR_CART,
        JSON.stringify(state.productList)
      );
    },
    updateCart(state, action) {
      const newProductList = action.payload.filter(
        (product) => product.quantity > 0
      );
      state.productList = newProductList;
      state.totalProducts = newProductList.reduce(
        (prevResult, product) => prevResult + product.quantity,
        0
      );
      localStorage.setItem(
        storage_keys.HOME_DECOR_CART,
        JSON.stringify(state.productList)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
