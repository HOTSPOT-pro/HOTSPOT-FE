import { Button, Input, Slider, Toggle } from '@hotspot/ui';
import { useEffect, useState } from 'react';
import { RoleChip } from '@/domains/family';
import type { MemberControl, MemberControlItem } from '@/domains/member-control';
import { useFamilyUpdateControl } from '../model/useFamilyUpdateControl';

interface FamilyControlSectionProps {
  familyId: number;
  familyControlData?: MemberControl;
}

export const FamilyControlSection = ({
  familyId,
  familyControlData,
}: FamilyControlSectionProps) => {
  const [memberStates, setMemberStates] = useState<MemberControlItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // 현재 편집 중인 멤버 ID

  const { updateMember } = useFamilyUpdateControl({ familyId });

  useEffect(() => {
    if (familyControlData?.members) {
      setMemberStates(familyControlData.members);
    }
  }, [familyControlData]);

  const handleUpdateField = (subId: number, field: keyof MemberControlItem, value: any) => {
    setMemberStates((prev) => prev.map((m) => (m.subId === subId ? { ...m, [field]: value } : m)));
  };

  const handleEdit = (subId: number) => {
    setEditingId(subId);
  };

  const handleCancel = (subId: number) => {
    const originalMember = familyControlData?.members?.find((m) => m.subId === subId);
    if (originalMember) {
      setMemberStates((prev) => prev.map((m) => (m.subId === subId ? { ...originalMember } : m)));
    }
    setEditingId(null);
  };

  // [저장] 버튼 클릭
  const handleSave = async (member: MemberControlItem) => {
    try {
      await updateMember.mutateAsync({
        body: {
          dataLimitGb: member.dataLimitGb,
          isBlocked: member.isBlocked,
          isParent: member.isParent,
        },
        familyId,
        subId: member.subId,
      });
      setEditingId(null); // 저장 성공 시 편집 모드 종료
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col gap-6">
      <h3 className="text-[14px] font-bold text-black">구성원별 제어</h3>

      <div className="flex flex-col gap-3">
        {memberStates.map((member) => {
          const isCurrentEditing = editingId === member.subId;

          return (
            <div
              className={`border rounded-xl p-4 flex flex-col gap-4 transition-colors ${
                isCurrentEditing ? 'border-purple-200 bg-purple-50/30' : 'border-gray-200'
              }`}
              key={member.subId}
            >
              {/* 상단: 정보 및 액션 버튼 */}
              <div className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="text-[14px] font-bold text-black">{member.memberName}</span>
                  <RoleChip role={member.familyRole} />
                  <span className="text-[11px] text-gray-400">ID: {member.subId}</span>
                </div>

                <div className="flex gap-2">
                  {isCurrentEditing ? (
                    <>
                      <Button
                        className="w-fit h-8 px-3 text-xs"
                        onClick={() => handleCancel(member.subId)}
                        variant="ghost"
                      >
                        취소
                      </Button>
                      <Button className="w-fit h-8 px-4 text-xs" onClick={() => handleSave(member)}>
                        저장
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-fit h-8 px-4 text-xs"
                      disabled={editingId !== null}
                      onClick={() => handleEdit(member.subId)} // 다른 멤버 편집 중엔 비활성화 (선택 사항)
                      variant="outline"
                    >
                      편집
                    </Button>
                  )}
                </div>
              </div>

              {/* 제어 영역: 편집 모드일 때만 활성화 */}
              <div
                className={`flex flex-col gap-4 ${!isCurrentEditing && 'opacity-60 pointer-events-none'}`}
              >
                <div className="grid grid-cols-2 gap-4">
                  {member.familyRole !== 'OWNER' && (
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">부모 권한</span>
                      <Toggle
                        checked={member.isParent}
                        disabled={!isCurrentEditing}
                        id={`${member.subId}-parent`}
                        onChange={(checked) => handleUpdateField(member.subId, 'isParent', checked)}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">즉시 차단</span>
                    <Toggle
                      checked={member.isBlocked}
                      disabled={!isCurrentEditing}
                      id={`${member.subId}-block`}
                      onChange={(checked) => handleUpdateField(member.subId, 'isBlocked', checked)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[13px] text-gray-600">데이터 한도</span>
                    <span className="text-purple-600 font-bold text-[13px]">
                      {member.dataLimitGb}GB
                    </span>
                  </div>
                  <div className="flex flex-row gap-6 items-center">
                    <Slider
                      key={`${member.subId}-${member.dataLimitGb}`}
                      maxNum={100}
                      minNum={0}
                      onChange={(val) => handleUpdateField(member.subId, 'dataLimitGb', val)}
                      step={1}
                      value={member.dataLimitGb}
                    />
                    <Input
                      className="w-25"
                      disabled={!isCurrentEditing}
                      id={'dataLimitGb'}
                      label=""
                      onChange={(e) =>
                        handleUpdateField(member.subId, 'dataLimitGb', Number(e.target.value))
                      }
                      type="number"
                      value={member.dataLimitGb}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
