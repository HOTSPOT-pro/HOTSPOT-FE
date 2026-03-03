export interface Datalimit {
  subId: number;
  name: string;
  isLocked: boolean;
  dataLimit: number;
  familyDataAmount: number;
}

export interface UpdateDatalimit {
  dataLimit: number;
  isLocked: boolean;
}
