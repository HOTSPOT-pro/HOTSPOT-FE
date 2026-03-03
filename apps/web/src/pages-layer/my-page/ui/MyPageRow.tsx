import ArrowRightIcon from '@hotspot/ui/assets/icons/arrow-right.svg';
import Link from 'next/link';
import type { MenuIcon } from '../model/constants';

interface MyPageRowProps {
  href: string;
  icon: MenuIcon;
  label: string;
  onClick?: () => void;
}

export const MyPageRow = ({ href, icon: Icon, label, onClick }: MyPageRowProps) => {
  return (
    <Link
      className="flex w-full items-center justify-between py-[1.125rem]"
      href={href}
      onClick={(event) => {
        if (!onClick) return;
        event.preventDefault();
        onClick();
      }}
    >
      <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 text-gray-900 shrink-0" />
        <span className="text-[0.875rem] font-semibold text-gray-900 leading-none">{label}</span>
      </div>
      <ArrowRightIcon className="h-6 w-6 text-gray-400 shrink-0" />
    </Link>
  );
};
