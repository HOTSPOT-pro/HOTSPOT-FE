import { cn, Toggle } from '@hotspot/ui';
import TimeIcon from '@hotspot/ui/assets/icons/time.svg';

interface PolicyAddItemProps {
  id: number;
  name: string;
  description: string;
  isApply: boolean;
  onToggle: (checked: boolean) => void;
  disable: boolean;
}

export const PolicyAddItem = ({
  id,
  name,
  description,
  isApply,
  onToggle,
  disable,
}: PolicyAddItemProps) => {
  return (
    <div className="flex items-center justify-between p-16 bg-gray-100 rounded-2xl">
      <div className="flex items-center gap-12">
        <div
          className={cn(
            'p-4 flex items-center justify-center rounded-xl bg-purple-100',
            disable && 'bg-gray-200',
          )}
        >
          <TimeIcon className={cn('text-purple-600 w-20 h-20', disable && 'text-gray-600 ')} />
        </div>

        <div>
          <div className={cn('text-sm font-bold', disable && 'text-gray-500')}>
            {name}
            {disable && '(비활성)'}
          </div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
      </div>

      <Toggle checked={isApply} disabled={disable} id={id.toString()} onChange={onToggle} />
    </div>
  );
};
