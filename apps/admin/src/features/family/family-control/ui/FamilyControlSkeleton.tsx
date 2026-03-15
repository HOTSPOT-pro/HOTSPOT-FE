import { Skeleton } from '@hotspot/ui';

export const FamilyDetailControlSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <section className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <Skeleton height="20px" width="140px" />
            <Skeleton height="12px" width="240px" />
          </div>
          <Skeleton height="36px" width="100px" />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          {[1, 2, 3].map((i) => (
            <Skeleton className="rounded-xl" height="72px" key={i} width="100%" />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col gap-6">
        <Skeleton height="20px" width="100px" />
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div className="border border-gray-100 rounded-xl p-4 space-y-4" key={i}>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Skeleton height="20px" width="60px" />
                  <Skeleton className="rounded-full" height="20px" width="40px" />
                </div>
                <Skeleton height="32px" width="60px" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="rounded-lg" height="48px" width="100%" />
                <Skeleton className="rounded-lg" height="48px" width="100%" />
              </div>
              <div className="space-y-2">
                <Skeleton height="40px" width="100%" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
