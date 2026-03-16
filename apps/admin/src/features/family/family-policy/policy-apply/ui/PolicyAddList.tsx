import { useMemberPolicy } from '@/domains/member-policy';
import type { PolicyApply } from '../model/types';
import { PolicyAddItem } from './PolicyAddItem';

interface PolicyAddListProps {
  familyId: number;
  subId: number;
  draft?: PolicyApply[];
  onUpdate: (payload: PolicyApply[]) => void;
}

export const PolicyAddList = ({ familyId, subId, draft, onUpdate }: PolicyAddListProps) => {
  const { userData, isLoading } = useMemberPolicy({
    familyId: familyId,
    subId: subId,
  });

  const currentItems = draft ?? userData?.appliedTimePolicies ?? [];
  const activeIds = currentItems.filter((p) => p.isActive).map((p) => p.policyId);

  const handleToggle = (policyId: number, checked: boolean) => {
    if (!userData) return;

    const nextIds = checked ? [...activeIds, policyId] : activeIds.filter((id) => id !== policyId);

    const nextPayload: PolicyApply[] = userData.appliedTimePolicies.map((item) => ({
      isActive: nextIds.includes(item.policyId),
      policyId: item.policyId,
    }));
    onUpdate(nextPayload);
  };

  if (isLoading) return <div className="p-40 text-center text-gray-400">Loading...</div>;

  const policies = userData?.appliedTimePolicies ?? [];

  return (
    <div className="max-h-100 overflow-y-auto py-16 flex flex-col gap-8">
      {policies.length === 0 ? (
        <p className="text-center text-gray-500 py-40">적용 가능한 정책이 없습니다.</p>
      ) : (
        policies.map((policy) => {
          return (
            <PolicyAddItem
              description={policy.policyDescription}
              id={policy.policyId}
              isApply={activeIds.includes(policy.policyId)}
              key={policy.policyId}
              name={policy.policyName}
              onToggle={(checked) => handleToggle(policy.policyId, checked)}
            />
          );
        })
      )}
    </div>
  );
};
