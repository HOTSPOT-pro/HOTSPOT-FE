import { cn } from '@hotspot/ui/lib';
import type { UserRole } from '../model/types';

interface UserRoleLabelProps {
  role: UserRole;
}

const OWNER_STYLE = 'border-sky-300 text-sky-600';
const PARENT_STYLE = 'border-pink-300 text-pink-600';
const CHILD_STYLE = 'border-lime-300 text-lime-600';

export const UserRoleLabel = ({ role }: UserRoleLabelProps) => {
  const roleName = () => {
    switch (role) {
      case 'OWNER':
        return '대표';
      case 'PARENT':
        return '부모';
      case 'CHILD':
        return '자녀';
      default:
        return '알 수 없음';
    }
  };

  return (
    <span
      className={cn(
        'text-xs py-1 px-2 border-2 rounded-sm',
        role === 'OWNER' && OWNER_STYLE,
        role === 'PARENT' && PARENT_STYLE,
        role === 'CHILD' && CHILD_STYLE,
      )}
    >
      {roleName()}
    </span>
  );
};
