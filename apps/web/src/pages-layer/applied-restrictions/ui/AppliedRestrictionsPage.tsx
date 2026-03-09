'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/types';

interface AppliedPolicy {
  id: number;
  name: string;
  policyType: string;
  policySnapshot: {
    days?: string[];
    endTime?: string;
    startTime?: string;
  };
}

interface BlockedService {
  id: number;
  name: string;
  serviceCode: string;
}

interface AppliedRestrictions {
  memberId: number;
  memberName: string;
  subId: number;
  dataLimit: number;
  priority: number;
  blockPolicyResponseList: AppliedPolicy[];
  appBlockedServiceResponseList: BlockedService[];
}

const DAY_LABEL: Record<string, string> = {
  FRIDAY: '금',
  MONDAY: '월',
  SATURDAY: '토',
  SUNDAY: '일',
  THURSDAY: '목',
  TUESDAY: '화',
  WEDNESDAY: '수',
};
const BYTES_PER_GIGABYTE = 1_000_000_000;

const getAppliedRestrictions = async () => {
  const { data } = await api.get<ApiResponse<AppliedRestrictions>>('/api/v1/policies/applied', {
    params: { isFamily: false },
  });

  return data.data;
};

const formatGigaBytes = (bytes: number) => {
  const gigaBytes = bytes / BYTES_PER_GIGABYTE;
  return `${gigaBytes.toFixed(1)}GB`;
};

const formatSchedule = (snapshot: AppliedPolicy['policySnapshot']) => {
  if (!(snapshot.days?.length && snapshot.startTime && snapshot.endTime)) {
    return '상시 적용';
  }

  const days = snapshot.days.map((day) => DAY_LABEL[day] ?? day).join(', ');
  return `${days} ${snapshot.startTime}~${snapshot.endTime}`;
};

export const AppliedRestrictionsPage = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryFn: getAppliedRestrictions,
    queryKey: ['appliedRestrictions', 'self'],
  });

  if (isPending) {
    return (
      <section className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">나에게 적용된 제한 정책</h2>
        <p className="text-sm text-gray-500">적용된 정책을 불러오는 중입니다.</p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg font-semibold">나에게 적용된 제한 정책</h2>
        <p className="text-sm text-red-500">정책 정보를 불러오지 못했습니다.</p>
        <button
          className="w-fit rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700"
          onClick={async () => {
            await refetch();
          }}
          type="button"
        >
          다시 시도
        </button>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full h-fit rounded-[0.75rem] p-4 gap-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">나에게 적용된 제한 정책</h2>
          <p className="text-sm text-gray-600">
            {data.memberName} | 데이터 한도 {formatGigaBytes(data.dataLimit)}
          </p>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">차단 정책</h3>
        {data.blockPolicyResponseList.length === 0 ? (
          <p className="text-sm text-gray-500">적용된 차단 정책이 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {data.blockPolicyResponseList.map((policy) => (
              <li className="rounded-lg border border-gray-200 p-3" key={policy.id}>
                <p className="text-sm font-medium text-gray-900">{policy.name}</p>
                <p className="text-xs text-gray-600">{formatSchedule(policy.policySnapshot)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900">차단 앱</h3>
        {data.appBlockedServiceResponseList.length === 0 ? (
          <p className="text-sm text-gray-500">차단된 앱이 없습니다.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {data.appBlockedServiceResponseList.map((service) => (
              <li
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                key={service.id}
              >
                {service.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
