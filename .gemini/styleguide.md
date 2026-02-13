## 🚀 Frontend Code Review Style Guide

### 1. Communication
- [MUST] 모든 리뷰 코멘트는 한국어 작성을 원칙으로 한다. (단, 식별자, 에러 메시지, 기술 용어는 원문 유지)
- [MUST] 코멘트는 [문제 상황] → [근거/이유] → [해결 제안/코드 예시] 순서로 기술한다.

### 2. Architecture
- [MUST] FSD(Feature-Sliced Design) 계층 엄수: 상위 계층(App, Processes)이 하위 계층(Features, Entities, Shared)을 참조할 수 있으나, 역참조는 절대 금지한다.
- 동일 계층 내 슬라이스 간 교차 참조(Cross-import)를 금지하며, 필요시 공통 로직을 하위 계층(Shared)으로 추출한다.
- [MUST] 모노레포 격리: packages 내 공통 로직 수정 시 영향 범위를 반드시 파악하고, apps/web과 apps/admin 간의 의존성이 직접적으로 얽히지 않게 관리한다.
- [SHOULD] Barrel Export 지양: index.ts를 통한 무분별한 export는 트리 셰이킹 방해 및 순환 참조 원인이 되므로, 명확한 진입점이 필요한 경우에만 사용한다.

### 3. State & Data Fetching
- [MUST] TanStack Query 표준: 모든 비동기 상태(Server State)는 Redux/Context가 아닌 TanStack Query로 관리한다.
- [MUST] `isLoading` 분기 대신 `Suspense` 사용을 지향하며, `throwOnError: true`를 통해 에러를 상위로 전파한다.
- [MUST] Derived State(유도된 상태): props나 기존 state로 계산 가능한 값은 별도의 `useState`나 `useEffect`에 담지 않고, 렌더링 단계에서 변수로 선언하거나 `useMemo`를 사용한다.
- [SHOULD] Redux 사용 최소화: Redux는 '전역 로그아웃', '사용자 권한' 등 진정한 의미의 Global App State에만 한정한다. UI 상태는 컴포넌트 로컬이나 `useContext`로 해결한다.

### 4. Implementation
- [MUST] 선언적 프로그래밍: 로딩/에러 UI를 수동 if문으로 처리하기보다 `Suspense`와 `Error Boundary`를 활용한 선언적 구조를 유지한다.
- [MUST] `useEffect` 의존성 관리: `useEffect` 내에서 상태 업데이트 시 무한 루프 위험을 제거한다.
- 로직 분리가 가능한 경우 `useEffect`보다는 커스텀 훅이나 이벤트 핸들러 내부로 로직을 이동시킨다.
- [MUST] 익명 함수 지양: JSX 내부(`onClick={() => ...}`)에서 직접 익명 함수를 정의하는 것은 인라인 렌더링 시마다 새로운 참조를 생성하므로 지양한다. (단, 인자가 필요한 경우 제외)
- [SHOULD] Props 구조 분해 할당: 컴포넌트 인자 단계에서 명확하게 구조 분해하여 어떤 Props가 들어오는지 한눈에 파악하게 한다.

### 5. Error & Logging
- [MUST] 에러 경계(Error Boundary) 전략: 페이지 전체가 아닌, 기능 단위(Widget/Section)로 에러 바운더리를 설정하여 부분적 장애가 전체 사용자 경험을 망치지 않게 한다.
- [MUST] Reset 기능을 반드시 포함하여 사용자가 복구를 시도할 수 있게 한다.
- [MUST] 보안 및 로깅: `console.log` 및 `debugger`는 머지 전 반드시 제거한다.
- [MUST] 사용자 식별 정보(PII)가 담긴 데이터는 마스킹 처리한다.
- [SHOULD] API 에러 메시지: 백엔드 에러 메시지를 그대로 노출하기보다, 프런트엔드에서 정의한 사용자 친화적 메시지 맵핑 테이블을 사용한다.

### 6. Styling
- [MUST] 디자인 토큰 준수: 모든 수치(색상, 간격, 폰트)는 정의된 테마 값만 사용하며 임의 값(text-[#333], w-[17px]) 사용을 금지한다.
- [MUST] 스타일 변수 추출: 클래스 뭉치가 3개 이상의 속성을 포함하고 2번 이상 반복되면 변수(예: baseStyle) 또는 컴포넌트로 분리한다.
- [MUST] twMerge & clsx 사용: 조건부 스타일링 시 클래스 충돌 방지를 위해 반드시 twMerge를 사용한다.
- [SHOULD] Semantic Markup: div, span 남발을 지양하고 시맨틱 태그(main, section, button 등)를 사용하여 접근성을 확보한다.

### 7. Clean Code
- [MUST] Early Return: 복잡한 조건문은 중첩(if-else)하기보다 조건이 맞지 않을 때 빠르게 return 하여 가독성을 확보한다.
- [MUST] 매직 넘버/스트링 상수화: `if (status === 3)` 대신 `if (status === ORDER_STATUS.COMPLETED)`와 같이 열거형(Enum)이나 상수 객체를 사용한다.
- [SHOULD] 함수/컴포넌트 크기: 한 컴포넌트가 200줄을 넘어가면 역할 분리가 필요한 신호로 간주하고 리팩터링을 고려한다.