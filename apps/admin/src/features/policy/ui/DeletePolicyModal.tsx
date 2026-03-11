'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useDeletePolicy } from '../model/useDeletePolicy';

export const DeletePolicyModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const { policyId, policyName, policyType } =
    getProps<{ policyId: number; policyName: string; policyType: 'TIME' | 'APP' }>() ?? {};

  const { deletePolicy, isDeleting } = useDeletePolicy();

  const handleDelete = () => {
    if (!(policyId && policyType)) return;

    deletePolicy(
      { policyId, policyType },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <Modal className="w-100">
      <Modal.Header>
        <Modal.Title className="break-keep">
          {policyName ? `'${policyName}' ` : ''}정책을 삭제하시겠어요?
        </Modal.Title>
        <Modal.Description>삭제된 정책은 되돌릴 수 없습니다.</Modal.Description>
      </Modal.Header>
      <Modal.Footer btnLayout="horizontal">
        <Button disabled={isDeleting} onClick={close} variant="ghost">
          취소
        </Button>
        <Button isLoading={isDeleting} onClick={handleDelete} variant="destructive">
          삭제하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
