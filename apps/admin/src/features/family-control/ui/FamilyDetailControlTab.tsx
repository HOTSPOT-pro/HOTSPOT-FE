import { useParams } from 'next/navigation';

import { useFamilyDetailControl } from '../model/useFamilyDetailControl';
import { FamilyControlSection } from './FamilyControlSection';
import { FamilyOrderSection } from './FamilyOrderSection';

export const FamilyDetailControlTab = () => {
  const params = useParams();
  const familyId = Number(params.familyId);
  const { familyControlData } = useFamilyDetailControl(familyId);

  return (
    <div className="flex flex-col gap-5">
      <FamilyOrderSection familyControlData={familyControlData} familyId={familyId} />
      <FamilyControlSection familyControlData={familyControlData} />
    </div>
  );
};
