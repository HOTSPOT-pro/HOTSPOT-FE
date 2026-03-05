'use client';

import { Button, Input, Modal } from '@hotspot/ui';
import { useState } from 'react';
import { useCreateAppPolicy } from '@/features/policy'; // 해당 기능을 수행할 훅 (가칭)

export const PolicyAddBlockModal = ({ close }: { close: () => void }) => {
  const { mutate, isPending } = useCreateAppPolicy();

  // 상태 관리
  const [policyName, setPolicyName] = useState('');
  const [policyCode, setPolicyCode] = useState('');

  const handleSave = async () => {
    if (!(policyName && policyCode)) {
      return;
    }

    mutate(
      {
        policyCode,
        policyName,
      },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  // 입력값이 둘 다 있어야 저장 버튼 활성화
  const isInvalid = !(policyName.trim() && policyCode.trim());

  return (
    <Modal className="w-[400px]">
      <Modal.Header>
        <Modal.Title>차단 서비스 정책 생성</Modal.Title>
      </Modal.Header>

      <Modal.Content className="flex flex-col gap-6 py-4">
        <Input
          id="policyName"
          label="정책명"
          onChange={(e) => setPolicyName(e.target.value)}
          placeholder="예: 유튜브"
          value={policyName}
        />
        <Input
          id="policyCode"
          label="정책 코드"
          onChange={(e) => setPolicyCode(e.target.value)}
          placeholder="예: MEDIA_YOUTUBE"
          value={policyCode}
        />
      </Modal.Content>

      <Modal.Footer className="flex gap-2">
        <Button className="flex-1" onClick={close} variant="ghost">
          취소
        </Button>
        <Button className="flex-1" disabled={isPending || isInvalid} onClick={handleSave}>
          {isPending ? '저장 중...' : '저장'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
