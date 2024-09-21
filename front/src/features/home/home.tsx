import { ProductCard } from '@/components/productCard/productCard.tsx';
import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className={'grid grid-cols-3 gap-4 w-full rounded-xl'}>
      <ProductCard />
    </div>
  );
};
