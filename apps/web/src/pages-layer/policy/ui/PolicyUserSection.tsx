import { type PolicyPerFamily, PolicyUserCard } from '@/domains/policy';

interface PolicyUserSectionProps {
  data: PolicyPerFamily;
}

export const PolicyUserSection = ({ data }: PolicyUserSectionProps) => {
  return (
    <div>
      {data.memberPolicies.map((i, index) => (
        <div key={i.memberId}>
          {index !== 0 && <div className="w-full h-px bg-gray-200" />}
          <PolicyUserCard data={i} familyId={data.familyId} />
        </div>
      ))}
    </div>
  );
};
