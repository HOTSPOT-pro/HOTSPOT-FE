import ArrowIcon from '@hotspot/ui/assets/icons/arrow-bar.svg';
import type { Column } from '@/shared';

type FamilyRow = {
  familyId: number;
  representativeName: string;
  phoneNumber: string;
  memberCount: number;
};

export const familyColumns = (onDetail: (id: number) => void): Column<FamilyRow>[] => [
  { accessor: 'familyId', header: '가족 아이디' },
  { accessor: 'representativeName', header: '대표자' },
  { accessor: 'phoneNumber', header: '전화번호' },
  { accessor: 'memberCount', header: '구성원' },
  {
    accessor: 'actions',
    header: '상세',
    render: (_, row) => (
      <button
        aria-label={`${row.representativeName} 가족 상세 보기`}
        className="flex items-center px-12 py-8 gap-8 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200"
        onClick={() => onDetail(row.familyId)}
        type="button"
      >
        상세
        <ArrowIcon className="rotate-90 w-16 h-16" />
      </button>
    ),
  },
];
