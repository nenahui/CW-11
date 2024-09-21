import type { RootState } from '@/app/store.ts';
import { axiosApi } from '@/axiosApi.ts';
import type { Category, Product, ProductMutation } from '@/types.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk<Product[], string | undefined>(
  'product/fetchProducts',
  async (categoryId) => {
    {
      const { data: products } = await axiosApi.get<Product[]>('/products', { params: { category: categoryId } });
      return products;
    }
  }
);

export const fetchCategories = createAsyncThunk<Category[]>('product/fetchCategories', async () => {
  {
    const { data: categories } = await axiosApi.get<Category[]>('/categories');

    return categories;
  }
});

export const createProduct = createAsyncThunk<void, ProductMutation, { state: RootState }>(
  'product/createProduct',
  async (productMutation, { getState }) => {
    {
      const token = getState().users.user?.token;

      if (!productMutation.image) {
        return console.error('No image provided');
      }

      const formData = new FormData();
      const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
      keys.forEach((key) => {
        const value = productMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post('/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
);

export const fetchOneProduct = createAsyncThunk<Product, string>('product/fetchOneProduct', async (id) => {
  {
    const { data: product } = await axiosApi.get<Product>(`/products/${id}`);

    return product;
  }
});

export const deleteProduct = createAsyncThunk<void, string, { state: RootState }>(
  'product/deleteProduct',
  async (id, { getState }) => {
    {
      const token = getState().users.user?.token;

      await axiosApi.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
);
