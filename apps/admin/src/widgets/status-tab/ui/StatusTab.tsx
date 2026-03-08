'use client';

import { Tab } from '@hotspot/ui';
import { STATUS_ITEMS } from '@/features/apply';
import type { ApplicationStatus } from '@/features/apply/api/types';

interface StatusTabProps {
  activeStatus: ApplicationStatus;
  onChange: (nextStatus: ApplicationStatus) => void;
}

export const StatusTab = ({ activeStatus, onChange }: StatusTabProps) => {
  return (
    <Tab
      activeValue={activeStatus}
      items={[...STATUS_ITEMS]}
      onTabChange={onChange}
      variant="segment"
    />
  );
};
