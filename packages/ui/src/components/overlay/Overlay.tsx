// components/common/Overlay.tsx
'use client';

import { cn } from '../../lib/cssMerge';

interface OverlayProps {
  isVisible: boolean;
  onClick?: () => void;
  className?: string;
}

export const Overlay = ({ isVisible, onClick, className }: OverlayProps) => {
  return (
    <button
      className={cn(
        'dim-overlay fixed inset-0 max-w-[500px] mx-auto z-overlay transition-opacity duration-300 ease-in-out',
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        className,
      )}
      onClick={onClick}
      type="button"
    ></button>
  );
};
