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
        'flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border',
        isApply ? 'border-red-300 bg-white' : 'border-transparent bg-gray-100',
      )}
      onClick={() => onToggle(!isApply)}
      type="button"
    >
      <div className="flex items-center gap-3 justify-between w-full">
        <div className="flex flex-row gap-3">
          <div
            className={cn(
              'min-w-8 min-h-8 w-8 h-8 flex items-center justify-center rounded-xl transition-colors',
              isApply ? 'bg-red-100' : 'bg-gray-200',
            )}
          >
            <CloseCircleIcon
              className={cn('w-4 h-4', isApply ? 'text-red-600' : 'text-gray-600')}
            />
          </div>

          <div className="text-left flex items-center">
            <div className="text-sm font-bold">{name}</div>
          </div>
        </div>

        <div
          className={cn(
            'min-w-6 min-h-6 rounded-full flex items-center justify-center border transition-all',
            isApply ? 'bg-red-500 border-red-500' : 'bg-white border-gray-400',
          )}
        >
          {isApply ? <CloseCircleFillIcon className="w-3 h-3 text-white" /> : null}
        </div>
      </div>
    </button>
  );
};
