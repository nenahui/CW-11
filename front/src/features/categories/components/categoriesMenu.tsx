import { AllIc } from '@/assets/all.tsx';
import { LaptopIc } from '@/assets/laptop.tsx';
import { PhoneIc } from '@/assets/phone.tsx';
import { WatchIc } from '@/assets/watch.tsx';
import { Button } from '@/components/ui/button.tsx';
import React from 'react';

export const CategoriesMenu: React.FC = () => {
  const categories = [
    {
      title: 'All',
      icon: <AllIc className={'size-5'} />,
    },
    {
      title: 'iPhone',
      icon: <PhoneIc className={'size-5'} />,
    },
    {
      title: 'Macbook',
      icon: <LaptopIc className={'size-5'} />,
    },
    {
      title: 'Apple Watch',
      icon: <WatchIc className={'size-5'} />,
    },
  ];
  return (
    <div className={'flex flex-col gap-2'}>
      {categories.map((category) => (
        <Button key={category.title} variant={'ghost'} className={'hover:bg-gray-100 justify-start w-52'}>
          {category.icon} <h4 className={'text-sm ml-1'}>{category.title}</h4>
        </Button>
      ))}
    </div>
  );
};
