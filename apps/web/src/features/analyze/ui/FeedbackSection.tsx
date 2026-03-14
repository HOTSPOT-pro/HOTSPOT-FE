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
    <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 mb-3">종합 피드백</h2>

      <div className="flex gap-2 mb-3">
        {TABS.map(({ mode: m, label }) => (
          <button
            className={`px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
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

      <p className="text-[13px] text-gray-700 leading-relaxed bg-gray-50 rounded-xl px-3 py-2.5 mb-4">
        {mode === 'child' ? child : parent}
      </p>

      <div className="h-px bg-gray-100 mb-3" />

      <p className="text-[13px] font-semibold text-gray-700 mb-2.5">정책 추천</p>

      <div className="flex flex-col gap-2.5">
        {policyRecommendList.map((policy, idx) => (
          <div className="border border-violet-100 rounded-xl p-3 bg-violet-50/50" key={idx}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm">🛡️</span>
              <span className="text-[13px] font-semibold text-violet-800">{policy.title}</span>
            </div>
            <p className="text-[12px] text-gray-600 mb-1.5 leading-relaxed">{policy.description}</p>
            <p className="text-[11px] text-violet-600 leading-snug">💡 {policy.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
