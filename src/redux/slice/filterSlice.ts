import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SortType } from "../../types/SortType";

type FilterState = {
  categoryId: number;
  currentPage: number;
  sort: SortType;
  searchQuery: string;
};

type Filters = {
  sort: SortType;
  categoryId: string;
  currentPage: string;
};

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchQuery: '',
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchQuery } =
  filterSlice.actions;
export default filterSlice.reducer;
