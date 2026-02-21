'use client';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/cssMerge';
import { Loading } from '../loading/Loading';

const BUTTON_BASE_STYLES =
  'w-full h-12 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0';

const BUTTON_VARIANT_STYLES = {
  destructive: 'bg-red-600 text-white hover:bg-red-800 disabled:bg-gray-300',
  ghost:
    'text-black bg-white border border-gray-300 hover:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300',
  outline:
    'bg-white border border-purple-600 text-purple-600 hover:border-purple-800 hover:text-purple-800 disabled:text-gray-300 disabled:border-gray-300',
  solid: 'bg-purple-600 text-white hover:bg-purple-800 disabled:bg-gray-300',
} as const;

type ButtonVariant = keyof typeof BUTTON_VARIANT_STYLES;

export const buttonVariants = ({
  className,
  variant = 'solid',
}: {
  className?: string;
  variant?: ButtonVariant;
}) => cn(BUTTON_BASE_STYLES, BUTTON_VARIANT_STYLES[variant], className);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading = false,
      type = 'button',
      variant = 'solid',
      onClick,
      ...rest
    },
    ref,
  ) => {
    const isAriaDisabled = disabled || isLoading;

    return (
      <button
        aria-busy={isLoading || undefined}
        aria-disabled={isAriaDisabled || undefined}
        className={cn(buttonVariants({ className, variant }), isLoading && 'pointer-events-none')}
        disabled={disabled}
        onClick={(e) => {
          if (isLoading) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          onClick?.(e);
        }}
        ref={ref}
        type={type}
        {...rest}
      >
        {isLoading ? <Loading /> : children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
