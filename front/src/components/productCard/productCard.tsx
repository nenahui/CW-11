import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import React from 'react';

export const ProductCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className={'p-4 pb-0'}>
        <img
          className={'size-72 w-full object-cover rounded-xl'}
          src='https://i.pinimg.com/736x/19/cc/ca/19ccca8a6b16e1ee5f782bb2bebebab9.jpg'
          alt='product'
        />
      </CardHeader>
      <Separator className={'my-4'} />
      <CardContent className={'p-4 pt-0 flex justify-between items-center'}>
        <div>
          <h4 className='font-medium leading-none'>Product Name</h4>
          <p>1200$</p>
        </div>

        <Button>Buy</Button>
      </CardContent>
    </Card>
  );
};
