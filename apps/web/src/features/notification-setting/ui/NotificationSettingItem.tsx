import { Toggle } from '@hotspot/ui';

interface NotificationSettingItemProps {
  id: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  description?: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

export const NotificationSettingItem = ({
  id,
  label,
  Icon,
  checked,
  description,
  onToggle,
}: NotificationSettingItemProps) => {
  return (
    <div className="flex flex-row items-center gap-4 py-3 justify-between">
      <Icon className="shrink-0" />
      <div className="w-full text-left">
        <p className=" text-gray-700">{label}</p>
        <p className="text-[12px] text-gray-600">{description}</p>
      </div>
      <Toggle checked={checked} id={id} onChange={(checked) => onToggle(checked)} />
    </div>
  );
};
