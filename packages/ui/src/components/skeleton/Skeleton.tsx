'use client';

import { cn } from '@hotspot/ui';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ className, variant = 'rect', width, height }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variant === 'circle' && 'rounded-full',
        variant === 'rect' && 'rounded-md',
        variant === 'text' && 'rounded h-3 w-full',
        className,
      )}
      style={{ height, width }}
    />
  );
};
