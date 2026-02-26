import { Toggle } from '@hotspot/ui';

interface Props {
  id: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  checked: boolean;
  onToggle: (id: string, checked: boolean) => void;
}

export const NotificationSettingItem = ({ id, label, Icon, checked, onToggle }: Props) => {
  return (
    <div className="flex flex-row items-center gap-4 py-3">
      <Icon className="flex-shrink-0" />
      <p className="w-full text-gray-700">{label}</p>
      <Toggle checked={checked} id={id} onChange={(checked) => onToggle(id, checked)} />
    </div>
  );
};
