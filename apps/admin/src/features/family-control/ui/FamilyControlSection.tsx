import { Button, Input, Slider, Toggle } from '@hotspot/ui';
import { useEffect, useState } from 'react';
import type { MemberControl, MemberControlItem } from '../model/types';
import { useFamilyUpdateControl } from '../model/useFamilyUpdateControl'; // 훅 이름 가정

interface FamilyControlSectionProps {
  familyId: number;
  familyControlData?: MemberControl;
}

export const FamilyControlSection = ({
  familyId,
  familyControlData,
}: FamilyControlSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [memberStates, setMemberStates] = useState<MemberControlItem[]>([]);

  const { updateMember } = useFamilyUpdateControl({ familyId });

  useEffect(() => {
    if (familyControlData?.members) {
      setMemberStates(familyControlData.members);
    }
  }, [familyControlData]);

  const handleUpdateField = (subId: number, field: keyof MemberControlItem, value: any) => {
    setMemberStates((prev) => prev.map((m) => (m.subId === subId ? { ...m, [field]: value } : m)));
  };

  const handleSave = async (member: MemberControlItem) => {
    try {
      await updateMember.mutateAsync({
        data: {
          dataLimitGb: member.dataLimitGb,
          isBlocked: member.isBlocked,
          isParent: member.isParent,
        },
        subId: member.subId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">구성원별 제어</h3>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'solid' : 'outline'}>
          {isEditing ? '수정 완료' : '구성원 수정'}
        </Button>
      </div>

      <div className="flex flex-col gap-8">
        {memberStates.map((member, idx) => (
          <div
            className="border-b border-gray-50 pb-6 last:border-none last:pb-0"
            key={member.subId}
          >
            {/* 이름 및 정보 */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800">{member.memberName}</span>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                  {member.familyRole}
                </span>
              </div>
              <span className="text-[10px] text-gray-300">ID: {member.subId}</span>
            </div>

            {/* 토글 제어 영역 */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {member.familyRole !== 'OWNER' && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">부모 권한</span>
                  <Toggle
                    checked={member.isParent}
                    disabled={!isEditing}
                    id={`parent-${member.subId}`}
                    onChange={(checked) => handleUpdateField(member.subId, 'isParent', checked)}
                  />
                </div>
              )}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">즉시 차단</span>
                <Toggle
                  checked={member.isBlocked}
                  disabled={!isEditing}
                  id={`block-${member.subId}`}
                  onChange={(checked) => handleUpdateField(member.subId, 'isBlocked', checked)}
                />
              </div>
            </div>

            {/* 데이터 한도 영역 */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-gray-700">데이터 한도 변경</span>
                <span className="text-purple-600 font-bold text-lg">{member.dataLimitGb}GB</span>
              </div>

              <div className={!isEditing ? 'pointer-events-none opacity-50' : ''}>
                <Slider
                  initialValue={member.dataLimitGb}
                  maxNum={100}
                  minNum={0}
                  // onChange는 상태 업데이트 로직 그대로 유지
                  onChange={(val) => handleUpdateField(member.subId, 'dataLimitGb', val)}
                />
              </div>

              <div className="flex gap-2 items-center mt-2">
                <div className="flex-1">
                  <Input
                    disabled={!isEditing}
                    id={`limit-${member.subId}`}
                    label=""
                    onChange={(e) =>
                      handleUpdateField(member.subId, 'dataLimitGb', Number(e.target.value))
                    }
                    type="number"
                    value={member.dataLimitGb}
                  />
                </div>
                {isEditing && (
                  <Button className="w-20" onClick={() => handleSave(member)}>
                    적용
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
