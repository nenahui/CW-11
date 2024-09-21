import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { API_URL } from '@/consts.ts';
import type { Product } from '@/types.ts';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className={'shadow-sm'}>
        <CardHeader className={'p-4 pb-0'}>
          <img
            className={'size-72 w-full object-cover rounded-xl'}
            src={`${API_URL}/${product.image}`}
            alt={product.title + ' image'}
          />
        </CardHeader>
        <Separator className={'my-4'} />
        <CardContent className={'p-4 pt-0 flex justify-between items-center'}>
          <div>
            <h4 className='font-medium leading-none capitalize'>{product.title}</h4>
            <p>{product.price}$</p>
          </div>

          <Button>Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};
