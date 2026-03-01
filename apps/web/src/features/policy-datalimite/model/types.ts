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
export interface UpdatePolicy {
  temp: number;
}
export interface UpdateBlock {
  temp: number;
}

export type TotalDraft = Partial<UpdateDatalimit & UpdatePolicy & UpdateBlock>;
