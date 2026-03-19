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
      <header className="flex h-fit w-full items-center justify-between bg-white px-8 py-4">
        <div className="flex items-center">{props.leftSlot}</div>
        <div className="flex items-center justify-end">{props.rightSlot}</div>
      </header>
    );
  }

  return (
    <header className="relative flex h-fit w-full items-center justify-between bg-white p-4">
      <div className="flex items-center">{props.leftSlot}</div>
      <h1 className="font-heading-heading2 pointer-events-none absolute left-1/2 max-w-[calc(100%-6rem)] -translate-x-1/2 truncate whitespace-nowrap text-center">
        {props.title}
      </h1>
      <div className="flex items-center justify-end">{props.rightSlot}</div>
    </header>
  );
};
