import LeftArrow from '@hotspot/ui/assets/icons/arrow-left.svg';
import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';

export const Pagination = ({
  current,
  total,
  onMove,
}: {
  current: number;
  total: number;
  onMove: (p: number) => void;
}) => {
  const normalizedTotal = Math.max(0, total);
  const normalizedCurrent = Math.min(Math.max(current, 1), Math.max(normalizedTotal, 1));
  const pages = Array.from({ length: normalizedTotal }, (_, i) => i + 1);
  const canMovePrev = normalizedCurrent > 1;
  const canMoveNext = normalizedTotal > 0 && normalizedCurrent < normalizedTotal;

  const NEXT_MOVE_STYLE =
    'p-2 disabled:text-gray-300 hover:text-purple-600 transition-colors flex flex-row text-black';

  return (
    <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-100">
      <button
        className={NEXT_MOVE_STYLE}
        disabled={!canMovePrev}
        onClick={() => {
          if (canMovePrev) onMove(normalizedCurrent - 1);
        }}
        type="button"
      >
        <LeftArrow /> 이전
      </button>

      {pages.map((p) => (
        <button
          className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
            current === p
              ? 'border-purple-600 text-purple-600 border'
              : 'hover:bg-purple-50 text-black'
          }`}
          key={p}
          onClick={() => onMove(p)}
          type="button"
        >
          {p}
        </button>
      ))}

      <button
        className={NEXT_MOVE_STYLE}
        disabled={!canMoveNext}
        onClick={() => {
          if (canMoveNext) onMove(normalizedCurrent + 1);
        }}
        type="button"
      >
        다음 <RightArrow />
      </button>
    </div>
  );
};
