'use client';

import { Button, Modal, useModal } from '@hotspot/ui';

interface RelationDocumentModalProps extends Record<string, unknown> {
  documentUrl: string;
}

const isPdfDocument = (documentUrl: string) => {
  try {
    const parsedUrl = new URL(documentUrl, window.location.origin);
    return parsedUrl.pathname.toLowerCase().endsWith('.pdf');
  } catch {
    return documentUrl.toLowerCase().includes('.pdf');
  }
};

export const RelationDocumentModal = ({ close }: { close: () => void }) => {
  const { getProps } = useModal();
  const props = getProps<RelationDocumentModalProps>();

  if (!props?.documentUrl) {
    return (
      <Modal className="h-[90dvh] w-[min(56rem,calc(100dvw-2rem))]" size="custom">
        <Modal.Header>
          <Modal.Title>가족관계증명서</Modal.Title>
          <Modal.Description>문서 정보를 불러올 수 없습니다.</Modal.Description>
        </Modal.Header>
        <Modal.Footer btnLayout="horizontal">
          <Button onClick={close} variant="outline">
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const pdfDocument = isPdfDocument(props.documentUrl);

  return (
    <Modal className="h-[90dvh] w-[min(56rem,calc(100dvw-2rem))]" size="custom">
      <Modal.Header>
        <Modal.Title>가족관계증명서</Modal.Title>
      </Modal.Header>

      <Modal.Content className="min-h-0 flex-1 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        {pdfDocument ? (
          <iframe
            className="h-full w-full"
            src={props.documentUrl}
            title="가족관계증명서 미리보기"
          />
        ) : (
          <div className="flex h-full items-center justify-center overflow-auto p-16">
            <img
              alt="가족관계증명서 미리보기"
              className="max-h-full w-auto max-w-full rounded-lg object-contain"
              src={props.documentUrl}
            />
          </div>
        )}
      </Modal.Content>

      <Modal.Footer btnLayout="horizontal" className="gap-8">
        <Button onClick={close}>닫기</Button>
      </Modal.Footer>
    </Modal>
  );
};
