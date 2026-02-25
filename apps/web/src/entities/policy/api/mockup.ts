import type { Policy, PolicyPerUser } from '../model/type';

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

export const MOCK_POLICY_LIST: Policy[] = [
  {
    description: '사내 표준 단말 보안 가이드라인을 일괄 적용합니다.',
    id: 1,
    name: '기본 보안 정책',
  },
  { description: '외부망에서 사내 인트라넷 접근을 허용합니다.', id: 2, name: 'VPN 원격 접속' },
  {
    description: '기밀 유출 방지를 위해 사내 앱 캡처 기능을 제한합니다.',
    id: 3,
    name: '화면 캡처 방지',
  },
  {
    description: '로그인 시 모바일 OTP를 통한 추가 인증을 요구합니다.',
    id: 4,
    name: '2단계 인증(2FA)',
  },
  {
    description: '특정 용량 이상의 외부 메일 첨부 파일 전송을 통제합니다.',
    id: 5,
    name: '이메일 첨부 제한',
  },
  {
    description: '사용자의 접속 기록을 90일간 보안 서버에 저장합니다.',
    id: 6,
    name: '로그 보존 정책',
  },
  {
    description: '탈옥/루팅된 기기의 서비스 접속을 즉시 차단합니다.',
    id: 7,
    name: '단말기 무결성 검사',
  },
];

export const MOCK_BLOCK_SERVICES: Policy[] = [
  {
    description: '업무 집중도를 위해 동영상 스트리밍 접속을 제한합니다.',
    id: 50,
    name: '유튜브(YouTube)',
  },
  {
    description: '배틀그라운드, 롤 등 주요 게임 서버 접속을 차단합니다.',
    id: 51,
    name: '온라인 게임',
  },
  {
    description: '방송통신심의위원회 지정 유해 사이트 접근을 금지합니다.',
    id: 52,
    name: '불법/도박 사이트',
  },
  {
    description: '구글 드라이브, 드롭박스로의 파일 업로드를 차단합니다.',
    id: 53,
    name: '개인용 클라우드',
  },
  {
    description: '페이스북, 인스타그램, 틱톡 접속을 통제합니다.',
    id: 54,
    name: '소셜 미디어(SNS)',
  },
  {
    description: '카카오톡 PC버전 및 텔레그램 등의 사용을 제한합니다.',
    id: 55,
    name: '외부 메신저',
  },
  {
    description: '파일 공유 프로토콜을 이용한 대용량 다운로드를 막습니다.',
    id: 56,
    name: 'P2P/토렌트',
  },
  {
    description: '개인용 네이버, 지메일 접속 및 메일 발송을 차단합니다.',
    id: 57,
    name: '웹메일 제한',
  },
];
