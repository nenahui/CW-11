import { Layout } from '@/components/layout/layout.tsx';
import { NewProduct } from '@/features/Product/newProduct.tsx';
import { OneProduct } from '@/features/Product/oneProduct.tsx';
import { Product } from '@/features/Product/product.tsx';
import { Login } from '@/features/users/login.tsx';
import { Register } from '@/features/users/register.tsx';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/register'} element={<Register />} />
      <Route
        path={'/*'}
        element={
          <Layout>
            <Routes>
              <Route path={'/'} element={<Product />} />
              <Route path={'/categories/:categoryId'} element={<Product />} />
              <Route path={'/new-product'} element={<NewProduct />} />
              <Route path={'/product/:productId'} element={<OneProduct />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};
