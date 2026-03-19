'use client';

import { SelectField } from '@hotspot/ui';
import CreateFamilyImage from '@/shared/assets/images/onboarding/create-family.svg';
import MoveHomeImage from '@/shared/assets/images/onboarding/move-home.svg';

interface CategorySelectSectionProps {
  onCreateClick: () => void;
  onHomeClick: () => void;
}

export const CategorySelectSection = ({
  onCreateClick,
  onHomeClick,
}: CategorySelectSectionProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-16">
      <SelectField
        className="bg-purple-50 rounded-8"
        desc="다른 대표자가 사용자를 가족에 포함시킨 경우에 선택해주세요."
        heading="홈 화면 진입"
        leftSlot={<MoveHomeImage />}
        onClick={onHomeClick}
      />
      <SelectField
        className="bg-purple-50 rounded-8"
        desc="사용자가 대표자가 되어 가족을 생성합니다."
        heading="새 가족 생성"
        leftSlot={<CreateFamilyImage />}
        onClick={onCreateClick}
      />
    </div>
  );
};
