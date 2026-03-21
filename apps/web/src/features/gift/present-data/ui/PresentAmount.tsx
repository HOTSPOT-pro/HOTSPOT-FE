import { cn } from '@hotspot/ui/lib';
import { DATA_OPTIONS } from '../constants/dataOptions';

interface PresentAmountProps {
  presentAmount: number;
  handleSelect: (amount: number) => void;
}

export const PresentAmount = ({ presentAmount, handleSelect }: PresentAmountProps) => {
  return (
    <div className="gap-1 flex flex-col">
      <p className="font-title-title3-semibold">선물할 데이터 양</p>
      <p className="font-body-body3 text-gray-500">선물할 데이터 양을 선택하세요.</p>
      <GiftAmountButtons handleSelect={handleSelect} presentAmount={presentAmount} />
    </div>
  );
};

interface GiftAmountButtonsProps {
  presentAmount: number;
  handleSelect: (value: number) => void;
}

export const GiftAmountButtons = ({ presentAmount, handleSelect }: GiftAmountButtonsProps) => {
  return (
    <div className="flex w-full justify-center gap-8 pt-16 flex-wrap">
      {DATA_OPTIONS.map((amount) => {
        const isSelected = presentAmount === amount;

        return (
          <button
            className={cn(
              'px-12 py-6 rounded-full text-sm transition-all whitespace-nowrap font-heading-heading5',
              isSelected
                ? 'bg-purple-600 text-text-normal-reverse'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
            key={amount}
            onClick={(e) => handleSelect(Number(e.currentTarget.value))}
            type="button"
            value={amount}
          >
            {amount.toFixed(1)}GB
          </button>
        );
      })}
    </div>
  );
};
