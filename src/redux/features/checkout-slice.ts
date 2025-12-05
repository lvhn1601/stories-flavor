import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CheckoutItem = {
  id?: number;
  name: string;
  category: "OPTIONAL" | "SUGGEST" | "HIGHEND";
  price: number;
  province: string;
  images: string[];
  quantity: number;
};

type CheckoutState = {
  items: CheckoutItem[];
};

const initialState: CheckoutState = {
  items: [],
};

export const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutItem: (state, action: PayloadAction<CheckoutItem>) => {
      state.items = [action.payload];
    },
    setCheckoutItems: (state, action: PayloadAction<CheckoutItem[]>) => {
      state.items = action.payload;
    },
    clearCheckoutItems: (state) => {
      state.items = [];
    },
  },
});

const selectItems = (state: RootState) => state.checkoutReducer.items;

export const selectTotalPrice = createSelector([selectItems], (items) => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

export const { setCheckoutItem, setCheckoutItems, clearCheckoutItems } = checkout.actions;
export default checkout.reducer;
