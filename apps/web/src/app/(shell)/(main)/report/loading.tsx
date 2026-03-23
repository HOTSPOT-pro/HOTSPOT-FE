import { Card, Skeleton } from '@hotspot/ui';

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full pb-32 px-16 gap-16">
      <div className="rounded-2xl border border-gray-200 p-4">
        <Skeleton className="rounded-full" height={40} width="100%" />
      </div>

      <div className="flex gap-8 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton className="rounded-full shrink-0" height={36} key={index} width={72} />
        ))}
      </div>

      <Card>
        <div className="space-y-6">
          <Skeleton height={24} width={88} />
          <Skeleton height={20} width={120} />
          <Skeleton height={320} width="100%" />
        </div>
      </Card>

      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton height={24} width={120} />
            <Skeleton height={16} width={48} />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex items-center gap-16" key={index}>
              <Skeleton className="rounded-full shrink-0" height={24} width={24} />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton height={16} width={96} />
                  <Skeleton height={16} width={48} />
                </div>
                <Skeleton height={10} width="100%" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
