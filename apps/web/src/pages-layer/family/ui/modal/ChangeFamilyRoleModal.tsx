'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useState } from 'react';
import { api } from '@/shared/api/client';

type FamilyRole = 'OWNER' | 'PARENT' | 'CHILD' | 'NONE';

interface ChangeFamilyRoleModalProps {
  close: () => void;
  props?: Record<string, unknown>;
}

interface ChangeFamilyRoleModalPayload {
  currentRole: FamilyRole;
  name: string;
  onSuccess?: () => void;
  subId: number;
}

const getNextRole = (role: FamilyRole): 'PARENT' | 'CHILD' | null => {
  if (role === 'PARENT') return 'CHILD';
  if (role === 'CHILD') return 'PARENT';
  return null;
};

export const ChangeFamilyRoleModal = ({ close, props }: ChangeFamilyRoleModalProps) => {
  const { open } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const payload = props as ChangeFamilyRoleModalPayload | undefined;

  const nextRole = getNextRole(payload?.currentRole ?? 'NONE');
  const nextRoleLabel = nextRole === 'CHILD' ? '자녀' : '부모';

  const handleConfirm = async () => {
    if (!(payload && nextRole)) return;

    setIsLoading(true);
    try {
      await api.patch(`/api/v1/families/members/${payload.subId}/role`, {
        familyRole: nextRole,
      });
      close();
      payload.onSuccess?.();
    } catch {
      open('errorModal', {
        props: {
          content: '권한 변경에 실패했습니다. 잠시 후 다시 시도해주세요.',
          onConfirm: () => undefined,
          title: '오류',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!(payload && nextRole)) {
    return (
      <Modal>
        <Modal.Header>
          <Modal.Title>권한 변경 불가</Modal.Title>
          <Modal.Description>현재 대상의 권한은 변경할 수 없습니다.</Modal.Description>
        </Modal.Header>
        <Modal.Footer btnLayout="horizontal">
          <Button onClick={close} variant="ghost">
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Modal className="w-[30.5rem] max-w-[calc(100vw-1rem)] rounded-[1.5rem] p-6" size="custom">
      <Modal.Header className="items-center gap-2 text-center">
        <Modal.Title className="text-[1rem] font-bold leading-tight text-black">
          권한을 변경하시겠습니까?
        </Modal.Title>
        <Modal.Description className="text-[0.875rem] leading-snug text-gray-500">
          {payload.name}님의 권한을{' '}
          <span className="font-semibold text-black">{nextRoleLabel}</span>
          (으)로 변경합니다. 권한에 따라 접근 가능한 기능이 달라질 수 있습니다.
        </Modal.Description>
      </Modal.Header>

      <Modal.Footer btnLayout="horizontal" className="mt-4 gap-2">
        <Button
          className="h-12 text-[1rem] font-semibold"
          isLoading={isLoading}
          onClick={() => void handleConfirm()}
        >
          변경하기
        </Button>
        <Button
          className="h-12 text-[1rem] font-semibold"
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
