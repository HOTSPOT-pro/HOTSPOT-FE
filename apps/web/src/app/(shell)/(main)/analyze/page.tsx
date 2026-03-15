'use client';

import { useState } from 'react';
import { AnalyzePayPage, AnalyzeSelectPage } from '@/pages-layer/analyze';

const AnalyzeSection = () => {
  const [isSubscribe, setIsSubscribe] = useState(false);

  if (isSubscribe === null) {
    return (
      <section>
        <p>구독 정보를 확인 중입니다...</p>
      </section>
    );
  }

  return (
    <section>
      {isSubscribe ? (
        <AnalyzeSelectPage />
      ) : (
        <AnalyzePayPage onPaymentSuccess={() => setIsSubscribe(true)} />
      )}
    </section>
  );
};

export default AnalyzeSection;
