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
        'px-4 py-1.5 rounded-full text-sm transition-all',
        isSelected
          ? 'bg-purple-600 text-white font-bold'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
};
