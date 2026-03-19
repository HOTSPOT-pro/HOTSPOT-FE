# 🔥HOTSPOT FE
<img width="924" height="520" alt="image" src="https://github.com/user-attachments/assets/637baee4-1956-4e63-85af-89461f7d0120" />
<img width="924" height="520" alt="image" src="https://github.com/user-attachments/assets/ebdb6a33-e4eb-4653-b76c-0287716d8467" />

HOTSPOT은 가족 구성원의 데이터 사용량을 실시간으로 동기화하고, 관리자(부모)가 설정한 정책에 따라 자녀의 데이터 접근을 즉각적으로 제어하는 스마트 플랫폼입니다. 100만 가상 사용자의 트래픽 시뮬레이션을 견디는 고성능 실시간 대시보드와 일관된 사용자 경험을 제공합니다.

## ⚙️핵심 기능
<img width="924" height="520" alt="image" src="https://github.com/user-attachments/assets/fc0b61a9-b7be-49d7-9454-e7ee3043bc17" />
<img width="924" height="520" alt="image" src="https://github.com/user-attachments/assets/83b04276-8ce7-456c-bf26-91fb5014cc0b"/>
<img width="924" height="520" alt="image" src="https://github.com/user-attachments/assets/e0a310da-b8f3-4164-9231-4c976e688108"/>
<!-- <img width="924" height="520" alt="image" src="https://github.com/user-attachments/assets/af029be0-6fe7-415d-bbcf-7db548acf720" /> -->

### 1. 실시간 가족 데이터 통합 대시보드
- 가족 구성원 전체의 데이터 소진 현황을 실시간으로 집계해 도넛 차트 및 막대 바 형태로 시각화합니다.
- 복수 구성원이 동시에 데이터를 소진해도 잔여량 소진 시점과 차단 상태가 모든 단말에서 일관되게 반영됩니다.

### 2. 정책 기반 역할별 관리 시스템
- 백오피스를 사용하는 슈퍼 관리자 권한을 따로 두었습니다.
- 사용자엔 대표, 부모, 자녀의 세 역할을 만들었으며 이에 따른 권한별 메뉴 구성 및 기능 제한을 해두었습니다.
- 데이터 차단 및 허용 정책을 즉시 반영하며, 상태 변화에 따른 UI 피드백을 실시간으로 제공합니다.

### 3. 데이터 시각화
- 100만 가상 사용자의 트래픽 시뮬레이션을 견디는 실시간 UI를 처리하고 유저별로 상태를 동기화합니다.
- 신뢰성과 안정성 확보를 위해 E2E 테스트를, 렌더링 최적화를 위해 접근성 테스트를 예정 중입니다.

## 🖥️페이지 소개

### Web(사용자)

## 로그인
<p align="center"><img width="300" alt="image" src="https://github.com/user-attachments/assets/a2d678f4-dc62-4998-8f59-6dc6a3934c81" /></p>

- 카카오 소셜 로그인
- 구글 소셜 로그인

회선에 묶여있지 않을 경우 이용 불가.

## 온보딩

<p align="center"> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/1eebdfd7-33dc-450e-bf32-c947a4ea46fa" /> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/9b98cb1b-0777-4845-b034-a208dbb66a6d" /> </p>

- 생년월일, 전화번호 입력
- 약관 동의

회선 정보를 바탕으로 회원가입 완료.

<p align="center"><img width="28%" alt="image" src="https://github.com/user-attachments/assets/3cbf0b1c-4246-4000-b1b3-2cb25c13cc43" /><img width="28%" alt="image" src="https://github.com/user-attachments/assets/12b7f44f-76e4-4476-86db-269df60cce80" />
</p>
- 홈으로 이동할지 새로운 가족을 생성할지 선택 가능.
- 새로운 가족을 생성해 여러 구성원 추가 가능.

## 가족 대시보드

<p align="center"> <img width="300" alt="image" src="https://github.com/user-attachments/assets/ed4e9bed-3e7e-46ea-ad0c-0bd26876ed65" />
 </p>

