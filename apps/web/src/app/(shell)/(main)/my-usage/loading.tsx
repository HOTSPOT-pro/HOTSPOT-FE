import { Skeleton } from "@hotspot/ui";

const UsageCardSkeleton = ({
  withButton = false,
  withList = false,
}: {
  withButton?: boolean;
  withList?: boolean;
}) => {
  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <Skeleton height={24} width="8rem" />

      <div className="flex items-center gap-16">
        <Skeleton
          className="shrink-0 rounded-full"
          height="6rem"
          width="6rem"
        />
        <div className="w-full space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex items-center gap-8">
                <Skeleton className="rounded-full" height={10} width={10} />
                <Skeleton height={18} width={80} />
              </div>
              <Skeleton height={18} width={84} />
            </div>
          ))}
        </div>
      </div>

      {withList ? (
        <div className="space-y-16">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 flex items-center justify-between">
                <Skeleton height={18} width={72} />
                <Skeleton height={18} width={120} />
              </div>
              <Skeleton height={10} width="100%" />
            </div>
          ))}
        </div>
      ) : null}

      <div className="ml-auto flex items-center gap-2">
        <Skeleton height={14} width={120} />
        <Skeleton className="rounded-full" height={20} width={20} />
      </div>

      {withButton ? <Skeleton height={40} width="100%" /> : null}
    </section>
  );
};

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full px-16 pt-16 pb-32 gap-16">
      <Skeleton height={48} width="100%" />
      <UsageCardSkeleton />
      <UsageCardSkeleton />
      <UsageCardSkeleton withButton withList />
    </div>
  );
}
