interface BlockedStatusChipProps {
  isBlocked: boolean;
}

export const BlockedStateChip = ({ isBlocked }: BlockedStatusChipProps) => {
  if (!isBlocked) return null;
  return (
    <span className="font-body-body6 py-4 px-8 border-2 border-red-100 bg-red-100 text-red-700 rounded-sm">
      차단
    </span>
  );
};
