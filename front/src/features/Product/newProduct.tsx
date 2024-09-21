import { useAppDispatch } from '@/app/hooks.ts';
import { NewProductForm } from '@/features/Product/components/newProductForm/newProductForm.tsx';
import { createProduct } from '@/features/Product/productThunks.ts';
import type { ProductMutation } from '@/types.ts';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState: ProductMutation = {
  title: '',
  description: '',
  image: null,
  category: '',
  price: '',
};

export const NewProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [productMutation, setProductMutation] = useState<ProductMutation>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    setProductMutation((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));

    if (id === 'image' && !files) {
      setProductMutation((prev) => ({
        ...prev,
        image: null,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    const value = files && files[0] ? files[0] : null;

    setProductMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setProductMutation((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createProduct(productMutation)).unwrap();
    setProductMutation(initialState);
    navigate('/');
  };

  return (
    <div className={'w-full mx-auto'}>
      <NewProductForm
        productMutation={productMutation}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
        handleImageChange={handleImageChange}
      />
    </div>
  );
};
