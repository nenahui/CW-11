import { useAppSelector } from '@/app/hooks.ts';
import { selectUser } from '@/features/users/usersSlice.ts';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const MainNav = () => {
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();

  return (
    <div className='flex'>
      <Link to='/' className='mr-4 flex items-center space-x-2'>
        <img src={'/logo.png'} className='h-6 w-6' alt={'kana.kg logo'} />
        <span className='font-medium'>kana.kg</span>
      </Link>
      <nav className='flex items-center gap-4 text-sm'>
        {user && (
          <>
            <Link
              to='/'
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              Home
            </Link>
            <Link
              to='/new-product'
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/new-product' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              New Product
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
