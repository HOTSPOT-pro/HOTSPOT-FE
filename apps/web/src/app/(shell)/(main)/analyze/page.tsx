'use client';

import { useState } from 'react';
// import { useSubscribeInfo } from '@/domains/analyze';
import { AnalyzePayPage, AnalyzeSelectPage } from '@/pages-layer/analyze';

const AnalyzeSection = () => {
  //화면 전환용 임시 데이터
  const [isSubscribe, setIsSubscribe] = useState(false);

  // const { subscribeData, isLoading, isError, errorMessage } = useSubscribeInfo();
  // if (isLoading) {
  //   return (
  //     <section className="p-10 text-center text-gray-400">구독 정보를 확인 중입니다...</section>
  //   );
  // }
  // if (isError) {
  //   return <section className="p-10 text-center text-red-400">{errorMessage}</section>;
  // }
  // const isSubscribed = subscribeData?.subscribed ?? false;

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
