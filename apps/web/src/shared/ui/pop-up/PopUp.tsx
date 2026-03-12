'use client';

import { cn } from '@hotspot/ui/lib';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

const POPUP_BASE_STYLES =
  'flex w-full flex-col gap-2 rounded-[8px] bg-white p-2 items-center justify-center';
const POPUP_HEADER_STYLES = 'flex flex-col gap-0.5 items-center justify-center';
const POPUP_TITLE_STYLES = 'text-base font-semibold leading-snug text-black';
const POPUP_DESC_STYLES = 'text-sm leading-relaxed text-gray-500';
const POPUP_CONTENT_STYLES = 'flex flex-col items-center justify-center';
const POPUP_FOOTER_STYLES = 'flex flex-col gap-1 items-center justify-center';

const PopUp = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(POPUP_BASE_STYLES, className)} ref={ref} {...props} />
  ),
);
PopUp.displayName = 'PopUp';

const PopUpHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(POPUP_HEADER_STYLES, className)} ref={ref} {...props} />
  ),
);
PopUpHeader.displayName = 'PopUpHeader';

const PopUpTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 className={cn(POPUP_TITLE_STYLES, className)} ref={ref} {...props} />
  ),
);
PopUpTitle.displayName = 'PopUpTitle';

const PopUpDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p className={cn(POPUP_DESC_STYLES, className)} ref={ref} {...props} />
  ),
);
PopUpDescription.displayName = 'PopUpDescription';

const PopUpContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(POPUP_CONTENT_STYLES, className)} ref={ref} {...props} />
  ),
);
PopUpContent.displayName = 'PopUpContent';

const PopUpFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(POPUP_FOOTER_STYLES, className)} ref={ref} {...props} />
  ),
);
PopUpFooter.displayName = 'PopUpFooter';

export { PopUp, PopUpContent, PopUpDescription, PopUpFooter, PopUpHeader, PopUpTitle };
