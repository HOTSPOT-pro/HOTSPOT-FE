interface UserBlockLabelProps {
  isBlocked: boolean;
}

export const UserBlockLabel = ({ isBlocked }: UserBlockLabelProps) => {
  if (!isBlocked) return null;
  return (
    <span className="text-xs py-1 px-2 border-2 border-red-100 bg-red-100 text-red-700 rounded-sm">
      차단
    </span>
  );
};
