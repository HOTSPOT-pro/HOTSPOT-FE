import MainIcon from '@hotspot/ui/assets/images/character/main.svg';
import { cn } from '@hotspot/ui/lib';

const SIZES = {
  lg: 'w-29 h-29 rounded-3xl',
  md: 'w-20 h-20 rounded-2xl',
  sm: 'w-13 h-13 rounded-xl',
} as const;
interface LogoProps {
  size: keyof typeof SIZES;
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <div className={cn('flex justify-center items-center bg-purple-800 shrink-0', SIZES[size])}>
      <MainIcon className="w-3/5 h-3/5" />
    </div>
  );
};
