import { cn } from '@hotspot/ui/lib';

export const Chip = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        'px-12 py-6 rounded-full text-sm transition-all whitespace-nowrap font-heading-heading5',
        isSelected
          ? 'bg-purple-600 text-text-normal-reverse'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};
