import { Toggle } from '@hotspot/ui';

interface NotificationSettingItemProps {
  id: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

export const NotificationSettingItem = ({
  id,
  label,
  Icon,
  checked,
  onToggle,
}: NotificationSettingItemProps) => {
  return (
    <div className="flex flex-row items-center gap-4 py-3">
      <Icon className="shrink-0" />
      <p className="w-full text-gray-700">{label}</p>
      <Toggle checked={checked} id={id} onChange={(checked) => onToggle(checked)} />
    </div>
  );
};
