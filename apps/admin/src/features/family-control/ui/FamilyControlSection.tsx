import { Button, Input, Slider, Toggle } from '@hotspot/ui';
import type { MemberControl } from '../model/types';

interface FamilyControlSectionProps {
  familyControlData?: MemberControl;
}

export const FamilyControlSection = ({ familyControlData }: FamilyControlSectionProps) => {
  return (
    <div className="bg-white rounded-xl p-5">
      <p>구성원별 제어</p>
      {familyControlData?.members.map((i, idx) => (
        <div key={idx}>
          <div>
            {i.memberName} {i.familyRole} {i.subId}
          </div>
          <div className="flex flex-row w-full justify-between">
            {i.familyRole !== 'OWNER' ? (
              <div className="flex flex-row justify-between w-full">
                부모 권한 <Toggle id={`role-${idx}`} onChange={() => console.log('temp')} />
              </div>
            ) : null}
            <div className="flex flex-row justify-between w-full">
              즉시 차단 <Toggle id={`block-${idx}`} onChange={() => console.log('temp')} />
            </div>
          </div>

          <div>
            한도 변경
            <Slider initialValue={i.dataLimitGb} maxNum={100} minNum={0} />
            <div className="flex flex-row">
              <Input id={`limit-${idx}`} label={''} type="number" value={i.dataLimitGb} />
              <Button>적용</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