- `구성원 별 사용량/가족 데이터 총량`을 도넛 차트로 표시
- `구성원 별 한도 및 사용량`을 프로그래스 바로 표시
- 나에게 적용된 정책 확인
- 새로고침으로 사용량 갱신 가능

## 내 대시보드

<p align="center"> <img width="300" alt="image" src="https://github.com/user-attachments/assets/44939fdd-92d6-4def-a179-70474deb7922" />
 </p>

- 요금제에 따른 `내 개별 데이터 사용량/내 개별 데이터 총량`을 도넛 차트로 표시
- 월별 데이터 사용량
- `선물받은 데이터 사용량/선물받은 데이터 양`을 표시
- 선물받은 데이터 건수, 선물한 데이터 건수

## 알림 페이지

<p align="center"> <img width="300" alt="image" src="https://github.com/user-attachments/assets/f994688e-701d-4da5-9925-77c8055c780d" /> </p>

- 개인 데이터 임계치(50%/30%/10%/0%) 알림
- 가족 공유 데이터 임계치 알림
- 선물 데이터 임계치 알림
- 시간 차단 정책 알림(적용/해제)
- 즉시 차단 정책 알림
- 앱/서비스 이용 차단 알림
- 데이터 선물 알림
- SSE로 알림을 수신

## 리포트 페이지

<p align="center"> <img width="300" alt="image" src="https://github.com/user-attachments/assets/a7ad99a5-5c61-4462-b387-1f68d0b2a490" />
 </p>

- 월/일별 전체, 개인별 사용량 추이 확인
- 월/일별 개인별 앱 상세 사용량 확인

## AI 리포트 페이지
<p align="center"><img width="300" height="1575" alt="image" src="https://github.com/user-attachments/assets/05fb5fe6-f3cb-4c19-829e-1433f4690184" /></p>

- 리포트 신청 및 수령일 지정
- 리포트 수령일 변경
- 리포트 구독 취소
- 서비스 신청시 구성원별 AI 리포트 조회 가능
- 이전 리포트 조회(히스토리)

## 마이페이지

<p align="center">
    <img width="28%" alt="image" src="https://github.com/user-attachments/assets/c3c11668-dd0b-4924-84bf-d4cf79f6eb78" /> </p>

- 대표, 부모 메뉴
    - 가족 관리 페이지
    - 가족 정책 페이지
- 일반 메뉴(공통)
    - 알림 설정
    - 데이터 선물하기
    - 로그아웃
    - 회원탈퇴

## 가족 관리 페이지

<p align="center"> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/41e93a5a-cf6c-4d98-9aa0-73ad51869749" />
 <img width="28%" alt="image" src="https://github.com/user-attachments/assets/053cd3f2-bee8-4bdc-bffa-defb72eae937" />

 </p>

- 대표자 기능
    - 구성원 추가(가족관계증명서 첨부 필요)
    - 구성원 권한 변경
    - 구성원 삭제
- 부모 기능(공통)
    - 구성원 이름, 전화번호, 역할 조회

## 정책 페이지

<p align="center"> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/67b8285e-5058-49ec-bc8b-5f0d4779cd16" />
 <img width="28%" alt="image" src="https://github.com/user-attachments/assets/214b0742-3354-4723-9b91-c3ae2b83ea71" /> </p> <p align="center"> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/e2a26189-0788-4380-b522-cde98ce00447" /> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/d9d6c5ac-a3bf-4026-aadf-43e7364a1d1b" /> </p> <p align="center"> <img width="300" alt="image" src="https://github.com/user-attachments/assets/1efc702a-aaee-48bf-87f6-01f387f42591" /> </p>

- 대표자 기능
    - 구성원 한도, 적용된 정책, 차단된 서비스 수정
    - 구성원 즉시 차단

- 부모 기능(공통)
    - 구성원 한도, 적용된 정책, 차단된 서비스 확인

