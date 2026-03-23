import { Button, Modal, useModal } from "@hotspot/ui";

interface ErrorModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  [key: string]: unknown;
}

export const ErrorModal = () => {
  const { getProps, close } = useModal();
  const props = getProps<ErrorModalProps>();

  const handleConfirm = () => {
    close();
    if (props?.onConfirm) {
      props.onConfirm();
    }
  };

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>{props?.title}</Modal.Title>
        <Modal.Description>{props?.content}</Modal.Description>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleConfirm}>확인</Button>
      </Modal.Footer>
    </Modal>
  );
};
