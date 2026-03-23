interface UserMeLabelProps {
  isMe: boolean;
}

export const UserMeLabel = ({ isMe }: UserMeLabelProps) => {
  if (!isMe) return null;
  return (
    <span className="inline-flex items-center font-body-body6 p-3 rounded-4  border border-purple-500 bg-purple-500 leading-none text-white">
      나
    </span>
  );
};
