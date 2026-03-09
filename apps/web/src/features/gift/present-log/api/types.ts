export interface PresentSendResponse {
  totalReceivedGb: number;
  items: PresentSendDetail[];
}
export interface PresentSendDetail {
  provideSubId: number;
  subName: string;
  amountGb: number;
  createdTime: string;
}

export interface PresentReceiveResponse {
  totalReceivedGb: number;
  items: PresentReceiveDetail[];
}
export interface PresentReceiveDetail {
  subId: number;
  subName: string;
  amountGb: number;
  createdTime: string;
}
