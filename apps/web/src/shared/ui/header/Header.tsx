import type * as React from 'react';

interface BaseHeaderProps {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

interface LogoHeaderProps extends BaseHeaderProps {
  variant: 'logo';
}

interface TitleHeaderProps extends BaseHeaderProps {
  variant: 'title';
  title: string;
}

export type HeaderProps = LogoHeaderProps | TitleHeaderProps;

export const Header = (props: HeaderProps) => {
  if (props.variant === 'logo') {
    return (
      <header className="flex h-12 w-full items-center justify-between bg-white px-2 py-1">
        <div className="flex items-center">{props.leftSlot}</div>
        <div className="flex items-center justify-end">{props.rightSlot}</div>
      </header>
    );
  }

  return (
    <header className="relative flex h-12 w-full items-center justify-between bg-white px-1">
      <div className="flex items-center">{props.leftSlot}</div>
      <h1 className="pointer-events-none absolute left-1/2 max-w-[calc(100%-6rem)] -translate-x-1/2 truncate whitespace-nowrap text-center">
        {props.title}
      </h1>
      <div className="flex items-center justify-end">{props.rightSlot}</div>
    </header>
  );
};
