import { Button, Modal, Tab, type TabItem, useModal } from '@hotspot/ui';
import { useState } from 'react';
import { BlockAddList, type BlockApply } from '@/features/family-policy/blocked-list';
import { useMemberPolicy } from '@/features/family-policy/member-info/model/useMemberPolicy';
import { PolicyAddList, type PolicyApply } from '@/features/family-policy/policy-list';
import { UserProfileIcon } from '@/shared/ui/user-profile-icon/UserProfileIcon';

type PolicyModalTabValue = 'DATA' | 'POLICY' | 'BLOCK';
const TABS: TabItem<PolicyModalTabValue>[] = [
  { label: '정책 설정', value: 'POLICY' },
  { label: '차단 설정', value: 'BLOCK' },
];

interface PolicyDetailModalProps {
  familyId: number;
  subId: number;
  [key: string]: unknown;
}

type TotalDraft = Partial<PolicyApply & BlockApply>;

export const PolicyDetailModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const props = getProps<PolicyDetailModalProps>();
  const [activeTab, setActiveTab] = useState<PolicyModalTabValue>('POLICY');

  const [draft, setDraft] = useState<TotalDraft>({});
  const handleUpdate = (updates: TotalDraft) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const { userData, isLoading } = useMemberPolicy({
    familyId: props?.familyId as number,
    subId: props?.subId as number,
  });

  // policy
  // const { updatePolicy } = useApplyPolicy({
  //   familyId: props?.familyId as number,
  //   subId: props?.user.subId as number,
  // });

  // block
  // const { updateBlock } = useApplyBlock({
  //   familyId: props?.familyId as number,
  //   subId: props?.user.subId as number,
  // });

  const handleSave = async () => {
    // if (!(props && datalimit)) return;
    // const promises: Promise<unknown>[] = [];
    // if (draft.blockPolicyIdList) {
    //   const policyPayload: PolicyApply = {
    //     blockPolicyIdList: draft.blockPolicyIdList,
    //   };
    //   promises.push(updatePolicy.mutateAsync(policyPayload));
    // }
    // if (draft.blockedServiceIdList) {
    //   const blockPayload: BlockApply = {
    //     blockedServiceIdList: draft.blockedServiceIdList,
    //   };
    //   promises.push(updateBlock.mutateAsync(blockPayload));
    // }
    // try {
    //   await Promise.all(promises);
    //   close();
    // } catch (error) {
    //   console.error('일부 업데이트 실패:', error);
    // }
  };

  if (!userData) {
    return <Modal.Content>데이터를 불러올 수 없습니다.</Modal.Content>;
  }

  if (isLoading) return <Modal.Content>데이터를 불러오는 중입니다.</Modal.Content>;

  return (
    <div>
      <Modal className="w-100">
        <Modal.Header>
          <Modal.Title>
            <div className="flex items-center gap-1">
              <UserProfileIcon type={'MAIN'} />
              {userData?.memberName}
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
          {activeTab === 'POLICY' && (
            <PolicyAddList
              data={userData?.appliedTimePolicies ?? []}
              draft={draft}
              onUpdate={(ids) => handleUpdate({ blockPolicyIdList: ids })}
            />
          )}
          {activeTab === 'BLOCK' && (
            <BlockAddList
              data={userData?.appliedBlockedServicePolicies ?? []}
              draft={draft}
              onUpdate={handleUpdate}
            />
          )}
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={handleSave}>저장</Button>
          <Button onClick={close} variant="ghost">
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
