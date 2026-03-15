'use client';

import { Skeleton } from '@hotspot/ui';

export const FamilyPolicyCardSkeleton = () => {
  return (
    <div className="px-4 py-3.5 rounded-xl border border-gray-100 gap-3 flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <Skeleton height="1.25rem" width="3rem" /> {/* memberName */}
          <Skeleton className="rounded-sm" height="1.25rem" variant="rect" width="2.5rem" />{' '}
          {/* RoleChip */}
          <Skeleton className="rounded-sm" height="1.25rem" variant="rect" width="4rem" />{' '}
          {/* BlockedStateChip */}
        </div>
        <Skeleton height="1.5rem" variant="circle" width="1.5rem" /> {/* RightArrowIcon */}
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton height="0.8rem" width="8rem" />
        <div className="flex flex-row gap-2">
          <Skeleton className="rounded-lg" height="1.5rem" width="3rem" />
          <Skeleton className="rounded-lg" height="1.5rem" width="3rem" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton height="0.8rem" width="8rem" />
        <div className="flex flex-row gap-2">
          <Skeleton className="rounded-lg" height="1.5rem" width="4rem" />
          <Skeleton className="rounded-lg" height="1.5rem" width="2rem" />
        </div>
      </div>
    </div>
  );
};
