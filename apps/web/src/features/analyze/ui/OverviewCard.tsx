'use client';

import { cn } from '@hotspot/ui';
import HmmIcon from '@hotspot/ui/assets/images/character/sporty-soso.svg';
import ShockIcon from '@hotspot/ui/assets/images/character/sporty-wow.svg';
import SmileIcon from '@hotspot/ui/assets/images/character/view-right.svg';
import type { Overview } from '@/domains/analyze';
import { TAG_LABELS } from '../lib/format';

interface OverviewCardProps {
  overview: Overview;
}

export const OverviewCard = ({ overview }: OverviewCardProps) => {
  const { scoreData, tags } = overview;
  const isUp = scoreData.scoreDiff > 0;
  const isDown = scoreData.scoreDiff < 0;
  const isNeutral = scoreData.scoreDiff === 0;

  const renderIcon = () => {
    if (isUp) return <SmileIcon className=" text-violet-500" />;
    if (isDown) return <ShockIcon className=" text-red-500" />;
    return <HmmIcon className=" text-gray-400" />; // 유지 혹은 기본
  };

  return (
    <div className="bg-white rounded-2xl p-16 mb-12 shadow-sm">
      <p className="font-body-body2-bold text-gray-900 mb-12">이번 주 요약</p>

      <div className="flex items-center gap-12 mb-16">
        <span className="text-4xl">{renderIcon()}</span>
        <div className="flex-1">
          <span className="text-5xl font-black text-gray-900 leading-none">
            {scoreData.totalScore}
          </span>
          <span className="text-gray-400 font-body-body2"> / 100</span>
        </div>
        <span
          className={cn(
            'px-12 py-6 rounded-full font-body-body2-bold whitespace-nowrap bg-gray-100 text-gray-600',
            isUp && 'bg-violet-100 text-violet-700',
            isDown && 'bg-red-100 text-red-600',
          )}
        >
          {isUp && `지난 주 대비 ${Math.abs(scoreData.scoreDiff)}점 상승`}
          {isDown && `지난 주 대비 ${Math.abs(scoreData.scoreDiff)}점 하락`}
          {isNeutral && '점수 유지'}
        </span>
      </div>

      <p className="text-gray-400 font-body-body3 mb-12">점수 산정 요인</p>
      <div className="flex flex-col gap-8 mb-16">
        {scoreData.reason.map((i) => (
          <div
            className={cn(
              'flex items-center gap-10 bg-gray-50 rounded-xl px-14 py-10',
              i.value > 0 && 'bg-violet-50',
              i.value < 0 && 'bg-red-50',
            )}
            key={i.exp}
          >
            <span className="font-body-body2-bold text-gray-700">
              {i.exp} {i.value > 0 ? `+${i.value}` : `${i.value}`}
            </span>
          </div>
        ))}
      </div>

      <p className="text-gray-400 font-body-body3 mb-12">#TAGS</p>
      <div className="flex flex-row gap-8 flex-wrap">
        {tags.map((tag, idx) => (
          <div
            className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3.5 py-2.5 w-fit"
            key={idx}
          >
            <span className="font-body-body2-bold text-gray-700">
              # {TAG_LABELS[tag]?.label ?? tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