<p align="center">
<img width="28%" alt="image" src="https://github.com/user-attachments/assets/e3562dcc-c9d2-47d8-98ef-f1584b38b3b6" />
<img width="28%" alt="image" src="https://github.com/user-attachments/assets/167abb07-cb1f-47f4-9303-83b641ee8567" />
<img width="28%" alt="image" src="https://github.com/user-attachments/assets/673cfca3-eed0-4db0-bff1-c2e47e6f9ab6" />
</p>

- 대표자 기능
    - 가족에 적용할 커스텀 정책 생성(탬플릿 불러오기 가능)/수정/삭제
    - 적용 정책에서 데이터 우선순위 지정(선착순/우선순위)



## 데이터 선물 페이지

<p align="center"> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/a7d0b50b-f2fc-4041-bd60-ad5606257460" /> <img width="28%" alt="image" src="https://github.com/user-attachments/assets/ad54153d-55eb-479b-8137-d3f55bb805e5" /> </p>

- 구성원에게 데이터 선물
- 데이터 선물한 내역
- 데이터 선물받은 내역

## 알림 설정 페이지

<p align="center"> <img width="300" alt="image" src="https://github.com/user-attachments/assets/8aa694ab-b6b3-4994-a4e3-3a717091449d" /> </p>

- 알림
    - 임계치 알림 설정
    - 정책 적용/해제 알림 설정
    - 앱 서비스 차단 적용/해제 알림 설정
    - 선물받은 데이터 알림 설정

### Admin(관리자)

## 로그인

<p align="center"> <img width="600" alt="image" src="https://github.com/user-attachments/assets/df5c7891-aada-4fda-ac79-3610c182d191" />
 </p>

- 관리자 키로 로그인

## 가족 조회

<p align="center"> <img width="600" alt="image" src="https://github.com/user-attachments/assets/d0db39b2-c3d0-4773-99be-92f8a976dfd3" />
 </p>

- 전화번호를 통해 가족 검색
- 상세 버튼을 누르면 가족 상세 페이지로 이동

## 가족 상세 페이지

<p align="center"> <img width="600" alt="image" src="https://github.com/user-attachments/assets/74eb2448-79fe-4017-ac7d-b061c2199bd0" />
    <img width="600" alt="image" src="https://github.com/user-attachments/assets/b63d86df-43f3-4e46-be2d-67dc5604a1c6" />
    <img width="600" alt="image" src="https://github.com/user-attachments/assets/8feff8f5-d26c-4f0c-a32f-399fb257ba46" />
 </p>

- `구성원 별 사용량/가족 데이터 총량`을 도넛 차트로 표시
- 요금제에 따른 `개별 데이터 사용량/개별 데이터 총량`을 프로그래스 바로 표시
- `선물받은 데이터 사용량/선물받은 데이터 양`을 받은 선물 별 프로그래스 바로 표시

- 구성원 권한 변경
- 구성원 즉시 차단
- 구성원 한도 설정
- 구성원 별 정책, 차단 서비스 적용

## 정책 관리 페이지

<p align="center"> <img width="35%" alt="image" src="https://github.com/user-attachments/assets/b82754b6-f57a-4995-9f4a-45535e902fe7" />
 <img width="35%" alt="image" src="https://github.com/user-attachments/assets/353018ec-caae-4638-9a2f-9ca792857a0c" />
 </p>

- 정책 추가 및 정책 삭제
- 정책 활성/비활성

## 구성원 추가 페이지/구성원 삭제 페이지/가족 생성 페이지

<p align="center"> <img width="600" alt="image" src="https://github.com/user-attachments/assets/069832f7-a508-4d46-a81f-89c5577ac30d" />
 </p>

- 대기 중인 가족 구성원 신청 승인/거부
- 승인한 신청 보기
- 거부한 신청 보기
- 취소된 신청 보기

## 🏗️기술 스택

- Language: Typescript
- Framework: Next.js, React
- Styling: Tailwind CSS
- Visualization: Recharts
- State Management: Redux Toolkit, TanStack Query
- Package Manager: pnpm

