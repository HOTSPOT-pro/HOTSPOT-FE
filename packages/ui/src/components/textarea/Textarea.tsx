'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cssMerge';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  description?: string;
  error?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, error, description, className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col w-full group', containerClassName)}>
        <label className="text-sm font-medium text-text-normal transition-colors" htmlFor={id}>
          {label}
        </label>

        <div className="relative w-full border-b border-gray-200">
          <textarea
            {...props}
            className={cn(
              'peer w-full bg-transparent py-2 text-gray-900 outline-none transition-all resize-none min-h-20',
              'placeholder:text-gray-400 placeholder:text-xs placeholder:leading-relaxed',
              error ? 'border-red-500' : 'focus:border-transparent',
              className,
            )}
            id={id}
            ref={ref}
          />

          <span
            className={cn(
              'absolute -bottom-px left-0 h-px w-0 bg-purple-600 transition-all duration-300 group-focus-within:w-full',
              error && 'bg-red-500 w-full',
            )}
          />
        </div>

        {error ? <p className="mt-1.5 text-xs text-red-500">{error}</p> : null}
        {description ? (
          <p className="pt-2 text-xs font-normal text-gray-500">{description}</p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
