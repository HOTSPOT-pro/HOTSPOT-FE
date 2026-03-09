//fmaily data
export type FAMILY_ROLE = 'OWNER' | 'PARENT' | 'CHILD';

//family list
export interface FamilyListRequest {
  page: number;
  size: number;
}
export interface FamilyList {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  familyList: FamilyItem[];
}
export interface FamilyItem {
  id: number;
  familyId: number;
  displayId: string;
  representativeName: string;
  phoneNumber: string;
  memberCount: number;
}

//family 상단
export interface FamilyDetail {
  familyId: number;
  displayId: string;
  representativeName: string;
  phoneNumber: string;
  memberCount: number;
}

//family 정책 적용 현황
export interface FamilyPolicy {
  subId: number;
  memberName: string;
  phoneNumber: string;
  familyRole: FAMILY_ROLE;
  blocked: boolean;
  appliedTimePolicies: string[];
  appliedBlockedServicePolicies: string[];
}
