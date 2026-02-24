import DownArrowIcon from '@hotspot/ui/assets/icons/arrow-down.svg';
import UpArrowIcon from '@hotspot/ui/assets/icons/arrow-up.svg';

export const OrderButton = ({
  direction,
  disabled,
  onClick,
}: {
  direction: 'up' | 'down';
  disabled: boolean;
  onClick: () => void;
}) => (
  <button
    className="p-1 hover:bg-gray-200 rounded disabled:opacity-20 transition-colors"
    disabled={disabled}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    type="button"
  >
    <div className="w-3 h-3">{direction === 'up' ? <UpArrowIcon /> : <DownArrowIcon />}</div>
  </button>
);
