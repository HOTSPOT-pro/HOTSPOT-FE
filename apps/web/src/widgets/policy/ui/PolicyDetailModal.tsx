import type { PolicyPerUser } from '@entities/policy';
import type { UpdateDatalimit } from '@features/policy-datalimite';
import { DataLimitSection, useDatalimit } from '@features/policy-datalimite';
import { Button, Modal, Tab, type TabItem, useModal } from '@hotspot/ui';
import { type ReactNode, useState } from 'react';
import { BlockAddList, PolicyAddList } from '@/features/policy-apply';
import type { PolicyApply } from '@/features/policy-apply/model/types';
import { useApplyPolicy } from '@/features/policy-apply/model/useApplyPolicy';
import type { BlockApply } from '@/features/policy-block/model/types';
import { useApplyBlock } from '@/features/policy-block/model/useApplyBlock';

type PolicyModalTabValue = 'DATA' | 'POLICY' | 'BLOCK';
const TABS: TabItem<PolicyModalTabValue>[] = [
  { label: '데이터 정책', value: 'DATA' },
  { label: '정책 설정', value: 'POLICY' },
  { label: '차단 설정', value: 'BLOCK' },
];

interface PolicyDetailModalProps {
  familyId: number;
  user: PolicyPerUser;
  icon: ReactNode;
  [key: string]: unknown;
}

type TotalDraft = Partial<UpdateDatalimit & PolicyApply & BlockApply>;

export const PolicyDetailModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const props = getProps<PolicyDetailModalProps>();
  const [activeTab, setActiveTab] = useState<PolicyModalTabValue>('DATA');

  const [draft, setDraft] = useState<TotalDraft>({});
  const handleUpdate = (updates: TotalDraft) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  // data limit
  const { datalimit, updateLockStatus, loading } = useDatalimit({
    familyId: props?.familyId as number,
    subId: props?.user.subId as number,
  });

  // policy
  const { updatePolicy } = useApplyPolicy({
    familyId: props?.familyId as number,
    subId: props?.user.subId as number,
  });

  // block
  const { updateBlock } = useApplyBlock({
    familyId: props?.familyId as number,
    subId: props?.user.subId as number,
  });

  const handleSave = async () => {
    if (!(props && datalimit)) return;

    const promises: Promise<unknown>[] = [];

    if (draft.dataLimit !== undefined || draft.isLocked !== undefined) {
      const dataLimitPayload: UpdateDatalimit = {
        dataLimit: draft.dataLimit ?? datalimit.dataLimit,
        isLocked: draft.isLocked ?? datalimit.isLocked,
      };
      promises.push(updateLockStatus.mutateAsync(dataLimitPayload));
    }

    if (draft.blockPolicyIdList) {
      const policyPayload: PolicyApply = {
        blockPolicyIdList: draft.blockPolicyIdList,
      };
      promises.push(updatePolicy.mutateAsync(policyPayload));
    }

    if (draft.blockedServiceIdList) {
      const blockPayload: BlockApply = {
        blockedServiceIdList: draft.blockedServiceIdList,
      };
      promises.push(updateBlock.mutateAsync(blockPayload));
    }

    try {
      await Promise.all(promises);
      close();
    } catch (error) {
      console.error('일부 업데이트 실패:', error);
    }
  };

  if (!props || typeof props.familyId !== 'number' || !props.user?.subId) {
    return <Modal.Content>데이터를 불러올 수 없습니다.</Modal.Content>;
  }

  return (
    <div>
      <Modal className="w-100">
        <Modal.Header>
          <Modal.Title>
            <div className="flex items-center gap-1">
              {props?.icon}
              {props?.user.memberName}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Content>
          <Tab<PolicyModalTabValue>
            activeValue={activeTab}
            items={TABS}
            onTabChange={setActiveTab}
            variant="underline"
          />
          {activeTab === 'DATA' && (
            <DataLimitSection datalimit={datalimit} draft={draft} onUpdate={handleUpdate} />
          )}
          {activeTab === 'POLICY' && (
            <PolicyAddList
              data={props?.user.blockPolicyResponseList ?? []}
              draft={draft}
              onUpdate={(ids) => handleUpdate({ blockPolicyIdList: ids })}
            />
          )}
          {activeTab === 'BLOCK' && (
            <BlockAddList
              data={props?.user.appBlockedServiceResponseList ?? []}
              draft={draft}
              onUpdate={handleUpdate}
            />
          )}
        </Modal.Content>
        <Modal.Footer>
          <Button isLoading={loading} onClick={handleSave}>
            저장
          </Button>
          <Button onClick={close} variant="ghost">
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
