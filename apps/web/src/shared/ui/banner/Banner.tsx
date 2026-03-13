'use client';

import ChevronRightIcon from '@hotspot/ui/assets/icons/arrow-right.svg';
import { cn } from '@hotspot/ui/lib';
import Link from 'next/link';
import type { ReactNode } from 'react';

type BannerMeta =
  | {
      type: 'badge';
      label: string;
    }
  | {
      type: 'eyebrow';
      label: string;
    }
  | {
      type: 'iconText';
      label: string;
      icon: ReactNode;
    };

type BannerAction = {
  label: string;
  showChevron?: boolean;
};

interface BannerContentProps {
  title: string;
  description?: string;
  meta?: BannerMeta;
  action?: BannerAction;
  artwork?: ReactNode;
  className?: string;
}

type BannerBaseProps = BannerContentProps & {
  rootClassName?: string;
};

type BannerProps =
  | (BannerBaseProps & {
      href: string;
      onClick?: never;
    })
  | (BannerBaseProps & {
      href?: never;
      onClick: () => void;
    })
  | (BannerBaseProps & {
      href?: never;
      onClick?: never;
    });

const renderMeta = (meta?: BannerMeta) => {
  if (!meta) {
    return null;
  }

  if (meta.type === 'badge') {
    return (
      <span className="inline-flex w-fit rounded-md bg-white/90 px-2 py-1 text-[0.75rem] font-extrabold uppercase tracking-[0.02em] text-purple-700">
        {meta.label}
      </span>
    );
  }

  if (meta.type === 'iconText') {
    return (
      <div className="flex items-center gap-1.5 text-sm text-white/80">
        <span className="shrink-0">{meta.icon}</span>
        <span className="truncate">{meta.label}</span>
      </div>
    );
  }

  return (
    <p className="text-sm font-medium uppercase tracking-[0.03em] text-white/75">{meta.label}</p>
  );
};

const BannerContent = ({
  title,
  description,
  meta,
  action,
  artwork,
  className,
}: BannerContentProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2 overflow-hidden rounded-[8px] bg-red-400 p-4 text-white',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        {renderMeta(meta)}
        <div className="min-w-0">
          <h3 className="truncate text-[1rem] font-bold leading-[1.35]">{title}</h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm font-normal text-white/80">{description}</p>
          )}
          {action && (
            <div className="mt-1 flex items-center gap-1 text-base font-medium text-white/80">
              <span className="truncate">{action.label}</span>
              {action.showChevron !== false && (
                <ChevronRightIcon className="h-5 w-5 shrink-0 text-white/80" />
              )}
            </div>
          )}
        </div>
      </div>
      {artwork && <div className="shrink-0">{artwork}</div>}
    </div>
  );
};

export const Banner = ({ href, onClick, rootClassName, ...contentProps }: BannerProps) => {
  const composedClassName = cn('block w-full', rootClassName);

  if (href) {
    return (
      <Link className={composedClassName} href={href}>
        <BannerContent {...contentProps} />
      </Link>
    );
  }

  if (onClick) {
    return (
      <button className={composedClassName} onClick={onClick} type="button">
        <BannerContent {...contentProps} />
      </button>
    );
  }

  return (
    <div className={composedClassName}>
      <BannerContent {...contentProps} />
    </div>
  );
};

export type { BannerAction, BannerMeta, BannerProps };
