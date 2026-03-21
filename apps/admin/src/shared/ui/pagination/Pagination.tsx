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

  const PAGE_GROUP_SIZE = 10;
  const currentGroup = Math.floor((normalizedCurrent - 1) / PAGE_GROUP_SIZE);

  const startPage = currentGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, normalizedTotal);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const canMovePrev = normalizedCurrent > 1;
  const canMoveNext = normalizedCurrent < normalizedTotal;

  const NEXT_MOVE_STYLE =
    'w-fit shrink-0 whitespace-nowrap p-8 disabled:text-gray-300 hover:text-purple-600 transition-colors flex flex-row items-center gap-1 text-black font-body-body3';

  return (
    <div className="flex w-full items-center justify-center gap-8 py-16 border-t border-gray-100">
      <button
        className={NEXT_MOVE_STYLE}
        disabled={!canMovePrev}
        onClick={() => {
          if (canMovePrev) onMove(normalizedCurrent - 1);
        }}
        type="button"
      >
        <LeftArrow className="h-16 w-16 shrink-0 text-current" />
        이전
      </button>

      {pages.map((p) => (
        <button
          className={`w-32 h-32 rounded-md font-body-body3 transition-colors ${
            normalizedCurrent === p
              ? 'border-purple-600 text-purple-600 border bg-purple-50'
              : 'hover:bg-purple-50 text-black'
          }`}
          key={p}
          onClick={() => {
            if (p !== normalizedCurrent) onMove(p);
          }}
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
        다음 <RightArrow className="h-16 w-16 shrink-0 text-current" />
      </button>
    </div>
  );
};
