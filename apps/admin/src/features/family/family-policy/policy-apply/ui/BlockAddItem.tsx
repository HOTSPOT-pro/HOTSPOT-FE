import { cn } from '@hotspot/ui';
import CloseCircleIcon from '@hotspot/ui/assets/icons/close-circle.svg';
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
        'flex items-center justify-between p-16 rounded-2xl cursor-pointer transition-all border',
        isApply ? 'border-red-300 bg-white' : 'border-transparent bg-gray-100',
      )}
      onClick={() => onToggle(!isApply)}
      type="button"
    >
      <div className="flex items-center gap-12 justify-between w-full">
        <div className="flex flex-row gap-12">
          <div
            className={cn(
              'min-w-32 min-h-32 w-32 h-32 flex items-center justify-center rounded-xl transition-colors',
              isApply ? 'bg-red-100' : 'bg-gray-200',
            )}
          >
            <CloseCircleIcon
              className={cn('w-16 h-16', isApply ? 'text-red-600' : 'text-gray-600')}
            />
          </div>

          <div className="text-left flex items-center">
            <div className="font-body-body4-bold">{name}</div>
          </div>
        </div>

        <div
          className={cn(
            'min-w-24 min-h-24 rounded-full flex items-center justify-center border transition-all',
            isApply ? 'bg-red-500 border-red-500' : 'bg-white border-gray-400',
          )}
        >
          {isApply ? <CloseCircleFillIcon className="w-12 h-12 text-white" /> : null}
        </div>
      </div>
    </button>
  );
};
