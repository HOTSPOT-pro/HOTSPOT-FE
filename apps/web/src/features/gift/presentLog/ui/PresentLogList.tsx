import { cn } from '@hotspot/ui';
import { formatDate } from '../lib/dateFormatter';
import type { ReceiveItem, SendItem } from '../model/types';
import { usePresentLog } from '../model/usePresentLog';

interface PresentSendLogListProps {
  type: 'SEND' | 'RECEIVE';
}

export const PresentLogList = ({ type }: PresentSendLogListProps) => {
  const { sendLog, receiveLog } = usePresentLog();
  const data = type === 'SEND' ? sendLog : receiveLog;

  const isSend = type === 'SEND';
  const themeTextColor = isSend ? 'text-purple-500' : 'text-green-800';
  const themeBgColor = isSend ? 'bg-purple-50' : 'bg-green-50';

  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[13px] font-bold">{isSend ? '보낸 선물 내역' : '받은 선물 내역'}</p>
      <p className="text-[11px] text-gray-500">
        총 {data.items.length}건의 선물을 {isSend ? '보냈습니다.' : '받았습니다.'}
      </p>
      <div
        className={cn(
          'flex flex-row justify-between px-4 py-3 rounded-2xl items-center mt-2',
          themeBgColor,
        )}
      >
        <span className="text-gray-500 text-[12px]">
          {isSend ? '총 선물한 데이터' : '총 받은 데이터'}
        </span>
        <span className={cn('font-bold text-[14px]', themeTextColor)}>
          {data.total.toFixed(1)}GB
        </span>
      </div>
      <div className="flex flex-col gap-2 py-3">
        {data.items.map((i, index) => (
          <PresentLogItem key={index} type={type} user={i} />
        ))}
      </div>
    </div>
  );
};

interface PresentLogItemProps {
  type: 'SEND' | 'RECEIVE';
  user: SendItem | ReceiveItem;
}

const PresentLogItem = ({ user, type }: PresentLogItemProps) => {
  const isSend = type === 'SEND';
  const amountColor = isSend ? 'text-purple-500' : 'text-green-800';

  return (
    <div className="bg-gray-100 px-4 py-3.5 flex flex-row justify-between items-center rounded-2xl">
      <div>
        <div>
          <span className="text-[14px] font-bold">{user.name}</span>
          <span className="text-[11px] text-gray-500">{isSend ? '님에게' : '님이 선물'}</span>
        </div>
        <p className="text-[11px] text-gray-500">{formatDate(user.date)}</p>
      </div>
      <p className={cn('text-[13px] font-bold', amountColor)}>
        {!isSend && '+'}
        {user.amount.toFixed(1)}GB
      </p>
    </div>
  );
};
