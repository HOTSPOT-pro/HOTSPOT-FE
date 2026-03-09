import { useQuery } from '@tanstack/react-query';
import { getReceiveDataClient } from '../api/getReceivePresentLog';
import { getSendDataClient } from '../api/getSendPresentLog';
import type {
  PresentReceiveDetail,
  PresentReceiveResponse,
  PresentSendDetail,
  PresentSendResponse,
} from '../api/types';
import type { ReceiveItem, ReceivePresent, SendItem, SendPresent } from './types';

const STALE_TIME = 600000; //10분

export const usePresentLog = () => {
  const sendLog = useQuery({
    queryFn: getSendDataClient,
    queryKey: ['presentSendLog'],
    select: (data: PresentSendResponse): SendPresent => {
      return {
        items: data.items.map(
          (item: PresentSendDetail): SendItem => ({
            amount: item.amountGb,
            date: item.createdTime,
            name: item.subName,
            subId: item.provideSubId,
          }),
        ),
        total: data.totalReceivedGb,
      };
    },
    staleTime: STALE_TIME,
  });
  const receiveLog = useQuery({
    queryFn: getReceiveDataClient,
    queryKey: ['presentReceiveLog'],
    select: (data: PresentReceiveResponse): ReceivePresent => {
      return {
        items: data.items.map(
          (item: PresentReceiveDetail): ReceiveItem => ({
            amount: item.amountGb,
            date: item.createdTime,
            name: item.subName,
            subId: item.subId,
          }),
        ),
        total: data.totalReceivedGb,
      };
    },
    staleTime: STALE_TIME,
  });

  return { receiveLog: receiveLog.data, sendLog: sendLog.data };
};
