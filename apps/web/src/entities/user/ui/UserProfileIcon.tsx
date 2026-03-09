import { cn } from '@hotspot/ui';
import ParentIcon from '@hotspot/ui/assets/images/character/main.svg';
import ChildIcon from '@hotspot/ui/assets/images/character/ViewDownColor.svg';
import OwnerIcon from '@hotspot/ui/assets/images/character/ViewRightColor.svg';
import type { ReactElement } from 'react';
import type { UserRole } from '../model/types';

interface UserProfileIconProps {
  type: UserRole;
}
const ICON_STYLE = {
  CHILD: 'bg-green-100 text-lime-400',
  OWNER: 'bg-sky-100 text-sky-500',
  PARENT: 'bg-purple-100 text-purple-600',
};

const ICON_COMPONENTS: Record<UserRole, ReactElement> = {
  CHILD: <ChildIcon className="w-10 h-10" />,
  OWNER: <OwnerIcon className="w-10 h-10" />,
  PARENT: <ParentIcon className="w-10 h-10" />,
};

export const UserProfileIcon = ({ type }: UserProfileIconProps) => {
  return (
    <div className={cn('p-2 rounded-2xl mr-3', ICON_STYLE[type])}>{ICON_COMPONENTS[type]}</div>
  );
};
