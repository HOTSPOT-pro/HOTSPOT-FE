import { useBlocked } from '@/entities/policy/model/usePolicy';
import type { BlockItem } from '../../member-info/model/types';
import type { BlockApply } from '../model/types';
import { BlockAddItem } from './BlockAddItem';

interface PolicyAddListProps {
  data: BlockItem[];
  draft: Partial<BlockApply>;
  onUpdate: (updates: Partial<BlockApply>) => void;
}

export const BlockAddList = ({ data, draft, onUpdate }: PolicyAddListProps) => {
  const { blockedList } = useBlocked({});

  const currentSelectedIds = draft.blockedServiceIdList ?? data.map((p) => p.policyId);

  const handleToggle = (policyId: number, checked: boolean) => {
    let nextIds: number[];
    if (checked) {
      const exists = blockedList?.some((b) => b.policyId === policyId);
      if (!exists) return;

      nextIds = currentSelectedIds.includes(policyId)
        ? currentSelectedIds
        : [...currentSelectedIds, policyId];
    } else {
      nextIds = currentSelectedIds.filter((id) => id !== policyId);
    }
    onUpdate({ blockedServiceIdList: nextIds });
  };

  return (
    <div className="max-h-100 overflow-y-auto py-4 flex flex-col gap-2">
      {blockedList?.map((block) => {
        const isApply = currentSelectedIds.includes(block.policyId);
        return (
          <BlockAddItem
            isApply={isApply}
            key={block.policyId}
            name={block.policyName}
            onToggle={(checked) => handleToggle(block.policyId, checked)}
          />
        );
      })}
    </div>
  );
};
