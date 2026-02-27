import type { Block, Policy, PolicyPerFamily, PolicyPerUser } from '../model/types';

// 1. 개별 정책을 상수로 분리
const NIGHT_LIMIT: Policy = {
  endTime: '07:00',
  id: 101,
  name: '평일 밤 데이터 제한',
  policySnapshot: { days: ['MON', 'TUE', 'WED', 'THU', 'FRI'] },
  policyType: 'TIME_LIMIT',
  startTime: '22:00',
};

const WEEKEND_BLOCK: Policy = {
  endTime: '23:59',
  id: 102,
  name: '주말 종일 차단',
  policySnapshot: { days: ['SAT', 'SUN'] },
  policyType: 'FULL_BLOCK',
  startTime: '00:00',
};

const FOCUS_MODE: Policy = {
  endTime: '19:00',
  id: 103,
  name: '학원 시간 집중 모드',
  policySnapshot: { days: ['MON', 'WED', 'FRI'] },
  policyType: 'FOCUS',
  startTime: '16:00',
};

// 2. 개별 서비스도 상수로 분리
const YOUTUBE: Block = { id: 1, name: 'YouTube', serviceCode: 'SVC_YT_01' };
const TIKTOK: Block = { id: 2, name: 'TikTok', serviceCode: 'SVC_TT_02' };
const INSTAGRAM: Block = { id: 3, name: 'Instagram', serviceCode: 'SVC_IG_03' };
const ROBLOX: Block = { id: 4, name: 'Roblox', serviceCode: 'SVC_RB_04' };

// 목록형이 필요할 때만 배열로 묶기
export const MOCK_POLICY_LIST: Policy[] = [NIGHT_LIMIT, WEEKEND_BLOCK, FOCUS_MODE];
export const MOCK_BLOCK_SERVICES: Block[] = [YOUTUBE, TIKTOK, INSTAGRAM, ROBLOX];

// 3. 이제 인덱스 대신 '객체 이름'으로 직접 할당
export const MOCK_USER_WITH_POLICIES: PolicyPerFamily = {
  familyDataAmount: 51200,
  familyId: 5001,
  familyNum: 3,
  memberPolicies: [
    {
      appBlockedServiceResponseList: [],
      blockPolicyResponseList: [],
      dataLimit: 0,
      memberId: 1,
      memberName: '김철수',
      priority: 1,
      subId: 10001,
    },
    {
      appBlockedServiceResponseList: [INSTAGRAM], // index [2] 대신 객체 직접 할당
      blockPolicyResponseList: [NIGHT_LIMIT], // index [0] 대신 객체 직접 할당
      dataLimit: 10240,
      memberId: 2,
      memberName: '이영희',
      priority: 2,
      subId: 10002,
    },
    {
      appBlockedServiceResponseList: [YOUTUBE, TIKTOK, ROBLOX],
      blockPolicyResponseList: [NIGHT_LIMIT, FOCUS_MODE],
      dataLimit: 5120,
      memberId: 3,
      memberName: '김민수',
      priority: 3,
      subId: 10003,
    },
  ],
  priorityType: 'DATA_USAGE',
};
