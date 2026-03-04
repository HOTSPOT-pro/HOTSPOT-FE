import { Button } from '@hotspot/ui';
import { useState } from 'react';
import { useGift } from '../model/useGift';
import { PresentAmount } from './PresentAmount';
import { PresentFamilyList } from './PresentFamilyList';

export const PresentTab = () => {
  const { familyData, presentData } = useGift();
  const [selectedFamily, setSelectedFamily] = useState<number | null>(null);
  const handleSelectFamily = (subId: number | null) => {
    setSelectedFamily(subId);
  };
  const [presentAmount, setPresentAmount] = useState<number>(1.0);
  const handlePresentAmount = (presentAmount: number) => {
    setPresentAmount(presentAmount);
  };
  const handleSendPresent = () => {
    if (selectedFamily && presentAmount)
      presentData.mutate({ dataAmount: presentAmount, targetSubId: selectedFamily });
  };

  if (familyData.isPending) return <div>Loading...</div>;
  if (!familyData.data) return <div>데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-row justify-between p-4 bg-white rounded-2xl">
        <p className="text-gray-500 text-[12px]">내 잔여 데이터</p>
        <p className="text-[14px] font-bold text-black">{familyData.data?.dataRemainAmount}GB</p>
      </div>
      <PresentFamilyList
        data={familyData.data?.subUsages}
        handleSelect={handleSelectFamily}
        selected={selectedFamily}
      />
      <PresentAmount handleSelect={handlePresentAmount} presentAmount={presentAmount} />

      <Button onClick={handleSendPresent}>선물하기</Button>
    </div>
  );
};
