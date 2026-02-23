import type { PolicyPerUser } from '../model/type';

export const MOCK_USER_WITH_POLICIES: PolicyPerUser[] = [
  {
    blockServices: [{ description: '동영상 스트리밍 제한', id: 50, name: '유튜브' }],
    id: 101,
    limit: 50,
    name: '김철수',
    policyList: [
      { description: '표준 보안 정책', id: 1, name: '기본 보안' },
      { description: '외부 접속 허용', id: 2, name: 'VPN 접근' },
    ],
  },
  {
    blockServices: [
      { description: '오락 관련 서비스 차단', id: 51, name: '게임 사이트' },
      { description: '불법 사이트 접근 차단', id: 52, name: '도박 사이트' },
    ],
    id: 102,
    limit: 70,
    name: '이영희',
    policyList: [{ description: '표준 보안 정책', id: 1, name: '기본 보안' }],
  },
];
