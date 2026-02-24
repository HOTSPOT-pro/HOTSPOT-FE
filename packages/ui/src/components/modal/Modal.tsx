'use client';

import type * as React from 'react';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cssMerge';

type BtnLayout = 'vertical' | 'horizontal';
type ModalSize = 'default' | 'custom';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  custom: '',
  default: 'w-[18.375rem] md:w-[60%]',
};

const btnLayoutClasses: Record<BtnLayout, string> = {
  horizontal: 'flex flex-row items-center gap-2',
  vertical: 'flex flex-col gap-1',
};

const ModalRoot = forwardRef<HTMLDivElement, ModalProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex flex-col w-full h-fit bg-white rounded-[20px] pt-8 px-6 pb-4 gap-4',
          sizeClasses[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
ModalRoot.displayName = 'Modal';

const ModalHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn('flex flex-col gap-0.5', className)} ref={ref} {...props} />;
  },
);
ModalHeader.displayName = 'ModalHeader';

const ModalTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h2 className={cn('text-base font-semibold leading-snug', className)} ref={ref} {...props} />
    );
  },
);
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p className={cn('text-sm text-gray-500 leading-relaxed', className)} ref={ref} {...props} />
    );
  },
);
ModalDescription.displayName = 'ModalDescription';

const ModalContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn('flex flex-col', className)} ref={ref} {...props} />;
  },
);
ModalContent.displayName = 'ModalContent';

type ModalFooterProps = HTMLAttributes<HTMLDivElement> & {
  btnLayout?: BtnLayout;
  children?: React.ReactNode;
};

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, btnLayout = 'vertical', children, ...props }, ref) => {
    return (
      <div
        className={cn(
          btnLayoutClasses[btnLayout],
          btnLayout === 'horizontal' && '*:flex-1',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalFooter.displayName = 'ModalFooter';

export const Modal = Object.assign(ModalRoot, {
  Content: ModalContent,
  Description: ModalDescription,
  Footer: ModalFooter,
  Header: ModalHeader,
  Title: ModalTitle,
});
