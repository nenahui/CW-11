import { axiosApi } from '@/axiosApi.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const { data: categories } = await axiosApi.get('/categories');

  return categories;
});
