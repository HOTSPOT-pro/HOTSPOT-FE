import { Skeleton } from '@hotspot/ui';

export const FamilyDetailControlSkeleton = () => {
  return (
    <div className="flex flex-col gap-20">
      <section className="bg-white rounded-xl p-20 border border-gray-100 shadow-sm flex flex-col gap-20">
        <div className="flex justify-between items-center">
          <div className="space-y-8">
            <Skeleton height="20px" width="140px" />
            <Skeleton height="12px" width="240px" />
          </div>
          <div className="flex flex-row gap-8">
            <Skeleton height="54px" width="120px" />
            <Skeleton height="54px" width="76px" />
          </div>
        </div>
        <div className="flex flex-col gap-12 mt-8">
          {[1, 2, 3].map((i) => (
            <Skeleton className="rounded-xl" height="60px" key={i} width="100%" />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-20 border border-gray-100 shadow-sm flex flex-col gap-24">
        <Skeleton height="20px" width="100px" />
        <div className="flex flex-col gap-12">
          {[1, 2].map((i) => (
            <div className="border border-gray-100 rounded-xl p-12 space-y-12" key={i}>
              <div className="flex justify-between">
                <div className="flex gap-8">
                  <Skeleton height="20px" width="60px" />
                  <Skeleton className="rounded-full" height="20px" width="40px" />
                </div>
                <Skeleton height="32px" width="60px" />
              </div>
              <div className="grid grid-cols-2 gap-16">
                <Skeleton className="rounded-lg" height="48px" width="100%" />
                <Skeleton className="rounded-lg" height="48px" width="100%" />
              </div>
              <div className="space-y-8">
                <Skeleton height="40px" width="100%" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
