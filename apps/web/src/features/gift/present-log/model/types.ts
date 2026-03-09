export interface SendPresent {
  total: number;
  items: SendItem[];
}
export interface SendItem {
  subId: number;
  name: string;
  date: string;
  amount: number;
}

export interface ReceivePresent {
  total: number;
  items: ReceiveItem[];
}
export interface ReceiveItem {
  subId: number;
  name: string;
  date: string;
  amount: number;
}
