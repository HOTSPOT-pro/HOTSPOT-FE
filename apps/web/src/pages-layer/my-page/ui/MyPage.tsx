'use client';

import ViewRight from '@hotspot/ui/assets/images/character/view-right.svg';
import type { UserRole } from '@/domains/user/model/types';
import { AppliedRestrictionsPage } from '@/pages-layer/applied-restrictions/ui/AppliedRestrictionsPage';
import { MyPageMenu } from './MyPageMenu';

interface MyPageUserInfo {
  email: string | null;
  familyRole: UserRole | null;
  name: string | null;
  phone: string | null;
}

export const MyPage = ({ userInfo }: { userInfo: MyPageUserInfo | null }) => {
  return (
    <section className="flex flex-col h-full w-full bg-white pb-32 gap-16">
      <div className="flex w-full items-center gap-16 px-16 py-16">
        <div className="flex h-[4rem] w-[4rem] overflow-hidden rounded-xl bg-purple-100 items-center justify-center">
          <ViewRight />
        </div>
        <p className="flex flex-col space-y-2">
          <span className="font-title-title3-semibold leading-tight text-gray-900">
            {userInfo?.name ?? '-'}
          </span>
          <span className="text-[0.75rem] leading-tight text-gray-600">
            {userInfo?.email ?? '-'}
          </span>
          <span className="text-[0.75rem] leading-tight text-gray-600">
            {userInfo?.phone ?? '-'}
          </span>
        </p>
      </div>
      <MyPageMenu familyRole={userInfo?.familyRole ?? null} />
    </section>
  );
};
