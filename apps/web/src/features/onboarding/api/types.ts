import type { UserRole } from '@/domains/user/model/types';

export interface PostOnboardingRequest {
  phoneNumber: string;
  birthDate: string;
}

export interface PostOnboardingResponse {
  subId: number;
  familyId: number;
  name: string;
  email: string;
  phone: string;
  familyRole: UserRole;
}
