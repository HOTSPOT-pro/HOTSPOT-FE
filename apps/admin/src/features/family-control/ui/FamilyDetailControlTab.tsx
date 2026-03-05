import { Button, Input, Slider, Toggle } from '@hotspot/ui';
import { useParams } from 'next/navigation';
import { useFamilyDetailControl } from '../model/useFamilyDetailControl';

export const FamilyDetailControlTab = () => {
  const params = useParams();
  const familyId = Number(params.familyId);
  const { familyControlData } = useFamilyDetailControl(familyId);

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-xl p-5 ">
        <p>데이터 사용 우선순위</p>
        <p>
          낮은 숫자가 높은 우선순위입니다. 데이터 부족 시 우선순위가 높은 구성원에게 먼저
          할당됩니다.
        </p>
      </div>
      <div className="bg-white rounded-xl p-5">
        <p>구성원별 제어</p>
        {familyControlData?.members.map((i, idx) => (
          <div key={idx}>
            <div>
              {i.memberName} {i.familyRole} {i.subId}
            </div>
            <div className="flex flex-row w-full">
              {i.familyRole !== 'OWNER' ? (
                <div className="flex flex-row justify-between">
                  부모 권한 <Toggle id={`role-${idx}`} onChange={() => console.log('temp')} />
                </div>
              ) : null}
              <div className="flex flex-row justify-between">
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
    </div>
  );
};