추가적으로 디자인 토큰을 체계화하고, 빌드/캐시 최적화를 진행할 예정.

## 📂디렉토리 구조
한정된 자원(한 달, 2인) 내에서 최대한의 효율을 내기 위해 공통되는 컴포넌트나 함수, 스타일을 정의해놓고 이를 가능한 한 활용하는 방식으로 개발하고자 Turborepo 기반 monorepo 구성을 차용.
- apps
    - web: 사용자 서비스
    - admin: 관리자 서비스
- packages
    - 두 서비스의 공통 컴포넌트, 함수 등

### apps(실 서비스 단) 내부 구조
컴포넌트의 재사용을 추구하고자 FSD 아키텍처를 기반으로 폴더 구성.
```
src/
├── 📂 app/                      # [App Layer] 애플리케이션 설정 및 진입점
│   ├── 📂 (shell)              # App Router 기반 페이지 경로 정의
│   ├── 📂 _providers/           # QueryClient, StoreProvider 등 전역 설정
│   ├── layout.tsx               # Root Layout 및 전역 Provider 연결
│   └── page.tsx                 # 서비스 메인 진입 페이지
│
├── 📂 pages-layer/              # [Pages Layer] 화면 단위의 페이지 구성
│   └── 📂 report/
│       └── index.ts             # 내부 요소 중 필요한 것만 골라 export
│
├── 📂 widgets/                  # [Widgets Layer] 독립적인 비즈니스 블록 조합
│   ├── 📂 header/
│   └── 📂 report/
│
├── 📂 features/                 # [Features Layer] 사용자 액션 및 비즈니스 기능
│   ├── 📂 auth/                 # ex) 이메일 로그인 로직 및 폼 UI
│   └── 📂 user-selector/        # ex) 유저 선택 등 실제 상호작용 기능
│
├── 📂 domains/                 # [Entities Layer] 비즈니스 도메인 모델 및 데이터 단위
│   ├── 📂 user/                 # ex) 사용자 정보 모델, 프로필 UI, 타입 정의
│   └── 📂 report/               # ex) 리포트 데이터 모델, 호출 api, 데이터 표시 ui 등
│
└── 📂 shared/                   # [Shared Layer] 재사용 가능한 순수 공통 모듈
    ├── 📂 api/                  # Axios/Fetch 인스턴스 및 공통 API 로직
    ├── 📂 assets/               # 정적 이미지 소스 모음
    ├── 📂 constants/            # 상수값 모음
    ├── 📂 store/                # 전역 변수(RTK) 훅
    ├── 📂 ui/                   # 디자인 시스템 기반 원자적(Atomic) 컴포넌트
    └── 📂 lib/                  # 유틸리티 함수, 공통 Hooks, 상수 정의
```
각 layer 밑으로 slices(`user, post 등 기능 분류`), segments(`ui, model, api 등 구현을 위한 세부사항`)가 들어간다.
### packages(공통) 내부 구조
```
ui/src/
├── 📂 assets            # 정적 이미지 소스 모음 (코드적 가공이 필요한 것만)
├── 📂 components        # 공통 컴포넌트
├── 📂 lib               # 공통 함수
└── 📂 styles            # 전역 스타일 정의
└── index.ts             # 필요 파일들을 외부로 빼는 module
```

## 🏃실행 방법
- 버전
    - Node.js 버전: 18 이상 권장
    - Package Manager 버전: pnpm@10.29.3
- .env 파일 구성 및 설정 방법
    
    ```tsx
    // apps/admin에 하나 apps/web에 하나
    // apps/admin
    NEXT_PUBLIC_ADMIN_BASE_URL=관리자 서버 링크
    // apps/web
    NEXT_PUBLIC_BASE_URL=유저 서버 링크
    ```
    
- pnpm 및 필요 라이브러리 설치
    
    ```
    npm install -g pnpm
    pnpm install
    ```
    
- 실행
    
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
#공통 컴포넌트 storybook 실행
pnpm --filter=@hotspot/ui storybook
```
