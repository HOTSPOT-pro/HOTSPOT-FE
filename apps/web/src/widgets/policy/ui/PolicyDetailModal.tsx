import type { PolicyPerUser } from '@entities/policy';
import { BlockAddList, PolicyAddList } from '@features/policy-add';
import type { PatchDatalimitRequest, TotalDraft } from '@features/policy-datalimite';
import { DataLimitSection, useDatalimit } from '@features/policy-datalimite';
import { Button, Modal, Tab, type TabItem, useModal } from '@hotspot/ui';
import { type ReactNode, useState } from 'react';

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

  // block

  const handleSave = async () => {
    if (!(props && datalimit)) return;

    if (draft.dataLimit !== undefined || draft.isLocked !== undefined) {
      const dataLimitPayload: PatchDatalimitRequest = {
        dataLimit: draft.dataLimit ?? datalimit.dataLimit,
        familyId: props.familyId,
        isLocked: draft.isLocked ?? datalimit.isLocked,
        subId: props.user.subId,
      };
      updateLockStatus.mutate(dataLimitPayload);
    }

    // 2. POLICY 관련 변경사항이 있을 때 (예: blockPolicyList가 draft에 담겼을 때)
    // if (draft.blockPolicyList) {
    // updatePolicy.mutate({ subId: props.user.subId, policies: draft.blockPolicyList });
    // }

    // 3. BLOCK 관련 변경사항이 있을 때
    // if (draft.appBlockedList) {
    // updateBlock.mutate({ subId: props.user.subId, apps: draft.appBlockedList });
    // }

    close();
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
            <PolicyAddList data={props?.user.blockPolicyResponseList ?? []} />
          )}
          {activeTab === 'BLOCK' && (
            <BlockAddList data={props?.user.appBlockedServiceResponseList ?? []} />
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
