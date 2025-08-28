import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Pizza } from "../../types/Pizza";
import axios from "axios";
import type { SearchParams } from "../../types/SearchParams";

type PizzaState = {
  items: Pizza[];
  isLoading: string;
};

const initialState: PizzaState = {
  items: [],
  isLoading: 'loading',
};

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchByStatus",
  async (params: SearchParams) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://68a7506d639c6a54e9a1aeba.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.isLoading = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.isLoading = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
        state.isLoading = 'error';
      });
  },
});

export default pizzaSlice.reducer;
