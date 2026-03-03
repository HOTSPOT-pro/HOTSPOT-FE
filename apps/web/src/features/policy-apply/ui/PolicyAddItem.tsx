import { Toggle } from '@hotspot/ui';
import TimeIcon from '@hotspot/ui/assets/icons/time.svg';

interface PolicyAddItemProps {
  id: number;
  name: string;
  description: string;
  isApply: boolean;
  onToggle: (checked: boolean) => void;
}

export const PolicyAddItem = ({ id, name, description, isApply, onToggle }: PolicyAddItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="min-w-8 min-h-8 flex items-center justify-center rounded-xl bg-purple-100">
          <TimeIcon className="text-purple-600 w-4 h-4" />
        </div>

        <div>
          <div className="text-sm font-bold">{name}</div>
          <div className="text-xs text-gray-400">{description}</div>
        </div>
      </div>

      <Toggle checked={isApply} id={id.toString()} onChange={onToggle} />
    </div>
  );
};
