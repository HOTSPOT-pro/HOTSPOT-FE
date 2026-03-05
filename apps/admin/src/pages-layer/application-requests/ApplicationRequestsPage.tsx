'use client';

import { Button, Card, CardContent } from '@hotspot/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useApplicationsQuery,
  useApproveApplicationMutation,
  useRejectApplicationMutation,
} from '@/features/apply';
import type { ApplicationStatus, ApplicationType } from '@/features/apply/api/types';
import { CategorySelect, type Column, Pagination, Table } from '@/shared';
import { getApiErrorMessage } from '@/shared/api/types';
import { formatDatesTime } from '@/shared/lib/format';
import { StatusTab } from '@/widgets';

const PAGE_SIZE_OPTIONS = [
  { label: '20개', value: '20' },
  { label: '50개', value: '50' },
  { label: '100개', value: '100' },
] as const;

interface ApplicationRequestsPageProps {
  applyType: ApplicationType;
}

interface RequestRow {
  id: string;
  relationDocumentUrl: string | null;
  requestDisplayId: string;
  requestId: number;
  requestedAt: string;
  requesterName: string;
  requesterPhoneNumber: string;
  status: ApplicationStatus;
  targets: { id: string; name: string; phone: string }[];
}

const buildDocumentUrl = (relationDocumentUrl: string): string => {
  if (relationDocumentUrl.startsWith('http://') || relationDocumentUrl.startsWith('https://')) {
    return relationDocumentUrl;
  }

  const normalizedPath = relationDocumentUrl.startsWith('/')
    ? relationDocumentUrl
    : `/${relationDocumentUrl}`;

  return normalizedPath;
};

const baseColumns: Column<RequestRow>[] = [
  { accessor: 'requestDisplayId', header: '요청번호' },
  { accessor: 'requesterName', header: '신청자' },
  { accessor: 'requesterPhoneNumber', header: '신청자 연락처' },
  {
    accessor: 'targets',
    header: '대상자',
    render: (_, row) => (
      <ul className="space-y-2">
        {row.targets.map((target) => (
          <li className="flex flex-col gap-1" key={target.id}>
            <p className="text-sm font-medium text-gray-900">{target.name}</p>
            <p className="text-xs text-gray-500">{target.phone}</p>
          </li>
        ))}
      </ul>
    ),
  },
  { accessor: 'requestedAt', header: '요청 시각' },
  {
    accessor: 'relationDocumentUrl',
    header: '가족관계증명서',
    render: (value) => {
      const relationDocumentUrl = value as string | null;

      if (!relationDocumentUrl) {
        return <span className="text-sm text-gray-400">없음</span>;
      }

      return (
        <a
          className="text-sm font-medium text-blue-600 hover:underline"
          href={buildDocumentUrl(relationDocumentUrl)}
          rel="noreferrer"
          target="_blank"
        >
          보기
        </a>
      );
    },
  },
  {
    accessor: 'actions',
    header: '승인',
    render: (_, row) =>
      row.status !== 'PENDING' ? <span className="text-xs text-gray-400">-</span> : null,
  },
];

