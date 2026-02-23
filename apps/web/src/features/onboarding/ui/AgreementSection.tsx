'use client';

import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import Check from '@hotspot/ui/assets/icons/check.svg';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const AgreementSection = () => {
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
  });
  const router = useRouter();

  const essentialChecked = agreements.terms && agreements.privacy;

  const handleCheck = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-3 pt-1">
        <AgreementItem
          checked={agreements.terms}
          label="[필수] Hotspot 이용약관에 동의합니다."
          onCheck={() => handleCheck('terms')}
        />
        <AgreementItem
          checked={agreements.privacy}
          label="[필수] Hotspot 개인정보 수집 및 이용에 동의합니다."
          onCheck={() => handleCheck('privacy')}
        />
      </div>

      <Button
        className="mt-4"
        disabled={!essentialChecked}
        onClick={() => {
          router.push('/');
        }}
      >
        동의하고 시작하기
      </Button>
    </div>
  );
};

const AgreementItem = ({
  label,
  checked,
  onCheck,
}: {
  label: string;
  checked: boolean;
  onCheck: () => void;
}) => (
  <button
    className="flex items-center justify-between cursor-pointer group"
    onClick={onCheck}
    type="button"
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          ' rounded-full w-fit h-fit p-1.5 border ',
          checked ? 'border-purple-600 bg-purple-600' : 'border-gray-200 bg-white',
        )}
      >
        <Check className="w-4.5 h-4.5 text-white" />
      </div>
      <span className={'py-2.5 text-sm text-black'}>{label}</span>
    </div>
    <RightArrow className="w-6 h-6 text-gray-400" />
  </button>
);
