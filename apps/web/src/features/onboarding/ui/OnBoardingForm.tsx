'use client';

import { Button, Input } from '@hotspot/ui/components';
import type React from 'react';
import { useCallback, useState } from 'react';
import { BottomSheet } from '@/shared/ui';
import { useUserStore } from '../../auth/store/useUserStore';
import { formatBirth, formatTel } from '../lib/format';
import { AgreementSection } from './AgreementSection';

export const OnBoardingForm = () => {
  const auth = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ birth: '', tel: '' });

  const openSheet = useCallback(() => setIsOpen(true), []);
  const closeSheet = useCallback(() => setIsOpen(false), []);

  // 입력값이 바뀔 때마다 포맷 적용
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'birth') {
      setFormData((prev) => ({ ...prev, birth: formatBirth(value) }));
    } else if (id === 'tel') {
      setFormData((prev) => ({ ...prev, tel: formatTel(value) }));
    }
  };

  // 숫자 수 기준 유효성 검사
  const isBirthValid = formData.birth.replace(/\D/g, '').length === 6;
  const isTelValid = formData.tel.replace(/\D/g, '').length === 11;

  return (
    <div className="w-full h-full my-10 flex flex-col justify-between">
      <div>
        <div className="font-bold text-2xl flex flex-col gap-1">
          <p>환영합니다!</p>
          <p>{auth.userName ?? '사용자'}님</p>
        </div>

        <div className="text-gray-600 font-light mt-2">
          <p>서비스를 시작하기 전에</p>
          <p>간단한 정보를 입력해 주세요.</p>
        </div>

        <div className="mt-12 flex flex-col gap-10">
          <Input
            description="6자리 숫자만 입력해주세요."
            id={'birth'}
            label="생년월일"
            onChange={handleChange}
            placeholder="00.00.00"
            value={formData.birth}
          />
          <Input
            description="11자리 숫자만 입력해주세요."
            id={'tel'}
            label="전화번호"
            onChange={handleChange}
            placeholder="010-1234-5678"
            value={formData.tel}
          />
        </div>
      </div>

      <Button disabled={!(isBirthValid && isTelValid)} onClick={openSheet}>
        다음
      </Button>

      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={closeSheet}>
          <AgreementSection />
        </BottomSheet>
      )}
    </div>
  );
};
