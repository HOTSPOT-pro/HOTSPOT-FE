export interface UserAuth {
  userId: number | null;
  userName: string | null;
  accessToken: string | null;
}

export interface OnboardingInput {
  birth: string;
  tel: string;
}
