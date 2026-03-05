import Profile from '@hotspot/ui/assets/icons/user.svg';
import { cn } from '@hotspot/ui/lib';

interface UserProfileIconProps {
  type: 'MAIN' | 'OTHER';
}
const ICON_STYLE = {
  MAIN: 'bg-purple-100 text-purple-600',
  OTHER: 'bg-green-100 text-green-800',
};

export const UserProfileIcon = ({ type }: UserProfileIconProps) => {
  return (
    <div className={cn('p-3 rounded-2xl mr-3', ICON_STYLE[type])}>
      <Profile className="w-4.5 h-4.5" />
    </div>
  );
};
