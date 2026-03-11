interface UserMeLabelProps {
  isMe: boolean;
}

export const UserMeLabel = ({ isMe }: UserMeLabelProps) => {
  if (!isMe) return null;
  return (
    <span className="text-xs py-1 px-2 border-2 border-purple-300 text-purple-600 rounded-sm">
      나
    </span>
  );
};
