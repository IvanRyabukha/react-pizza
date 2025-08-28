import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PizzaCartItem } from "../../types/Pizza";

type CartState = {
  items: PizzaCartItem[];
  totalPrice: number;
  // totalItems: number;
};

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  // totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<PizzaCartItem>) => {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    incrCount: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count++;
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    decrCount: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
  },
});

export const { addItem, removeItem, clearItems, incrCount, decrCount } =
  cartSlice.actions;
export default cartSlice.reducer;
