import { type BlockPolicy, useBlock } from '@entities/policy';
import { BlockAddItem } from '@entities/policy-add';
import type { BlockApply } from '../model/types';

interface PolicyAddListProps {
  data: BlockPolicy[];
  draft: Partial<BlockApply>;
  onUpdate: (updates: Partial<BlockApply>) => void;
}

export const BlockAddList = ({ data, draft, onUpdate }: PolicyAddListProps) => {
  const { blockList } = useBlock();

  const currentSelectedIds = draft.blockedServiceIdList ?? data.map((p) => p.id);

  const handleToggle = (policyId: number, checked: boolean) => {
    let nextIds: number[];
    if (checked) {
      const exists = blockList?.some((b) => b.id === policyId);
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
      {blockList?.map((block) => {
        const isApply = currentSelectedIds.includes(block.id);
        return (
          <BlockAddItem
            isApply={isApply}
            key={block.id}
            name={block.name}
            onToggle={(checked) => handleToggle(block.id, checked)}
          />
        );
      })}
    </div>
  );
};
