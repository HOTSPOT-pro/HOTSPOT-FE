import { Button, Card, useModal } from '@hotspot/ui';
import { useCallback } from 'react';
import type { GetFamilyCustomPolicy } from '../model/types';
import { useFamilyCustomPolicy } from '../model/useFamilyCustomPolicy';
import { useUpdatePolicyActive } from '../model/useUpdatePolicyActive';
import { FamilyPolicyItem } from './FamilyPolicyItem';

export const FamilyPolicyList = () => {
  const { data } = useFamilyCustomPolicy();
  const { open } = useModal();

  const handleOpenModal = useCallback(() => {
    open('addFamilyPolicyModal');
  }, [open]);

  const handleEdit = (policy: GetFamilyCustomPolicy) => {
    open('addFamilyPolicyModal', {
      props: { initialData: policy },
    });
  };

  const { mutate, isPending } = useUpdatePolicyActive();
  const handleTogglePolicy = (targetId: number) => {
    if (isPending) return;
    if (!data || data[0] === undefined) return;
    const nextActiveIdList = data.reduce<number[]>((acc, policy) => {
      const isTarget = policy.id === targetId;
      const willBeActive = isTarget ? !policy.isActive : policy.isActive;
      if (willBeActive) {
        acc.push(policy.id);
      }
      return acc;
    }, []);
    mutate({
      blockPolicyIdList: nextActiveIdList,
      familyId: data[0].familyId,
    });
  };

  if (!data) return <div>데이터가 없습니다.</div>;

  const activeCount = data.filter((policy) => policy.isActive).length;

  return (
    <Card>
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-base font-bold">우리 가족 정책</p>
          <p className="text-sm font-normal text-gray-600">{activeCount}개 정책 적용 중</p>
        </div>
        <Button className="w-fit px-8 py-4" onClick={handleOpenModal} variant="outline">
          정책 만들기
        </Button>
      </div>
      {data.length === 0 && (
        <div className="text-sm text-gray-500 text-center">적용된 데이터가 없습니다.</div>
      )}
      <div className="flex flex-col gap-8">
        {data.map((policy) => (
          <div key={policy.id}>
            <FamilyPolicyItem
              data={policy}
              onActiving={() => handleTogglePolicy(policy.id)}
              onEdit={() => handleEdit(policy)}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
