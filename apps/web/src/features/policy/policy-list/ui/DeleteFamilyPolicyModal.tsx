'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useDeleteFamilyPolicy } from '../model/useDeleteFamilyPolicy';

export const DeleteFamilyPolicyModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const { policyId, policyName } = getProps<{ policyId: number; policyName: string }>() ?? {};

  const { mutate, isPending } = useDeleteFamilyPolicy();

  const handleDelete = () => {
    if (!policyId) return;

    mutate(policyId, {
      onSuccess: () => {
        close();
      },
    });
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
        <Button disabled={isPending} onClick={close} variant="ghost">
          취소
        </Button>
        <Button isLoading={isPending} onClick={handleDelete} variant="destructive">
          삭제하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
