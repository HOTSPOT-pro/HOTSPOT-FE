import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/cssMerge';

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
      ...props
    },
    ref,
  ) => {
    return (
      <button
        aria-busy={isLoading}
        className={buttonVariants({ className, variant })}
        disabled={disabled}
        ref={ref}
        type={type}
        {...props}
      >
        {isLoading ? (
          <svg aria-hidden="true" className="!h-7 !w-7 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              fill="none"
              r="9"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              className="opacity-90"
              d="M21 12a9 9 0 0 0-9-9"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
          </svg>
        ) : (
          <span>{children}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
