import { MOCK_USER_WITH_POLICIES } from './mockup';

export const usePolicy = () => {
  const data = MOCK_USER_WITH_POLICIES;

  return { data, loading: false };
};
