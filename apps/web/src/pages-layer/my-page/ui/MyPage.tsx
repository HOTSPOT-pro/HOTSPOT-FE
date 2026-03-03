import ViewRight from '@hotspot/ui/assets/images/character/ViewRight.svg';
import type { UserRole } from '@/entities/user/model/types';
import { MyPageMenu } from './MyPageMenu';

interface MyPageUserInfo {
  email: string | null;
  familyRole: UserRole | null;
  name: string | null;
  phone: string | null;
}

export const MyPage = ({ userInfo }: { userInfo: MyPageUserInfo | null }) => {
  return (
    <section className="flex flex-col h-full bg-white px-4 pt-4 pb-8">
      <div className="flex items-center gap-4 pb-4">
        <div className="flex h-[4rem] w-[4rem] overflow-hidden rounded-xl bg-purple-100 items-center justify-center">
          <ViewRight />
        </div>
        <div className="space-y-0.5">
          <p className="text-[1rem] font-semibold leading-tight text-gray-900">
            {userInfo?.name ?? '-'}
          </p>
          <p className="text-[0.75rem] leading-tight text-gray-600">{userInfo?.email ?? '-'}</p>
          <p className="text-[0.75rem] leading-tight text-gray-600">{userInfo?.phone ?? '-'}</p>
        </div>
      </div>

      <MyPageMenu familyRole={userInfo?.familyRole ?? null} />
    </section>
  );
};
