import type { ReactNode } from 'react';
import type { Policy } from '../model/type';

interface PolicyItemProps {
  item: Policy;
  icon: ReactNode;
}

export const PolicyItem = ({ item, icon }: PolicyItemProps) => (
  <div className="bg-white rounded-xl px-3 py-2.5 flex-row flex items-center gap-2.5">
    {icon}
    <div className="flex flex-col">
      <div className="font-normal text-sm">{item.name}</div>
      <div className="text-gray-600 text-xs">{item.description}</div>
    </div>
  </div>
);
