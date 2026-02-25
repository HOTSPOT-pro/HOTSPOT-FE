import { BlockAddList, PolicyAddList } from '@features/policy-add';
import { Button, Modal, Slider, Tab, type TabItem, Toggle, useModal } from '@hotspot/ui';
import { type ReactNode, useState } from 'react';
import { usePolicy } from '@/entities/policy';

type PolicyModalTabValue = 'DATA' | 'POLICY' | 'BLOCK';
const TABS: TabItem<PolicyModalTabValue>[] = [
  { label: '데이터 정책', value: 'DATA' },
  { label: '정책 설정', value: 'POLICY' },
  { label: '차단 설정', value: 'BLOCK' },
];

export const PolicyDetailModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const [activeTab, setActiveTab] = useState<PolicyModalTabValue>('DATA');
  const { policyList, blockList } = usePolicy();

  const {
    title = '기본 정책',
    icon = null,
    maxNum = 100,
    minNum = 0,
    initialValue = 5,
  } = getProps<any>() || {};

  return (
    <div>
      <Modal className="w-100">
        <Modal.Header>
          <Modal.Title>
            <div className="flex items-center gap-1">
              {icon}
              {title}
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
            <DataLimitSection initialValue={initialValue} maxNum={maxNum} minNum={minNum} />
          )}
          {activeTab === 'POLICY' && <PolicyAddList data={policyList} />}
          {activeTab === 'BLOCK' && <BlockAddList data={blockList} />}
        </Modal.Content>
        <Modal.Footer>
          <Button>저장</Button>
          <Button onClick={close} variant="ghost">
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const DataLimitSection = ({
  initialValue,
  maxNum,
  minNum,
}: {
  initialValue?: number;
  maxNum: number;
  minNum: number;
}) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const handleBlockToggle = () => {
    setIsBlocked((prev) => !prev);
  };

  return (
    <div className="py-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold leading-4">즉시 차단</p>
        <Toggle checked={isBlocked} id={'block'} onChange={handleBlockToggle} />
      </div>
      <div>
        <p className="text-xs font-bold leading-4">데이터 한도</p>
        <Slider initialValue={initialValue} maxNum={maxNum} minNum={minNum} step={5} />
      </div>
    </div>
  );
};
