import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  WishListItems: [],
};

const WishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishListItems: (state, action) => {
      state.WishListItems = action.payload;
    },
    clearWishListItems: (state) => {
      state.WishListItems = [];
    },
  },
});

export const {setWishListItems,clearWishListItems} = WishListSlice.actions;
export default WishListSlice.reducer;
