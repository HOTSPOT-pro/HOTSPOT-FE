import type { UserRole } from '@/entities/user/model/types';
import { type FamilyInfoResponse, OwnerFamilyPage } from '@/pages-layer/family/ui/OwnerFamilyPage';
import { ParentFamilyPage } from '@/pages-layer/family/ui/ParentFamilyPage';
import { createServerApi } from '@/shared/api/server';
import type { ApiResponse } from '@/shared/api/types';

interface AuthInfoResponse {
  email: string;
  familyId: number;
  familyRole: UserRole;
  name: string;
  phone: string;
  subId: number;
}

const getAuthInfo = async (): Promise<AuthInfoResponse | null> => {
  try {
    const serverApi = await createServerApi();
    const { data } = await serverApi.get<ApiResponse<AuthInfoResponse>>('/api/v1/auth/info');
    return data.data;
  } catch {
    return null;
  }
};

const getFamilyInfo = async (): Promise<FamilyInfoResponse | null> => {
  try {
    const serverApi = await createServerApi();
    const { data } = await serverApi.get<ApiResponse<FamilyInfoResponse>>('/api/v1/families');
    return data.data;
  } catch {
    return null;
  }
};

const Page = async () => {
  const [authInfo, familyInfo] = await Promise.all([getAuthInfo(), getFamilyInfo()]);

  if (authInfo?.familyRole === 'OWNER') {
    return <OwnerFamilyPage familyInfo={familyInfo} />;
  }

  return <ParentFamilyPage familyInfo={familyInfo} />;
};

export default Page;
