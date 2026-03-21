'use client';

import RefreshIcon from '@hotspot/ui/assets/icons/refresh.svg';

interface RefreshButtonProps {
  onRefresh?: () => void;
}

export const RefreshButton = ({ onRefresh }: RefreshButtonProps) => {
  return (
    <button
      aria-label="데이터 새로고침"
      className="inline-flex h-24 w-24 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
      onClick={onRefresh}
      type="button"
    >
      <RefreshIcon className="w-24 h-24" />
    </button>
  );
};
