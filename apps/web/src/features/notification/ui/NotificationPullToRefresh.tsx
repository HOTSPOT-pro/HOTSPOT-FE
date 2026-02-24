import { Loading } from '@hotspot/ui';
import type { ReactNode } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

interface Props {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

export const NotificationPullToRefresh = ({ onRefresh, children }: Props) => {
  return (
    <PullToRefresh
      onRefresh={onRefresh}
      refreshingContent={
        <div className="w-full py-4 flex justify-center text-gray-500">
          <Loading />
        </div>
      }
    >
      {children}
    </PullToRefresh>
  );
};
