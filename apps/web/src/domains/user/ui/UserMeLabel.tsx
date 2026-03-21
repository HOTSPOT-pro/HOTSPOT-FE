interface UserMeLabelProps {
  isMe: boolean;
}

export const UserMeLabel = ({ isMe }: UserMeLabelProps) => {
  if (!isMe) return null;
  return (
    <span className="inline-flex items-center rounded-lg border border-purple-500 bg-purple-500 p-4 text-[0.625rem] font-medium leading-none text-white">
      나
    </span>
  );
};
