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
    <div className="px-6 w-full h-full flex flex-col justify-center items-center">
      <div className="p-5 animate-diagonal rounded-3xl mb-6 shadow-md">
        <CrownIcon className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-[20px] font-bold">프리미엄 분석 리포트</h1>
      <p className="text-[13px] text-gray-600 break-keep">
        자녀의 데이터 사용 패턴을 심층 분석하여 맞춤형 인사이트를 제공합니다.
      </p>
      <div className="text-left py-8 gap-3 flex flex-col">
        {ANALYZE_ADVENTAGES.map((ad, idx) => (
          <Card className="p-4 font-medium text-[13px] flex flex-row items-center" key={idx}>
            <div className="w-fit h-fit p-2.5 bg-lime-100 rounded-xl text-lime-600">
              <ad.Icon className="w-4 h-4 " />
            </div>
            {ad.description}
          </Card>
        ))}
      </div>
      <Card className="p-5 flex flex-col gap-2 text-center text-gray-600 text-[14px] mb-4">
        <p>
          <span className="text-[28px] font-bold text-black">2,900</span>원/월
        </p>
        <p>첫 주 무료 체험 후 자동 결제 (나중에 빼도 되는 부분)</p>
      </Card>
      <Button onClick={handleApply}>무료로 시작하기</Button>
      <span className="text-[12px] font-light mt-3 text-gray-600">
        언제든지 취소 가능, 부가세 포함
      </span>
    </div>
  );
};
