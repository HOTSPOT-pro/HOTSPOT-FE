import { Skeleton } from "@hotspot/ui";

const FamilyCardSkeleton = ({
  type,
}: {
  type: "donut" | "policy" | "timeline";
}) => {
  return (
    <section className="elevation-1 flex flex-col w-full h-fit rounded-12 p-16 gap-16">
      <Skeleton height={24} width={type === "donut" ? "10rem" : "9rem"} />

      {type === "donut" ? (
        <>
          <div className="flex w-full justify-center">
            <Skeleton
              className="rounded-full"
              height="17.5rem"
              width="17.5rem"
            />
          </div>
          <div className="h-px bg-gray-200" />
          <div className="space-y-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="space-y-4" key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <Skeleton className="rounded-full" height={10} width={10} />
                    <Skeleton height={16} width={72} />
                  </div>
                  <Skeleton height={16} width={120} />
                </div>
                <Skeleton height={10} width="100%" />
              </div>
            ))}
          </div>
        </>
      ) : null}

      {type === "policy" ? (
        <>
          <div className="h-px bg-gray-200" />
          <div className="space-y-4">
            <Skeleton height={16} width={64} />
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                className="rounded-lg border border-gray-200 p-8 space-y-4"
                key={index}
              >
                <Skeleton height={16} width="45%" />
                <Skeleton height={14} width="70%" />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Skeleton height={16} width={56} />
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  className="rounded-full"
                  height={28}
                  key={index}
                  width={72}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}

      {type === "timeline" ? (
        <div className="space-y-12">
          <div className="flex items-center gap-12">
            <Skeleton height={12} width={28} />
            <Skeleton height={12} width="100%" />
          </div>
          {Array.from({ length: 7 }).map((_, index) => (
            <div className="flex items-center gap-8" key={index}>
              <Skeleton className="rounded-full" height={24} width={24} />
              <Skeleton height={20} width="100%" />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default function Loading() {
  return (
    <div className="flex flex-col w-full h-full px-16 pt-16 pb-32 gap-16">
      <Skeleton height={48} width="100%" />
      <FamilyCardSkeleton type="donut" />
      <FamilyCardSkeleton type="policy" />
      <FamilyCardSkeleton type="timeline" />
    </div>
  );
}
