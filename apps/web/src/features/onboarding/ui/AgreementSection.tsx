'use client';

import { Button } from '@hotspot/ui/components';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { AgreementRow } from './AgreementRow';

export const AgreementSection = ({ formId }: { formId: string }) => {
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
  });
  const router = useRouter();

  const essentialChecked = agreements.terms && agreements.privacy;

  const handleCheck = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleStart = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-3 pt-1">
        <AgreementRow
          checked={agreements.terms}
          href="https://www.notion.so/Hotspot-1b8c9e5a0c7b4e7d9f1a2b3c4d5e6f7"
          label="[필수] Hotspot 이용약관에 동의합니다."
          onCheck={() => handleCheck('terms')}
        />
        <AgreementRow
          checked={agreements.privacy}
          href="https://www.naver.com"
          label="[필수] Hotspot 개인정보 수집 및 이용에 동의합니다."
          onCheck={() => handleCheck('privacy')}
        />
      </div>

      <Button
        className="mt-4"
        disabled={!essentialChecked}
        form={formId}
        onClick={handleStart}
        type="submit"
      >
        동의하고 시작하기
      </Button>
    </div>
  );
};
