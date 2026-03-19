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
    <Modal className="w-[30.5rem] max-w-[calc(100vw-1rem)] rounded-[1.5rem] p-6" size="custom">
      <Modal.Header className="items-center gap-2 text-center">
        <Modal.Title className="text-[1rem] font-bold leading-tight text-black">
          가족 삭제를 신청하시겠습니까?
        </Modal.Title>
        <Modal.Description className="text-[0.875rem] leading-snug text-gray-500">
          {payload?.name ?? '구성원'}님을 가족에서 삭제 신청합니다. 삭제는 다음 달 1일에 반영됩니다.
        </Modal.Description>
      </Modal.Header>

      <Modal.Footer btnLayout="horizontal" className="mt-4 gap-2">
        <Button
          className="h-12 font-title-title3-semibold"
          isLoading={isLoading}
          onClick={() => void handleDeleteRequest()}
          variant="destructive"
        >
          삭제 신청
        </Button>
        <Button
          className="h-12 font-title-title3-semibold"
          disabled={isLoading}
          onClick={close}
          variant="ghost"
        >
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
