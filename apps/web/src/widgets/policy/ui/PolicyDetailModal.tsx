import { Button, Modal, Toggle, useModal } from '@hotspot/ui';

export const PolicyDetailModal = () => {
  const { getProps } = useModal();

  const props = getProps<{
    title: string;
  }>();

  return (
    <div>
      <Modal>
        <Modal.Header>
          <Modal.Title>{props?.title}</Modal.Title>
        </Modal.Header>
        <div>
          <div>
            즉시 차단{' '}
            <Toggle
              id={''}
              onChange={(checked: boolean): void => {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
          <div>데이터 한도</div>
        </div>
        <Modal.Footer>
          <Button>저장</Button>
          <Button>취소</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
