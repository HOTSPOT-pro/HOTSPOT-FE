interface UserBlockLabelProps {
  isBlocked: boolean;
}

export const UserBlockLabel = ({ isBlocked }: UserBlockLabelProps) => {
  if (!isBlocked) return null;
  return (
    <span className="text-[0.625rem] font-medium leading-none p-4 border-2 border-red-100 bg-red-100 text-red-700 rounded-lg">
      차단
    </span>
  );
};
