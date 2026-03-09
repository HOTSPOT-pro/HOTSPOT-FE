import MinusIcon from '@hotspot/ui/assets/icons/minus.svg';
import PlusIcon from '@hotspot/ui/assets/icons/plus.svg';
import { DATA_OPTIONS } from '../constants/dataOptions';

interface PresentAmountProps {
  presentAmount: number;
  handleSelect: (amount: number) => void;
}

export const PresentAmount = ({ presentAmount, handleSelect }: PresentAmountProps) => {
  return (
    <div className="gap-1 flex flex-col">
      <p className="text-[13px] font-bold">선물할 데이터 양</p>
      <p className="text-[11px] text-gray-500">선물할 데이터 양을 선택하세요.</p>
      <div className="flex flex-row gap-4 items-center justify-center pt-3">
        <button
          className="p-3 border bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100"
          onClick={() => {
            handleSelect(presentAmount - 1);
          }}
          type="button"
        >
          <MinusIcon className="w-4 h-4 text-gray-500" />
        </button>
        <p className="text-[23px] font-bold">{presentAmount.toFixed(1)}GB</p>
        <button
          className="p-3 border bg-gray-50 border-gray-200 rounded-xl hover:bg-gray-100"
          onClick={() => {
            handleSelect(presentAmount + 1);
          }}
          type="button"
        >
          <PlusIcon className="w-4 h-4 text-gray-500" />
        </button>
      </div>
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
    <div className="flex w-full justify-center gap-2 pt-3">
      {DATA_OPTIONS.map((amount) => {
        const isSelected = presentAmount === amount;

        return (
          <button
            className={`
              px-4 py-2 rounded-full transition-all font-medium border
              ${isSelected ? 'bg-purple-600 text-white border-purple-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}
            `}
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
