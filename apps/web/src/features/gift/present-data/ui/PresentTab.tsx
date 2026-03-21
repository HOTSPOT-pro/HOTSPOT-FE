import { Button, Card, useModal } from '@hotspot/ui';
import { useCallback, useState } from 'react';
import { useGift } from '../model/useGift';
import { PresentAmount } from './PresentAmount';
import { PresentFamilyList } from './PresentFamilyList';

export const PresentTab = () => {
  const { familyData } = useGift();
  const [selectedFamily, setSelectedFamily] = useState<number | null>(null);
  const handleSelectFamily = (subId: number | null) => {
    setSelectedFamily(subId);
  };
  const [presentAmount, setPresentAmount] = useState<number>(1.0);
  const handlePresentAmount = (presentAmount: number) => {
    if (presentAmount > 5 || presentAmount < 1) return;
    setPresentAmount(presentAmount);
  };

  const { open } = useModal();
  const handleOpenModal = useCallback(() => {
    open('presentConfirmModal', {
      props: {
        presentAmount: presentAmount,
        selectedFamily: selectedFamily,
      },
    });
  }, [open, selectedFamily, presentAmount]);

  if (familyData.isPending) return <div>Loading...</div>;
  if (!familyData.data) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="flex flex-col gap-16">
      <Card>
        <div className="flex flex-row justify-between items-center bg-white rounded-12">
          <div className="flex flex-col">
            <p className="text-black font-title-title3-semibold">내 잔여 데이터</p>
            <p className="text-gray-500 font-body-body3">한 달에 5GB까지 선물이 가능합니다.</p>
          </div>

          <p className="text-[14px] font-bold text-black">
            {familyData.data.dataRemainAmount === -1
              ? '무제한'
              : `${familyData.data.dataRemainAmount}GB`}
          </p>
        </div>
      </Card>
      <Card>
        <PresentFamilyList
          data={familyData.data?.subUsages}
          handleSelect={handleSelectFamily}
          selected={selectedFamily}
        />
      </Card>

      <Card>
        <PresentAmount handleSelect={handlePresentAmount} presentAmount={presentAmount} />
      </Card>

      <Button disabled={selectedFamily === null} onClick={handleOpenModal}>
        선물하기
      </Button>
    </div>
  );
};
