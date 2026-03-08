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
    open('PresentConfirmModal', {
      props: {
        presentAmount: presentAmount,
        selectedFamily: selectedFamily,
      },
    });
  }, [open, selectedFamily, presentAmount]);

  if (familyData.isPending) return <div>Loading...</div>;
  if (!familyData.data) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="flex flex-col gap-4 p-5">
      <Card>
        <div className="flex flex-row justify-between bg-white rounded-2xl">
          <p className="text-gray-500 text-[12px]">내 잔여 데이터</p>
          <p className="text-[14px] font-bold text-black">{familyData.data?.dataRemainAmount}GB</p>
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

      <Button onClick={handleOpenModal}>선물하기</Button>
    </div>
  );
};
