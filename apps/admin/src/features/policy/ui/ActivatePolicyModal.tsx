'use client';

import { Button, Modal, useModal } from '@hotspot/ui';
import { useUpdatePolicyActive } from '../model/useActivePolicy';

export const ActivatePolicyModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const { policyId, policyName, policyType, isActive } =
    getProps<{
      policyId: number;
      policyName: string;
      policyType: 'TIME' | 'APP';
      isActive: boolean;
    }>() ?? {};

  const { updatePolicyActive } = useUpdatePolicyActive();

  const handleActivate = () => {
    if (!(policyId && policyType)) return;

    updatePolicyActive.mutate(
      {
        isActive: !isActive,
        policyId: policyId,
        policyType: policyType,
      },
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
          {policyName ? `'${policyName}' ` : ''}정책을 {isActive ? '비활성화' : '활성화'}하시겠어요?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer btnLayout="horizontal">
        <Button disabled={updatePolicyActive.isPending} onClick={close} variant="ghost">
          취소
        </Button>
        <Button isLoading={updatePolicyActive.isPending} onClick={handleActivate} variant="solid">
          변경하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
