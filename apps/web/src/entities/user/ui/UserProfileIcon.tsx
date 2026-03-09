import { cn } from '@hotspot/ui';
import ParentIcon from '@hotspot/ui/assets/images/character/main.svg';
import ChildIcon from '@hotspot/ui/assets/images/character/ViewDownColor.svg';
import OwnerIcon from '@hotspot/ui/assets/images/character/ViewRightColor.svg';
import type { UserRole } from '../model/types';

interface UserProfileIconProps {
  type: UserRole;
}
const ICON_STYLE = {
  CHILD: 'bg-green-100 text-lime-400',
  OWNER: 'bg-sky-100 text-sky-500',
  PARENT: 'bg-purple-100 text-purple-600',
};

export const UserProfileIcon = ({ type }: UserProfileIconProps) => {
  return (
    <div className={cn('p-2 rounded-2xl mr-3', ICON_STYLE[type])}>
      {type === 'OWNER' && <OwnerIcon className="w-10 h-10" />}
      {type === 'PARENT' && <ParentIcon className="w-10 h-10" />}
      {type === 'CHILD' && <ChildIcon className="w-10 h-10" />}
    </div>
  );
};
