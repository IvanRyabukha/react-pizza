import {
  combineSlices,
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";

import { filterSlice } from "./slice/filterSlice";
import { cartSlice } from "./slice/cartSlice";
import { pizzaSlice } from "./slice/pizzaSlice";

const rootReducer = combineSlices(filterSlice, cartSlice, pizzaSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispath = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
