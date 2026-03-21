'use client';

import { useCurrentBlockedPoliciesStatus } from '@/domains/policy';
import { Banner } from '@/shared/ui';

const formatBlockedDescription = (isImmediateBlocked: boolean, policyNames: string[]) => {
  if (policyNames.length === 0) {
    return isImmediateBlocked ? '즉시 차단 정책이 적용 중입니다.' : '정책이 적용 중입니다.';
  }

  if (!isImmediateBlocked) {
    return `${policyNames.join(', ')}(이/가) 활성화되었습니다.`;
  }

  return `즉시 차단 정책, ${policyNames.join(', ')}(이/가) 활성화되었습니다.`;
};

export const BlockedPolicyBanner = () => {
  const { blockedStatus, isPending, isError } = useCurrentBlockedPoliciesStatus();

  if (isPending || isError || !blockedStatus?.isCurrentlyBlocked) {
    return null;
  }

  const policyNames = blockedStatus.blockedPolicies.map((policy) => policy.name);

  return (
    <Banner
      description={formatBlockedDescription(blockedStatus.isImmediateBlocked, policyNames)}
      rootClassName="w-full"
      title="데이터 사용 제한"
    />
  );
};
