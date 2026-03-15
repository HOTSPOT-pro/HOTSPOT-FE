'use client';

import { Skeleton } from '@hotspot/ui';

export const FamilyRealtimeStatusSkeleton = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-5">
      <section className="flex flex-col w-full h-fit rounded-xl p-4 gap-4 bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)]">
        <Skeleton height="20px" width="120px" />

        <div className="flex w-full justify-center items-center py-2">
          <Skeleton height="270px" variant="circle" width="270px" />
        </div>

        <div className="h-px bg-gray-100" />

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div className="space-y-2" key={i}>
              <div className="flex justify-between">
                <Skeleton height="14px" width="60px" />
                <Skeleton height="14px" width="100px" />
              </div>
              <Skeleton className="rounded-full" height="8px" width="100%" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.05)] px-5 py-4 flex flex-col gap-3">
        <Skeleton height="20px" width="80px" />

        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <article className="border border-gray-100 rounded-xl p-4 flex flex-col gap-4" key={i}>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Skeleton height="20px" width="50px" />
                  <Skeleton className="rounded-full" height="20px" width="40px" />
                  <Skeleton className="rounded-full" height="20px" width="60px" />
                </div>
                <Skeleton height="14px" width="80px" />
              </div>

              {/* 카드 본문: 3개의 프로그레스 바 영역 */}
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div className="space-y-2" key={j}>
                    <div className="flex justify-between">
                      <Skeleton height="12px" width="70px" />
                      <Skeleton height="12px" width="90px" />
                    </div>
                    <Skeleton className="rounded-full" height="10px" width="100%" />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="flex justify-end pt-2">
          <Skeleton height="12px" width="150px" />
        </div>
      </section>
    </div>
  );
};
