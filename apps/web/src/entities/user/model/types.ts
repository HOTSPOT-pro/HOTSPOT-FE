export type UserRole = 'OWNER' | 'PARENT' | 'CHILD';

export interface UserInfo {
  subId: number;
  familyId: number;
  name: string;
  email: string;
  phone: string;
  familyRole: UserRole;
}

export interface UserListItem {
  id: number | null;
  name: string | null;
}
