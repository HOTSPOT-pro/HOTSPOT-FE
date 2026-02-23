import { PolicyUserCard } from '@/entities/policy';
import { usePolicy } from '@/entities/policy/api/usePolicy';

export const PolicyPage = () => {
  const { data, loading } = usePolicy();

  if (loading) return '로딩중';

  return (
    <div>
      {data.map((i) => (
        <PolicyUserCard
          blockServices={i.blockServices}
          id={i.id}
          limit={i.limit}
          name={i.name}
          policyList={i.policyList}
        />
      ))}
    </div>
  );
};
