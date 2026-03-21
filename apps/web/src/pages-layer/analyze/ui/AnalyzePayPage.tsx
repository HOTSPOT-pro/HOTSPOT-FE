'use client';
import { Button, Card, useModal } from '@hotspot/ui';
import CrownIcon from '@hotspot/ui/assets/icons/crown.svg';
import { ANALYZE_ADVANTAGES } from '../constants/advantages';

export const AnalyzePayPage = () => {
  const { open } = useModal();
  const handleApply = () => {
    open('daySelectorModal', {
      props: {
        type: 'NEW',
      },
    });
  };

  return (
    <div className="px-24 w-full h-full flex flex-col justify-center items-center">
      <div className="p-20 animate-diagonal rounded-3xl mb-24 shadow-md">
        <CrownIcon className="w-40 h-40 text-white" />
      </div>
      <h1 className="font-title-title1">프리미엄 분석 리포트</h1>
      <p className="font-body-body3 text-gray-600 break-keep">
        데이터 사용 패턴을 심층 분석하여 맞춤형 인사이트를 제공합니다.
      </p>
      <div className="text-left py-32 gap-12 flex flex-col">
        {ANALYZE_ADVANTAGES.map((ad, idx) => (
          <Card className="p-16 font-body-body3 flex flex-row items-center gap-12" key={idx}>
            <div className="w-fit h-fit p-10 bg-lime-100 rounded-xl text-lime-600">
              <ad.Icon className="w-16 h-16 " />
            </div>
            <p>{ad.description}</p>
          </Card>
        ))}
      </div>
      <Button onClick={handleApply}>무료로 시작하기</Button>
      <span className="font-body-body6 mt-12 text-gray-600">언제든지 취소가 가능합니다.</span>
    </div>
  );
};
