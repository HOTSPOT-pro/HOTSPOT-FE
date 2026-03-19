import { useMemberBlock } from '@/domains/member-policy';
import type { PolicyApply } from '../model/types';
import { BlockAddItem } from './BlockAddItem';

interface PolicyAddListProps {
  familyId: number;
  subId: number;
  draft?: PolicyApply[];
  onUpdate: (updates: PolicyApply[]) => void;
}

export const BlockAddList = ({ familyId, subId, draft, onUpdate }: PolicyAddListProps) => {
  const { userData, isLoading } = useMemberBlock({ familyId, subId });

  const currentItems = draft ?? userData?.appliedBlockedServicePolicies ?? [];
  const activeIds = currentItems.filter((p) => p.isActive).map((p) => p.policyId);

  const handleToggle = (policyId: number, checked: boolean) => {
    if (!userData) return;

    const nextIds = checked ? [...activeIds, policyId] : activeIds.filter((id) => id !== policyId);

    const nextPayload: PolicyApply[] = userData.appliedBlockedServicePolicies.map((item) => ({
      isActive: nextIds.includes(item.policyId),
      policyId: item.policyId,
    }));
    onUpdate(nextPayload);
  };

  if (isLoading) return <div className="p-40 text-center text-gray-400">Loading...</div>;

  const policies = userData?.appliedBlockedServicePolicies ?? [];

  return (
    <div className="max-h-100 overflow-y-auto py-16 flex flex-col gap-8">
      {policies.map((block) => {
        return (
          <BlockAddItem
            isApply={activeIds.includes(block.policyId)}
            key={block.policyId}
            name={block.policyName}
            onToggle={(checked) => handleToggle(block.policyId, checked)}
          />
        );
      })}
    </div>
  );
};
