'use client';

import { Button } from '@hotspot/ui/components';
import { useState } from 'react';
import { TERMS } from '@/shared/constants/terms';
import { AgreementRow } from './AgreementRow';

interface AgreementSectionProps {
  onValidSubmit: () => void;
  isPending: boolean;
}

export const AgreementSection = ({ onValidSubmit, isPending }: AgreementSectionProps) => {
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
  });

  const essentialChecked = agreements.terms && agreements.privacy;

  const handleCheck = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-3 pt-1">
        <AgreementRow
          checked={agreements.terms}
          href={TERMS.term}
          label="[필수] Hotspot 이용약관에 동의합니다."
          onCheck={() => handleCheck('terms')}
        />
        <AgreementRow
          checked={agreements.privacy}
          href={TERMS.privacy}
          label="[필수] Hotspot 개인정보 수집 및 이용에 동의합니다."
          onCheck={() => handleCheck('privacy')}
        />
      </div>

      <Button
        className="mt-4"
        disabled={!essentialChecked}
        isLoading={isPending}
        onClick={onValidSubmit}
        type="submit"
      >
        동의하고 시작하기
      </Button>
    </div>
  );
};
