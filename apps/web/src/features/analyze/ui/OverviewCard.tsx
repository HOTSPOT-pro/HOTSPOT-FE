'use client';

import { cn } from '@hotspot/ui';
import type { Overview, TagType } from '@/domains/analyze';
import { TAG_LABELS } from '../lib/format';

interface OverviewCardProps {
  overview: Overview;
}

const TAG_ICON_MAP: Record<TagType, string> = {
  ENTERTAINMENT_HEAVY: '🎮',
  LATE_NIGHT_HIGH: '🌙',
  STUDY_FOCUSED: '📚',
  USAGE_SPIKE: '⚡',
};

export const OverviewCard = ({ overview }: OverviewCardProps) => {
  const { scoreInfo, tags } = overview;
  const isUp = scoreInfo.scoreDiff > 0;
  const isDown = scoreInfo.scoreDiff < 0;
  const isNeutral = scoreInfo.scoreDiff === 0;

  return (
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <p className="text-xs text-gray-400 font-medium mb-3">이번 주 요약</p>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">🍇</span>
        <div className="flex-1">
          <span className="text-5xl font-black text-gray-900 leading-none">
            {scoreInfo.totalScore}
          </span>
          <span className="text-base text-gray-400 font-normal"> / 100</span>
        </div>
        <span
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-gray-100 text-gray-600',
            isUp && 'bg-violet-100 text-violet-700',
            isDown && 'bg-red-100 text-red-600',
          )}
        >
          {isUp && `지난 주 대비 ${Math.abs(scoreInfo.scoreDiff)}점 상승`}
          {isDown && `지난 주 대비 ${Math.abs(scoreInfo.scoreDiff)}점 하락`}
          {isNeutral && '점수 유지'}
        </span>
      </div>

      <p className="text-xs text-gray-400 font-medium mb-3">점수 산정 요인</p>
      <div className="flex flex-col gap-2 mb-4">
        {scoreInfo.reason.map((i) => (
          <div
            className="flex items-center gap-8.5 bg-gray-50 rounded-xl px-3.5 py-2.5"
            key={i.exp}
          >
            <span className="text-sm font-medium text-gray-700">
              {i.exp} {i.value}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 font-medium mb-3">#TAGS</p>
      <div className="flex flex-col gap-2">
        {tags.map((tag, idx) => (
          <div className="flex items-center gap-8.5 bg-gray-50 rounded-xl px-3.5 py-2.5" key={idx}>
            <span className="text-base">{TAG_ICON_MAP[tag]}</span>
            <span className="text-sm font-medium text-gray-700">
              {TAG_LABELS[tag]?.label ?? tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
