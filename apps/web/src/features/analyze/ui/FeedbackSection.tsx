'use client';

import { useState } from 'react';
import type { FinalFeedback } from '@/domains/analyze';

interface FinalFeedbackSectionProps {
  finalFeedback: FinalFeedback;
}

type ViewMode = 'child' | 'parent';

const TABS: { mode: ViewMode; label: string }[] = [
  { label: '자녀에게', mode: 'child' },
  { label: '부모님 가이드', mode: 'parent' },
];

export const FeedbackSection = ({ finalFeedback }: FinalFeedbackSectionProps) => {
  const [mode, setMode] = useState<ViewMode>('child');
  const { parent, child, policyRecommendList } = finalFeedback;

  return (
    <div className="bg-white rounded-2xl p-16 mb-12 shadow-sm">
      <h2 className="font-body-body2-bold text-gray-900 mb-12">종합 피드백</h2>

      <div className="flex gap-8 mb-12">
        {TABS.map(({ mode: m, label }) => (
          <button
            className={`px-14 py-6 rounded-full border font-body-body3 transition-all ${
              mode === m
                ? 'bg-violet-600 border-violet-600 text-white'
                : 'bg-white border-gray-200 text-gray-500'
            }`}
            key={m}
            onClick={() => setMode(m)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <p className="font-body-body3 text-gray-700 leading-relaxed bg-gray-50 rounded-xl px-12 py-10 mb-16">
        {mode === 'child' ? child : parent}
      </p>

      <div className="h-px bg-gray-100 mb-12" />

      <p className="font-body-body3-bold text-gray-700 mb-10">정책 추천</p>

      <div className="flex flex-col gap-2.5">
        {policyRecommendList.length === 0 && (
          <span className="text-center font-body-body3 text-gray-700 py-8 mb-4">
            추천 정책이 없습니다.
          </span>
        )}
        {policyRecommendList.map((policy, idx) => (
          <div className="border border-violet-100 rounded-xl p-12 bg-violet-50/50" key={idx}>
            <div className="flex items-center gap-8 mb-6">
              <span className="text-sm">🛡️</span>
              <span className="font-body-body3-bold text-violet-800">{policy.title}</span>
            </div>
            <p className="font-body-body4 text-gray-600 mb-6 leading-relaxed">
              {policy.description}
            </p>
            <p className="font-body-body4 text-violet-600 leading-snug">💡 {policy.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
