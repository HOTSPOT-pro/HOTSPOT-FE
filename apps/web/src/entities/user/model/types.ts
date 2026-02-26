export type UserRole = 'OWNER' | 'PARENT' | 'CHILD';

export interface UserInfo {
  id: number;
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
