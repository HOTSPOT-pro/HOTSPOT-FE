import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '../../lib/cssMerge';

const CARD_BASE_STYLES = 'flex flex-col w-full bg-white p-4 gap-4 rounded-lg shadow-sm';
const CARD_TEXT_STYLES = 'text-black text-lg font-semibold';
const CARD_DESC_STYLES = 'text-gray-600 text-sm';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
  description?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ heading, description, children, className, ...props }, ref) => (
    <div className={cn(CARD_BASE_STYLES, className)} ref={ref} {...props}>
      {heading && <h2 className={CARD_TEXT_STYLES}>{heading}</h2>}
      {description && <p className={CARD_DESC_STYLES}>{description}</p>}
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

export { Card };
