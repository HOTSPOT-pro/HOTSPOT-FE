import Main from '@hotspot/ui/assets/images/character/main.svg';
import { cn } from 'node_modules/@hotspot/ui/src/lib/cssMerge';

const SIZES = {
  lg: 'w-30 h-30 rounded-3xl',
  md: 'w-20 h-20 rounded-2xl',
  sm: 'w-13 h-13 rounded-xl',
} as const;
interface LogoProps {
  size: keyof typeof SIZES;
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <div className={cn('flex justify-center items-center bg-purple-800 shrink-0', SIZES[size])}>
      <Main className="w-3/5 h-3/5" />
    </div>
  );
};
