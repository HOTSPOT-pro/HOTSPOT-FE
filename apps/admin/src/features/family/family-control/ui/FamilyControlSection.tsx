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
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const handleSave = async (member: MemberControlItem) => {
    try {
      await updateMember.mutateAsync({
        body: {
          dataLimitGb: member.familyDataSubLimit,
          isBlocked: member.isBlocked,
          isParent: member.isParent,
        },
        familyId,
        subId: member.subId,
      });
      setEditingId(null);
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
              {/* 정보 및 편집 버튼 */}
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
                      onClick={() => handleEdit(member.subId)}
                      variant="outline"
                    >
                      편집
                    </Button>
                  )}
                </div>
              </div>

              {/* 제어 영역 */}
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
                      {member.familyDataSubLimit}GB
                    </span>
                  </div>
                  <div className="flex flex-row gap-6 items-center">
                    <Slider
                      maxNum={member.familyDataLimit}
                      minNum={member.familyDataUsage}
                      onChange={(val) => handleUpdateField(member.subId, 'familyDataSubLimit', val)}
                      step={1}
                      value={member.familyDataSubLimit}
                    />
                    <Input
                      className="w-25"
                      disabled={!isCurrentEditing}
                      id={`dataLimitGb-${member.subId}`}
                      label=""
                      onChange={(e) => {
                        const next = e.target.valueAsNumber;
                        if (Number.isNaN(next)) return;
                        handleUpdateField(
                          member.subId,
                          'familyDataSubLimit',
                          Math.min(100, Math.max(0, next)),
                        );
                      }}
                      type="number"
                      value={member.familyDataSubLimit}
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
