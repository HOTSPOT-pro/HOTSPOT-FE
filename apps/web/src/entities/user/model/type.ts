export interface UserAuth {
  userId: number | null;
  userName: string | null;
  accessToken: string | null;
}

export interface OnboardingInfo {
  birth: string;
  tel: string;
}
