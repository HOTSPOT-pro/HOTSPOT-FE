import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/cssMerge';

const CARD_BASE_STYLES = 'flex flex-col w-full p-4 gap-4 bg-white rounded-lg shadow-sm';
const CARD_HEADER_STYLES = 'flex flex-col';
const CARD_TITLE_STYLES = 'text-black text-lg font-semibold';
const CARD_DESC_STYLES = 'text-gray-600 text-sm';
const CARD_CONTENT_STYLES = 'w-full';
const CARD_FOOTER_STYLES = 'w-full';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(CARD_BASE_STYLES, className)} ref={ref} {...props} />
  ),
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(CARD_HEADER_STYLES, className)} ref={ref} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 className={cn(CARD_TITLE_STYLES, className)} ref={ref} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p className={cn(CARD_DESC_STYLES, className)} ref={ref} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(CARD_CONTENT_STYLES, className)} ref={ref} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn(CARD_FOOTER_STYLES, className)} ref={ref} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
