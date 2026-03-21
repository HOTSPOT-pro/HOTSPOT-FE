import RightArrowIcon from '@hotspot/ui/assets/icons/arrow-right.svg';
import { BlockedStateChip, type FamilyPolicy, RoleChip } from '@/domains/family';
import { PolicyChip } from './PolicyChip';

interface FamilyPolicyCardProps {
  member: FamilyPolicy;
  handleOpenModal: (member: FamilyPolicy) => void;
}

const POLICY_LABEL = 'font-body-body3 text-black';

export const FamilyPolicyCard = ({ member, handleOpenModal }: FamilyPolicyCardProps) => {
  return (
    <div
      className="px-16 py-14 rounded-xl border border-gray-200 gap-4 flex flex-col bg-white"
      key={member.subId}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-8 items-center">
          <span className="font-body-body2-bold">{member.memberName}</span>
          <RoleChip role={member.familyRole} />
          <BlockedStateChip isBlocked={member.blocked} />
        </div>

        <button
          aria-label={`${member.memberName} 정책 상세 열기`}
          onClick={() => handleOpenModal(member)}
          type="button"
        >
          <RightArrowIcon className="w-24 h-24 text-black" />
        </button>
      </div>

      {member.appliedTimePolicies.length !== 0 && (
        <>
          <p className={POLICY_LABEL}>적용된 시간대별 정책</p>
          <div className="flex flex-row gap-8">
            {member.appliedTimePolicies.map((i) => (
              <PolicyChip key={i} name={i} />
            ))}
          </div>
        </>
      )}

      {member.appliedBlockedServicePolicies.length !== 0 && (
        <>
          <p className={POLICY_LABEL}>적용된 차단 서비스 정책</p>
          <div className="flex flex-row gap-8">
            {member.appliedBlockedServicePolicies.map((i) => (
              <PolicyChip key={i} name={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
