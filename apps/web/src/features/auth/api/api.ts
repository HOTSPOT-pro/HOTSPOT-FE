import { publicApi } from '@shared/api';

export const login = async ({ provider }: { provider: string }) => {
  const response = await publicApi.post(`/oauth2/authorization/${provider}`);
  if (response.data) {
    window.location.href = response.data;
  }
};
