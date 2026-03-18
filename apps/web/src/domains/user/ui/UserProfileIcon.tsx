import { cn } from '@hotspot/ui';
import ChildIcon from '@hotspot/ui/assets/images/character/child.svg';
import OwnerIcon from '@hotspot/ui/assets/images/character/owner.svg';
import ParentIcon from '@hotspot/ui/assets/images/character/parent.svg';
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
  CHILD: <ChildIcon className="w-40 h-40" />,
  OWNER: <OwnerIcon className="w-40 h-40" />,
  PARENT: <ParentIcon className="w-40 h-40" />,
};

export const UserProfileIcon = ({ type }: UserProfileIconProps) => {
  return <div className={cn('p-8 rounded-2xl', ICON_STYLE[type])}>{ICON_COMPONENTS[type]}</div>;
};
