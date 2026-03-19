interface PolicyChipProps {
  name: string;
}

export const PolicyChip = ({ name }: PolicyChipProps) => {
  return (
    <span className="font-body-body2 py-8 px-12 border border-gray-200 rounded-sm">{name}</span>
  );
};
