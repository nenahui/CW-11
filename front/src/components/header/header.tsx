import { MainNav } from '@/components/header/mainNav/mainNav.tsx';
import { Button } from '@/components/ui/button';
import { PhoneCall, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <MainNav />
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <nav className='flex items-center gap-2'>
            <Link to={'/'}>
              <Button size={'sm'} variant={'ghost'} className={'flex gap-1'}>
                Войти
                <User className={'size-4'} />
              </Button>
            </Link>

            <Link to={'/'}>
              <Button size={'sm'} variant={'default'} className={'flex gap-1'}>
                Связаться
                <PhoneCall className={'size-4'} strokeWidth={1.6} />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
