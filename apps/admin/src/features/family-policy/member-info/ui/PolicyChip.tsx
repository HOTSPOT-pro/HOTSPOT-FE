interface PolicyChipProps {
  name: string;
}

export const PolicyChip = ({ name }: PolicyChipProps) => {
  return <span className="text-[14px] py-2.5 px-4 border border-gray-200 rounded-sm">{name}</span>;
};
