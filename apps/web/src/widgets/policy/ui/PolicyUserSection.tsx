import { type PolicyPerFamily, PolicyUserCard } from '@/entities/policy';

interface PolicyUserSectionProps {
  data: PolicyPerFamily;
}

export const PolicyUserSection = ({ data }: PolicyUserSectionProps) => {
  return (
    <div>
      {data.memberPolicies.map((i, index) => (
        <div key={i.memberId}>
          {index !== 0 && <div className="w-full h-[0.5px] bg-gray-200" />}
          <PolicyUserCard data={i} />
        </div>
      ))}
    </div>
  );
};
