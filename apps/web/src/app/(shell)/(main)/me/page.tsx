import type { UserRole } from '@/entities/user/model/types';
import { MyPage } from '@/pages-layer/my-page/ui/MyPage';
import { createServerApi } from '@/shared/api/server';
import type { ApiResponse } from '@/shared/api/types';

interface AuthInfoResponse {
  subId: number;
  familyId: number;
  name: string;
  email: string;
  phone: string;
  familyRole: UserRole;
}

const getAuthInfo = async () => {
  try {
    const serverApi = await createServerApi();
    const { data } = await serverApi.get<ApiResponse<AuthInfoResponse>>('/api/v1/auth/info');

    return data.data;
  } catch {
    return null;
  }
};

const Page = async () => {
  const authInfo = await getAuthInfo();

  return (
    <MyPage
      userInfo={
        authInfo
          ? {
              email: authInfo.email,
              familyRole: authInfo.familyRole,
              name: authInfo.name,
              phone: authInfo.phone,
            }
          : null
      }
    />
  );
};

export default Page;
