import { storage_keys } from "@/constants/storage-keys";
import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    productList:
      JSON.parse(localStorage.getItem(storage_keys.HOME_DECOR_WISHLIST)) || [],
  },
  reducers: {
    toggleWishlist(state, action) {
      const targetProduct = action.payload;
      if (
        state.productList.find((product) => product.id === targetProduct.id)
      ) {
        state.productList = state.productList.filter(
          (product) => product.id !== targetProduct.id
        );
      } else {
        state.productList.push(targetProduct);
      }
      localStorage.setItem(
        storage_keys.HOME_DECOR_WISHLIST,
        JSON.stringify(state.productList)
      );
    },
    removeFromWishlist(state, action) {
      const productId = action.payload;
      state.productList = state.productList.filter((p) => p.id !== productId);
      localStorage.setItem(
        storage_keys.HOME_DECOR_WISHLIST,
        JSON.stringify(state.productList)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
