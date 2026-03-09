import { Button, Modal, Tab, type TabItem, useModal } from '@hotspot/ui';
import { useState } from 'react';
import type { FamilyPolicy } from '@/domains/family';
import {
  BlockAddList,
  PolicyAddList,
  type PolicyApply,
  useApplyBlock,
  useApplyPolicy,
} from '@/features/family-policy/policy-apply';
import { UserProfileIcon } from '@/shared/ui';

type PolicyModalTabValue = 'DATA' | 'POLICY' | 'BLOCK';
const TABS: TabItem<PolicyModalTabValue>[] = [
  { label: '정책 설정', value: 'POLICY' },
  { label: '차단 설정', value: 'BLOCK' },
];

interface PolicyDetailModalProps {
  familyId: number;
  member: FamilyPolicy;
  [key: string]: unknown;
}

export const PolicyDetailModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const props = getProps<PolicyDetailModalProps>();
  const [activeTab, setActiveTab] = useState<PolicyModalTabValue>('POLICY');

  const [draft, setDraft] = useState<{
    policyIds?: PolicyApply[];
    blockIds?: PolicyApply[];
  }>({});

  // policy
  const { updatePolicy } = useApplyPolicy({
    familyId: props?.familyId as number,
    subId: props?.member.subId as number,
  });

  // block
  const { updateBlock } = useApplyBlock({
    familyId: props?.familyId as number,
    subId: props?.member.subId as number,
  });

  const handleSave = async () => {
    const promises: Promise<unknown>[] = [];
    if (draft.policyIds) {
      promises.push(updatePolicy.mutateAsync(draft.policyIds));
    }
    if (draft.blockIds) {
      promises.push(updateBlock.mutateAsync(draft.blockIds));
    }

    try {
      await Promise.all(promises);
      close();
    } catch (error) {
      console.error('업데이트 실패:', error);
    }
  };

  if (!(props?.familyId && props?.member)) return <>Error 발생</>;

  return (
    <div>
      <Modal className="w-100">
        <Modal.Header>
          <Modal.Title>
            <div className="flex items-center gap-1">
              <UserProfileIcon type={'MAIN'} />
              <div className="flex flex-col">
                {props.member.memberName}
                <p className="text-gray-600 text-[12px] font-normal">{props.member.phoneNumber}</p>
              </div>
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
              draft={draft.policyIds}
              familyId={props.familyId}
              onUpdate={(items) => setDraft((prev) => ({ ...prev, policyIds: items }))}
              subId={props.member.subId}
            />
          )}
          {activeTab === 'BLOCK' && (
            <BlockAddList
              draft={draft.blockIds}
              familyId={props.familyId}
              onUpdate={(items) => setDraft((prev) => ({ ...prev, blockIds: items }))}
              subId={props.member.subId}
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