export const ApplicationRequestsPage = ({ applyType }: ApplicationRequestsPageProps) => {
  const [activeStatus, setActiveStatus] = useState<ApplicationStatus>('PENDING');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]['value']>('20');
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const [processingRequestId, setProcessingRequestId] = useState<number | null>(null);
  const [processingAction, setProcessingAction] = useState<'approve' | 'reject' | null>(null);

  const { data, error, isLoading, isFetching, refetch } = useApplicationsQuery({
    applyType,
    page: currentPage - 1,
    size: Number(pageSize),
    status: activeStatus,
  });
  const approveMutation = useApproveApplicationMutation();
  const rejectMutation = useRejectApplicationMutation();

  const totalPages = Math.max(data?.totalPages ?? 0, 1);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handleStatusChange = (nextStatus: ApplicationStatus) => {
    setActiveStatus(nextStatus);
    setCurrentPage(1);
    setActionErrorMessage(null);
  };

  const handlePageSizeChange = (nextPageSize: (typeof PAGE_SIZE_OPTIONS)[number]['value']) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  const rows = useMemo<RequestRow[]>(() => {
    return (data?.requests ?? []).map((request) => ({
      id: request.requestDisplayId,
      relationDocumentUrl: request.relationDocumentUrl,
      requestDisplayId: request.requestDisplayId,
      requestedAt: formatDatesTime(request.requestedAt),
      requesterName: request.requesterName,
      requesterPhoneNumber: request.requesterPhoneNumber,
      requestId: request.requestId,
      status: activeStatus,
      targets: request.targets.map((target) => ({
        id: `${request.requestId}-${target.targetSubId}`,
        name: target.targetName,
        phone: target.targetPhoneNumber,
      })),
    }));
  }, [activeStatus, data?.requests]);

  const handleApprove = useCallback(
    async (requestId: number) => {
      try {
        setActionErrorMessage(null);
        setProcessingRequestId(requestId);
        setProcessingAction('approve');
        await approveMutation.mutateAsync({ applyType, requestId });
        await refetch();
      } catch (mutationError) {
        setActionErrorMessage(
          getApiErrorMessage(mutationError, '요청 승인 처리 중 오류가 발생했습니다.'),
        );
      } finally {
        setProcessingRequestId(null);
        setProcessingAction(null);
      }
    },
    [approveMutation, applyType, refetch],
  );

  const handleReject = useCallback(
    async (requestId: number) => {
      try {
        setActionErrorMessage(null);
        setProcessingRequestId(requestId);
        setProcessingAction('reject');
        await rejectMutation.mutateAsync({ applyType, requestId });
        await refetch();
      } catch (mutationError) {
        setActionErrorMessage(
          getApiErrorMessage(mutationError, '요청 거절 처리 중 오류가 발생했습니다.'),
        );
      } finally {
        setProcessingRequestId(null);
        setProcessingAction(null);
      }
    },
    [applyType, refetch, rejectMutation],
  );

  const columns = useMemo<Column<RequestRow>[]>(
    () =>
      baseColumns.map((column) => {
        if (column.accessor !== 'actions') {
          return column;
        }

        return {
          ...column,
          render: (_, row) => {
            if (row.status !== 'PENDING') {
              return <span className="text-xs text-gray-400">-</span>;
            }

            return (
              <div className="flex items-center gap-1">
                <Button
                  className="h-8 w-auto rounded-md px-3 text-xs"
                  isLoading={
                    processingRequestId === row.requestId && processingAction === 'approve'
                  }
                  onClick={() => {
                    void handleApprove(row.requestId);
                  }}
                  variant="solid"
                >
                  승인
                </Button>
                <Button
                  className="h-8 w-auto rounded-md px-3 text-xs"
                  isLoading={processingRequestId === row.requestId && processingAction === 'reject'}
                  onClick={() => {
                    void handleReject(row.requestId);
                  }}
                  variant="destructive"
                >
                  거절
                </Button>
              </div>
            );
          },
        };
      }),
    [handleApprove, handleReject, processingAction, processingRequestId],
  );

  const errorMessage = useMemo(() => {
    if (!error) {
      return null;
    }

    return getApiErrorMessage(
      error.response?.data ?? error,
      '요청 목록 조회 중 오류가 발생했습니다.',
    );
  }, [error]);

  return (
    <section className="flex h-full flex-col pb-8">
      <StatusTab activeStatus={activeStatus} onChange={handleStatusChange} />

      <div className="flex h-full flex-col px-4">
        <Card className="flex h-full flex-col">
          <CardContent className="flex h-full w-full flex-col">
            <div className="flex justify-end">
              <CategorySelect
                onChange={handlePageSizeChange}
                options={[...PAGE_SIZE_OPTIONS]}
                value={pageSize}
              />
            </div>
            <div className="flex h-full flex-col justify-between">
              <Table columns={columns} data={rows} isLoading={isLoading || isFetching} />
              <Pagination current={currentPage} onMove={setCurrentPage} total={totalPages} />
            </div>

            {errorMessage && (
              <p className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {errorMessage}
              </p>
            )}
            {actionErrorMessage && (
              <p className="mb-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {actionErrorMessage}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
