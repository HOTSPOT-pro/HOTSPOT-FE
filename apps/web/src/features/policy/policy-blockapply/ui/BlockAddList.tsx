import { type BlockPolicy, useBlock } from '@domains/policy';
import type { BlockApply } from '../model/types';
import { BlockAddItem } from './BlockAddItem';

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

  if (!blockList || blockList.length === 0)
    return (
      <div className="p-16 text-center text-gray-400 font-medium">차단 가능 서비스가 없습니다.</div>
    );

  return (
    <div className="max-h-[250px] overflow-y-auto px-8 py-16 flex flex-col gap-8">
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
