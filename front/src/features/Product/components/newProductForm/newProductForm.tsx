import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { Loader } from '@/components/loader/loader.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea.tsx';
import { selectProductsCategories, selectProductsCategoriesFetching } from '@/features/Product/productSlice.ts';
import { fetchCategories } from '@/features/Product/productThunks.ts';
import type { ProductMutation } from '@/types.ts';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  productMutation: ProductMutation;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (value: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const NewProductForm: React.FC<Props> = ({
  productMutation,
  handleChange,
  handleSelectChange,
  handleImageChange,
  handleSubmit,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectProductsCategories);
  const categoriesFetching = useAppSelector(selectProductsCategoriesFetching);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const validateForm = () => {
    const newErrors: { [key: string]: boolean } = {};
    if (!productMutation.title) newErrors.title = true;
    if (!productMutation.description) newErrors.description = true;
    if (!productMutation.price || productMutation.price.includes('-')) {
      newErrors.price = true;
      toast.error('Price must be a positive number');
    }
    if (!productMutation.image) newErrors.image = true;
    if (!productMutation.category) newErrors.category = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      handleSubmit(e);
    }
  };

  if (categoriesFetching) {
    return <Loader absoluteCenter className={'size-5 text-muted-foreground'} />;
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={'flex flex-col gap-2.5'}>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='title'>Title</Label>
          <Input
            id='title'
            placeholder='Enter item title'
            value={productMutation.title}
            onChange={handleChange}
            className={errors.title ? 'ring-1 ring-red-600' : ''}
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            placeholder='Enter item description'
            rows={5}
            value={productMutation.description}
            onChange={handleChange}
            className={errors.description ? 'ring-1 ring-red-600' : ''}
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='price'>Price</Label>
          <Input
            type={'number'}
            id='price'
            onChange={handleChange}
            className={errors.price ? 'ring-1 ring-red-600' : ''}
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='image'>Image</Label>
          <Input
            type={'file'}
            id='image'
            onChange={handleImageChange}
            className={errors.image ? 'ring-1 ring-red-600' : ''}
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='category'>Category</Label>
          <Select
            name={'category'}
            defaultValue={''}
            value={productMutation.category}
            onValueChange={handleSelectChange}
            required={true}
          >
            <SelectTrigger id={'category'} className={errors.category ? 'ring-1 ring-red-600' : ''}>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type={'submit'}>Create</Button>
      </div>
    </form>
  );
};
