import GraphDonutIcon from '@hotspot/ui/assets/icons/graph-donut.svg';
import GraphLineIcon from '@hotspot/ui/assets/icons/graph-line.svg';
import GuideIcon from '@hotspot/ui/assets/icons/guide.svg';
import RecommendIcon from '@hotspot/ui/assets/icons/recommend.svg';
import WarningCircleIcon from '@hotspot/ui/assets/icons/warning.svg';

export const ANALYZE_ADVENTAGES = [
  { description: '이번 주 사용 요약', Icon: GraphLineIcon },
  { description: '일별, 시간대별, 카테고리별 사용량 정리 및 피드백', Icon: GraphDonutIcon },
  { description: '자녀, 부모님의 사용 가이드 제시', Icon: GuideIcon },
  { description: '사용량에 기반한 정책 추천', Icon: RecommendIcon },
  { description: '심야 사용 모니터링? 주의가 필요한 사용 패턴 알림?', Icon: WarningCircleIcon },
];
