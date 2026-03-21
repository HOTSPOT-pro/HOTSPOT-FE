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
    <div className="flex items-center justify-between p-16 bg-gray-100 rounded-2xl gap-12">
      <div className="flex items-center gap-12">
        <div className="min-w-32 min-h-32 flex items-center justify-center rounded-xl bg-purple-100">
          <TimeIcon className="text-purple-600 w-16 h-16" />
        </div>

        <div>
          <div className="font-body-body4-bold">{name}</div>
          <div className="font-body-body5 break-keep text-gray-400">{description}</div>
        </div>
      </div>

      <Toggle checked={isApply} id={id.toString()} onChange={onToggle} />
    </div>
  );
};
