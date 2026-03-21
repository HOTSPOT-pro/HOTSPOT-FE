import { cn } from '@hotspot/ui';
import CloseCircleFillIcon from '@hotspot/ui/assets/icons/close-circle-fill.svg';

interface BlockAddItemProps {
  name: string;
  isApply: boolean;
  onToggle: (checked: boolean) => void;
}

export const BlockAddItem = ({ name, isApply, onToggle }: BlockAddItemProps) => {
  return (
    <button
      aria-label={`${name} ${isApply ? '해제' : '적용'}`}
      aria-pressed={isApply}
      className={cn(
        'flex items-center justify-between p-16 rounded-2xl cursor-pointer transition-all',
        isApply ? 'bg-red-100' : 'bg-gray-100',
      )}
      onClick={() => onToggle(!isApply)}
      type="button"
    >
      <div className="flex items-center gap-8 justify-between w-full">
        <div className="flex flex-row gap-8">
          <div className="text-left flex items-center">
            <div className="text-sm font-bold">{name}</div>
          </div>
        </div>

        <div
          className={cn(
            'h-20 w-20 shrink-0 rounded-full border transition-all flex items-center justify-center',
            isApply ? 'bg-red-500 border-red-500' : 'bg-white border-gray-400',
          )}
        >
          {isApply ? <CloseCircleFillIcon className="w-20 h-20 text-white" /> : null}
        </div>
      </div>
    </button>
  );
};
