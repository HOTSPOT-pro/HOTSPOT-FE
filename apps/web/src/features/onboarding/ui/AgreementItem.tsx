import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import Check from '@hotspot/ui/assets/icons/check.svg';
import { cn } from '@hotspot/ui/lib';
import Link from 'next/link';

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onCheck: () => void;
  href: string;
}

export const AgreementItem = ({ label, checked, onCheck, href }: AgreementItemProps) => (
  <label className="flex items-center justify-between cursor-pointer group">
    <input aria-checked={checked} className="peer sr-only" onClick={onCheck} type="checkbox" />
    <div className="flex items-center gap-4">
      <div
        className={cn(
          ' rounded-full w-fit h-fit p-1.5 border ',
          checked ? 'border-purple-600 bg-purple-600' : 'border-gray-200 bg-white',
        )}
      >
        <Check className="w-4 h-4 text-white" />
      </div>
      <span className={'py-2.5 text-sm text-black'}>{label}</span>
    </div>
    <Link href={href} target="_blank">
      <RightArrow className="w-6 h-6 text-gray-400" />
    </Link>
  </label>
);
