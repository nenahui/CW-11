import { AllIc } from '@/assets/all.tsx';
import { LaptopIc } from '@/assets/laptop.tsx';
import { PhoneIc } from '@/assets/phone.tsx';
import { WatchIc } from '@/assets/watch.tsx';
import { Loader } from '@/components/loader/loader.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { Category } from '@/types.ts';
import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

interface Props {
  categories: Category[];
  loading: boolean;
}

export const CategoriesMenu: React.FC<Props> = ({ categories, loading }) => {
  const { categoryId } = useParams();

  const icon = (title: string) => {
    switch (title) {
      case 'iPhone':
        return <PhoneIc className={'size-5'} />;
      case 'Macbook':
        return <LaptopIc className={'size-5'} />;
      case 'Apple Watch':
        return <WatchIc className={'size-5'} />;
      default:
        return <AllIc className={'size-5'} />;
    }
  };

  return (
    <div className={'flex flex-col gap-2 w-[320px] relative'}>
      {loading ? (
        <Loader className={'mx-auto mt-10 text-muted-foreground size-5'} />
      ) : (
        <>
          <Link to={'/'}>
            <Button
              variant={'ghost'}
              className={`hover:bg-gray-100 ${!categoryId && 'bg-gray-100'} justify-start w-52`}
            >
              {icon('all')} <h4 className={'text-sm ml-1'}>All</h4>
            </Button>
          </Link>
          {categories.map((category) => (
            <NavLink key={category._id} to={`/categories/${category._id}`}>
              <Button variant={'ghost'} className={'hover:bg-gray-100 justify-start w-52'}>
                {icon(category.title)} <h4 className={'text-sm ml-1'}>{category.title}</h4>
              </Button>
            </NavLink>
          ))}
        </>
      )}
    </div>
  );
};
