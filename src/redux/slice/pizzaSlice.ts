import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Pizza } from "../../types/Pizza";
import axios from "axios";
import type { SearchParams } from "../../types/SearchParams";

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzaState = {
  items: Pizza[];
  isLoading: Status;
};

const initialState: PizzaState = {
  items: [],
  isLoading: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchParams>(
  "pizzas/fetchByStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
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
        state.isLoading = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.items = action.payload;
        state.isLoading = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
        state.isLoading = Status.ERROR;
      });
  },
});

export default pizzaSlice.reducer;
