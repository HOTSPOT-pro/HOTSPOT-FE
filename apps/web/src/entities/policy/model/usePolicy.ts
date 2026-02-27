import { MOCK_BLOCK_SERVICES, MOCK_POLICY_LIST, MOCK_USER_WITH_POLICIES } from '../api/mockup';

export const usePolicy = () => {
  const PolicyPerFamily = MOCK_USER_WITH_POLICIES;
  const policyList = MOCK_POLICY_LIST;
  const blockList = MOCK_BLOCK_SERVICES;

  return { blockList, loading: false, PolicyPerFamily, policyList };
};
