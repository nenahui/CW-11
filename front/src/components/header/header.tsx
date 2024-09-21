import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { MainNav } from '@/components/header/mainNav/mainNav.tsx';
import { UserNav } from '@/components/header/userNav/userNav.tsx';
import { Button } from '@/components/ui/button';
import { selectUser } from '@/features/users/usersSlice.ts';
import { logout } from '@/features/users/usersThunks.ts';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className='sticky top-0 z-50 mb-4 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center justify-between'>
        <MainNav />

        <nav className='flex items-center gap-2'>
          {user ? (
            <UserNav user={user} handleLogout={handleLogout} />
          ) : (
            <>
              <Link to={'/login'}>
                <Button size={'sm'} variant={'ghost'} className={'flex gap-1'}>
                  Login
                </Button>
              </Link>
              <Link to={'/login'}>
                <Button size={'sm'} className={'flex gap-1'}>
                  Sign Up
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-4'>
                    <path d='M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z' />
                  </svg>
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
