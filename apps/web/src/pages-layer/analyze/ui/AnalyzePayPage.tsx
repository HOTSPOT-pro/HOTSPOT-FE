'use client';
import { Button, Card, useModal } from '@hotspot/ui';
import CrownIcon from '@hotspot/ui/assets/icons/crown.svg';
import { ANALYZE_ADVENTAGES } from '../constants/adventages';

interface AnalyzePayPageProps {
  onPaymentSuccess: () => void;
}

export const AnalyzePayPage = ({ onPaymentSuccess }: AnalyzePayPageProps) => {
  const { open } = useModal();
  const handleApply = () => {
    open('daySelectorModal', { props: { handleSubscribe: onPaymentSuccess } });
  };

  return (
    <div className="px-16 pt-16 pb-32 gap-16 w-full h-full flex flex-col justify-center items-center">
      <div className="p-10 animate-diagonal rounded-full shadow-md">
        <CrownIcon className="w-48 h-48 text-white" />
      </div>
      <h1 className="font-title-title2-bold">프리미엄 분석 리포트</h1>
      <p className="text-[13px] text-gray-600 break-keep">
        자녀의 데이터 사용 패턴을 심층 분석하여 맞춤형 인사이트를 제공합니다.
      </p>
      <div className="flex w-full text-left py-8 gap-8 flex-col">
        {ANALYZE_ADVENTAGES.map((ad, idx) => (
          <Card
            className="w-full p-16 font-medium text-[13px] flex flex-row items-center"
            key={idx}
          >
            <div className="w-fit h-fit p-2.5 bg-lime-100 rounded-xl text-lime-600">
              <ad.Icon className="w-20 h-20" />
            </div>
            {ad.description}
          </Card>
        ))}
      </div>
      <Button onClick={handleApply}>무료로 시작하기</Button>
      <span className="text-[12px] font-light mt-3 text-gray-600">언제든지 취소가 가능합니다.</span>
    </div>
  );
};
