export interface GetDatalimitResponse {
  name: string;
  isLocked: boolean;
  dataLimit: number;
  familyDataAmount: number;
}

export interface PatchDatalimitRequest {
  familyId: number;
  subId: number;
  dataLimit: number;
  isLocked: boolean;
}
