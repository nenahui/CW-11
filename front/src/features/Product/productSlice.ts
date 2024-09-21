import { createProduct, fetchCategories, fetchOneProduct, fetchProducts } from '@/features/Product/productThunks.ts';
import type { Category, Product } from '@/types.ts';
import { createSlice } from '@reduxjs/toolkit';

interface HomeState {
  products: Product[];
  categories: Category[];
  productsFetching: boolean;
  categoriesFetching: boolean;
  productCreating: boolean;
  oneProduct: Product | null;
  oneProductFetching: boolean;
}

const initialState: HomeState = {
  products: [],
  categories: [],
  productsFetching: false,
  categoriesFetching: false,
  productCreating: false,
  oneProduct: null,
  oneProductFetching: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
        state.products = products;
        state.productsFetching = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsFetching = false;
      });

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

    builder
      .addCase(createProduct.pending, (state) => {
        state.productCreating = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.productCreating = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.productCreating = false;
      });

    builder
      .addCase(fetchOneProduct.pending, (state) => {
        state.oneProductFetching = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, { payload: product }) => {
        state.oneProduct = product;
        state.oneProductFetching = false;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.oneProductFetching = false;
      });
  },
  selectors: {
    selectProducts: (state) => state.products,
    selectProductsFetching: (state) => state.productsFetching,
    selectProductsCategories: (state) => state.categories,
    selectProductsCategoriesFetching: (state) => state.categoriesFetching,
    selectProductCreating: (state) => state.productCreating,
    selectOneProduct: (state) => state.oneProduct,
    selectOneProductFetching: (state) => state.oneProductFetching,
  },
});

export const {
  selectProducts,
  selectProductsFetching,
  selectProductsCategoriesFetching,
  selectProductsCategories,
  selectProductCreating,
  selectOneProductFetching,
  selectOneProduct,
} = productSlice.selectors;
