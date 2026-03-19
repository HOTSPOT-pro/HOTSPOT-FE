import { SelectField } from '@hotspot/ui';
import type { MenuIcon } from '../model/constants';

interface MyPageRowProps {
  icon: MenuIcon;
  label: string;
  onClick: () => void;
}

export const MyPageRow = ({ icon: Icon, label, onClick }: MyPageRowProps) => {
  return (
    <SelectField
      className="h-[3.625rem]"
      heading={label}
      leftSlot={<Icon className="h-20 w-20 text-gray-900 shrink-0" />}
      onClick={onClick}
    />
  );
};
