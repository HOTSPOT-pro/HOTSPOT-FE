# 🔥HOTSPOT FE
HOTSPOT은 가족 구성원의 데이터 사용량을 실시간으로 동기화하고, 관리자(부모)가 설정한 정책에 따라 자녀의 데이터 접근을 즉각적으로 제어하는 스마트 플랫폼입니다. 100만 가상 사용자의 트래픽 시뮬레이션을 견디는 고성능 실시간 대시보드와 일관된 사용자 경험을 제공합니다.

## ⚙️핵심 FE 기능

### 1. 실시간 가족 데이터 통합 대시보드
- 가족 구성원 전체의 데이터 소진 현황을 실시간으로 집계해 도넛 차트 및 막대 바 형태로 시각화합니다.
- 복수 구성원이 동시에 데이터를 소진해도 잔여량 소진 시점과 차단 상태가 모든 단말에서 일관되게 반영됩니다.

### 2. 정책 기반 역할별 관리 시스템
- 관리자, 대표, 부모, 자녀의 세 사용자 역할을 만들고 이에 따른 권한별 메뉴 구성 및 기능 제한을 해두었습니다.
- 데이터 차단 및 허용 정책을 즉시 반영하며, 상태 변화에 따른 UI 피드백을 실시간으로 제공합니다.

### 3. 데이터 시각화
- 렌더링 최적화 예정

## 🏗️기술 스택

- Language: Typescript
- Framework: Next.js, React
- Styling: Tailwind CSS
- Visualization: Recharts
- State Management: Redux Toolkit, TanStack Query

## 📂디렉토리 구조
- apps
    - web: 사용자 서비스
    - admin: 관리자 서비스
- packages
    - 두 서비스의 공통 컴포넌트, 함수 등

### apps(실 서비스 단) 내부 구조
```
src/
├── 📂 app/                      # [App Layer] 애플리케이션 설정 및 진입점
│   ├── 📂 (routes)              # App Router 기반 페이지 경로 정의
│   ├── 📂 _providers/           # QueryClient, StoreProvider 등 전역 설정
│   ├── layout.tsx               # Root Layout 및 전역 Provider 연결
│   └── page.tsx                 # 서비스 메인 진입 페이지
│
├── 📂 pages-layer/              # [Pages Layer] 화면 단위의 페이지 구성
│   ├── 📂 home/                 # 도메인 별로 구성
│   └── 📂 report/
│       └── index.ts             # 내부 요소 중 필요한 것만 골라 export
│
├── 📂 widgets/                  # [Widgets Layer] 독립적인 비즈니스 블록 조합
│   ├── 📂 header/               # 공통 네비게이션 헤더
│   └── 📂 report/               # features를 모아 만든 블록
│
├── 📂 features/                 # [Features Layer] 사용자 액션 및 비즈니스 기능
│   ├── 📂 auth-by-email/        # 이메일 로그인 로직 및 폼 UI
│   ├── 📂 user-selector/        # 유저 선택 등 실제 상호작용 기능
│   └── 💡 핵심 역할              # 동작 중심(API 호출, 상태 변경, 비즈니스 로직)
│
├── 📂 entities/                 # [Entities Layer] 비즈니스 도메인 모델 및 데이터 단위
│   ├── 📂 user/                 # 사용자 정보 모델, 프로필 UI, 타입 정의
│   ├── 📂 report/               # 리포트 데이터 모델, 호출 api 정의, 데이터 표시 ui 등
│   └── 💡 핵심 역할              # 데이터 중심(도메인 객체 시각화 및 타입 정의)
│
└── 📂 shared/                   # [Shared Layer] 재사용 가능한 인프라 모듈
    ├── 📂 api/                  # Axios/Fetch 인스턴스 및 공통 API 로직
    ├── 📂 ui/                   # 디자인 시스템 기반 원자적(Atomic) 컴포넌트
    │                                  (Button, Input) 등
    ├── 📂 lib/                  # 유틸리티 함수, 공통 Hooks, 상수 정의
    └── 💡 핵심 역할              # 비즈니스 로직이 없는 순수 공통 모듈
```
### packages(공통) 내부 구조
```
src/
├── 📂 assets                    # 정적 이미지 소스 모음 (코드적 가공이 필요한 것만)
├── 📂 components                # 공통 컴포넌트
├── 📂 lib                       # 공통 함수
└── 📂 styles                    # 전역 스타일 정의
```

## 🏃실행 방법
pnpm 및 필요 라이브러리 설치
```
npm install -g pnpm
pnpm install
```
실행
```
#전체 실행
pnpm run start

#web(사용자) 실행
pnpm --filter=@hotspot/web run start

#admin(관리자) 실행
pnpm --filter=@hotspot/admin run start

#공통 컴포넌트 storybook 실행
pnpm --filter=@hotspot/ui storybook
```
## 🖥️페이지 소개
(확정중)

### Web

### Admin
