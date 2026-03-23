import { useQuery } from '@tanstack/react-query';
import { GIFT_KEYS } from '@/shared/constants/queryKey';
import { STALE_TIME } from '@/shared/constants/time';
import { getReceiveDataClient } from '../api/getReceivePresentLog';
import { getSendDataClient } from '../api/getSendPresentLog';
import type {
  PresentReceiveDetail,
  PresentReceiveResponse,
  PresentSendDetail,
  PresentSendResponse,
} from '../api/types';
import type { ReceiveItem, ReceivePresent, SendItem, SendPresent } from './types';

export const usePresentLog = () => {
  const sendLog = useQuery({
    queryFn: getSendDataClient,
    queryKey: GIFT_KEYS.sendLog,
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
    staleTime: STALE_TIME.NORMAL,
  });
  const receiveLog = useQuery({
    queryFn: getReceiveDataClient,
    queryKey: GIFT_KEYS.receiveLog,
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
    staleTime: STALE_TIME.NORMAL,
  });

  return { receiveLog: receiveLog.data, sendLog: sendLog.data };
};
