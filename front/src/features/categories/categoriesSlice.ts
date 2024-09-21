import { fetchCategories } from '@/features/categories/categoriesThunks.ts';
import type { Category } from '@/types.ts';
import { createSlice } from '@reduxjs/toolkit';

interface CategoriesState {
  categories: Category[];
  categoriesFetching: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  categoriesFetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.categories = categories;
        state.categoriesFetching = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesFetching = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectCategoriesFetching: (state) => state.categoriesFetching,
  },
});

export const { selectCategories, selectCategoriesFetching } = categoriesSlice.selectors;
