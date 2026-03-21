'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useState } from 'react';
import { api } from '@/shared/api/client';

interface DeleteFamilyMemberModalProps {
  close: () => void;
  props?: Record<string, unknown>;
}

interface DeleteFamilyMemberModalPayload {
  name: string;
  onSuccess?: () => void;
  subId: number;
}

export const DeleteFamilyMemberModal = ({ close, props }: DeleteFamilyMemberModalProps) => {
  const { open } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const payload = props as DeleteFamilyMemberModalPayload | undefined;

  const handleDeleteRequest = async () => {
    if (!payload) return;

    setIsLoading(true);
    try {
      await api.post('/api/v1/families/delete', {
        applyType: 'REMOVE',
        targetSubIdList: [payload.subId],
      });
      close();
      payload.onSuccess?.();
    } catch {
      open('errorModal', {
        props: {
          content: '삭제 신청에 실패했습니다. 잠시 후 다시 시도해주세요.',
          onConfirm: () => undefined,
          title: '오류',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal className="w-[355px] max-w-[calc(100vw-1rem)]" size="custom">
      <Modal.Header>
        <Modal.Title>가족 삭제를 신청하시겠습니까?</Modal.Title>
        <Modal.Description>
          {payload?.name ?? '구성원'}님을 가족에서 삭제 신청합니다. 삭제는 다음 달 1일에 반영됩니다.
        </Modal.Description>
      </Modal.Header>

      <Modal.Footer btnLayout="horizontal" className="gap-8">
        <Button disabled={isLoading} onClick={close} variant="ghost">
          취소
        </Button>
        <Button
          isLoading={isLoading}
          onClick={() => void handleDeleteRequest()}
          variant="destructive"
        >
          삭제 신청하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
