import type { ReactNode } from 'react';
import type { Block, Policy } from '../model/types';

interface PolicyItemProps {
  item: Policy | Block;
  icon: ReactNode;
  description?: string;
}

export const PolicyItem = ({ item, icon, description }: PolicyItemProps) => (
  <div className="bg-white rounded-xl px-3 py-2.5 flex-row flex items-center gap-2.5">
    {icon}
    <div className="flex flex-col">
      <div className="font-normal text-sm">{item.name}</div>
      <div className="text-gray-600 text-xs">{description ?? null}</div>
    </div>
  </div>
);
