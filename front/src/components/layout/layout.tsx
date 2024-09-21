import { Header } from '@/components/header/header.tsx';
import { CategoriesMenu } from '@/features/categories/components/categoriesMenu.tsx';
import React, { type PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'container mx-auto'}>
      <Header />
      <div className={'flex justify-between'}>
        <CategoriesMenu />
        {children}
      </div>
    </div>
  );
};
