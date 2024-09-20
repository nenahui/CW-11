import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const MainNav = () => {
  const { pathname } = useLocation();

  return (
    <div className='flex'>
      <Link to='/' className='mr-4 flex items-center space-x-2'>
        <img src={'./logo.png'} className='h-6 w-6' alt={'kana.kg logo'} />
        <span className='font-medium'>kana.kg</span>
      </Link>
      <nav className='flex items-center gap-4 text-sm'>
        <Link
          to='/'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Главная
        </Link>
        <Link
          to='/news'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/news' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Новости
        </Link>
        <Link
          to='/events'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/events' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Мероприятия
        </Link>
        <Link
          to='/pollution-map'
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/pollution-map' ? 'text-foreground' : 'text-foreground/60'
          )}
        >
          Карта
        </Link>
      </nav>
    </div>
  );
};
