import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { Loader } from '@/components/loader/loader.tsx';
import { Button } from '@/components/ui/button.tsx';
import { API_URL } from '@/consts.ts';
import { selectOneProduct, selectOneProductFetching } from '@/features/Product/productSlice.ts';
import { fetchOneProduct } from '@/features/Product/productThunks.ts';
import { selectUser } from '@/features/users/usersSlice.ts';
import { TrashIcon } from '@radix-ui/react-icons';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OneProduct: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { productId } = useParams() as { productId: string };
  const product = useAppSelector(selectOneProduct);
  const loading = useAppSelector(selectOneProductFetching);

  useEffect(() => {
    dispatch(fetchOneProduct(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <Loader absoluteCenter className={'size-5 text-muted-foreground'} />;
  }

  if (!product) {
    return <p className={'a-center text-muted-foreground'}>Product not found</p>;
  }

  return (
    <div className={'flex flex-col gap-4 w-full'}>
      <div className={'flex gap-28 justify-center items-center'}>
        <div className={'flex flex-col'}>
          {user && user._id === product.user._id && (
            <Button className={'max-w-max mb-4'}>
              Delete Item <TrashIcon className={'size-5 ml-1'} />
            </Button>
          )}
          <small className={'text-lg text-muted-foreground font-light'}>{product.category.title}</small>
          <h2 className={'text-7xl mb-1 font-semibold capitalize'}>{product.title}</h2>
          <p className={'text-muted-foreground font-light text-3xl mb-3'}>{product.description}</p>
          <h3 className={'text-4xl font-medium'}>{product.price}$</h3>
        </div>

        <img className={'w-1/2 rounded-xl'} src={`${API_URL}/${product.image}`} alt={product.title + ' image'} />
      </div>
    </div>
  );
};
