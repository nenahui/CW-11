import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { Loader } from '@/components/loader/loader.tsx';
import { ProductCard } from '@/components/productCard/productCard.tsx';
import { selectCategories, selectCategoriesFetching } from '@/features/categories/categoriesSlice.ts';
import { fetchCategories } from '@/features/categories/categoriesThunks.ts';
import { CategoriesMenu } from '@/features/categories/components/categoriesMenu.tsx';
import { selectProducts, selectProductsFetching } from '@/features/Product/productSlice.ts';
import { fetchProducts } from '@/features/Product/productThunks.ts';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Product: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const productsFetching = useAppSelector(selectProductsFetching);
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(categoryId));
  }, [dispatch, categoryId]);

  if (productsFetching || categoriesFetching) {
    return <Loader absoluteCenter className={'size-5 text-muted-foreground'} />;
  }

  return (
    <div className={'flex justify-between gap-6 w-full'}>
      <CategoriesMenu categories={categories} loading={categoriesFetching} />
      <div className={'pl-10 border-l w-full'}>
        <div className={'grid grid-cols-3 shrink-0 gap-4 rounded-xl'}>
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <span className={'text-muted-foreground text-sm a-center fixed'}>No products available</span>
          )}
        </div>
      </div>
    </div>
  );
};
