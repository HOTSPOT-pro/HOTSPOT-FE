'use client';

import { useModal } from '@hotspot/ui';
import PhoneIcon from '@hotspot/ui/assets/icons/phone.svg';
import UserIcon from '@hotspot/ui/assets/icons/user.svg';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useHeader } from '@/widgets/app-header/model/useHeader';

type FamilyRole = 'OWNER' | 'PARENT' | 'CHILD' | 'NONE';

export interface FamilyMemberInfo {
  familyId: number;
  familyRole: FamilyRole;
  id: number;
  name: string;
  phone: string;
  status: string;
  subId: number;
}

export interface FamilyInfoResponse {
  familyId: number;
  familyNum: number;
  memberInfoList: FamilyMemberInfo[];
}

interface FamilySection {
  iconType: 'child' | 'parent';
  id: 'PARENT' | 'CHILD';
  members: FamilyMemberInfo[];
  title: string;
}

const SectionIcon = ({ type }: { type: 'child' | 'parent' }) => {
  if (type === 'child') {
    return (
      <svg aria-hidden="true" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 20 20">
        <circle cx="10" cy="10" fill="currentColor" fillOpacity="0.16" r="9" />
        <circle cx="7.7" cy="8.4" fill="currentColor" r="1.2" />
        <circle cx="12.3" cy="8.4" fill="currentColor" r="1.2" />
        <path
          d="M7.6 12c.5.7 1.3 1.1 2.4 1.1 1 0 1.9-.4 2.4-1.1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 20 20">
      <path
        d="M10 1.667 3.333 4.444v4.323c0 4.026 2.844 7.793 6.667 9.233 3.823-1.44 6.667-5.207 6.667-9.233V4.444L10 1.667Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="m7.5 10 1.667 1.667L12.5 8.333" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
};

const RoleBadge = ({ role }: { role: FamilyRole }) => {
  if (role === 'OWNER') {
    return (
      <span className="inline-flex items-center rounded-lg border border-blue-300 p-1 text-[0.625rem] font-medium text-blue-500">
        대표
      </span>
    );
  }

  if (role === 'PARENT') {
    return (
      <span className="inline-flex items-center rounded-lg border border-purple-300 p-1 text-[0.625rem] font-medium text-purple-500">
        부모
      </span>
    );
  }

  if (role === 'CHILD') {
    return (
      <span className="inline-flex items-center rounded-lg border border-green-500 p-1 text-[0.625rem] font-medium text-green-500">
        자녀
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-lg border border-gray-300 p-1 text-[0.625rem] font-medium text-gray-500">
      대기
    </span>
  );
};

const SwapIcon = () => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path
      d="M6 7h13m0 0-3-3m3 3-3 3M18 17H5m0 0 3-3m-3 3 3 3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const TrashIcon = () => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path
      d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 .917h6a1 1 0 0 0 1-.917L17 7M10 11v5m4-5v5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const DotVerticalIcon = () => (
  <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="5.5" fill="currentColor" r="1.7" />
    <circle cx="12" cy="12" fill="currentColor" r="1.7" />
    <circle cx="12" cy="18.5" fill="currentColor" r="1.7" />
  </svg>
);

const buildSections = (familyInfo: FamilyInfoResponse | null): FamilySection[] => {
  const members = familyInfo?.memberInfoList ?? [];
  const parentMembers = members.filter(
    (member) => member.familyRole === 'OWNER' || member.familyRole === 'PARENT',
  );
  const childMembers = members.filter((member) => member.familyRole === 'CHILD');

  return [
    {
      iconType: 'parent',
      id: 'PARENT',
      members: parentMembers,
      title: '부모',
    },
    {
      iconType: 'child',
      id: 'CHILD',
      members: childMembers,
      title: '자녀',
    },
  ];
};

export const OwnerFamilyPage = ({ familyInfo }: { familyInfo: FamilyInfoResponse | null }) => {
  const sections = useMemo(() => buildSections(familyInfo), [familyInfo]);
  const { open } = useModal();
  const router = useRouter();
  const [activeMenuMemberId, setActiveMenuMemberId] = useState<number | null>(null);

  useHeader({
    leftAction: { type: 'back' },
    rightAction: { type: 'none' },
    title: '우리 가족',
    variant: 'sub',
  });

  return (
    <div className="flex h-full flex-col bg-white px-4 py-4">
      <button
        className="mb-6 flex w-full items-center gap-4 rounded-[1.5rem] border border-dashed border-gray-300 px-7 py-5 text-left"
        onClick={() => open('addFamilyMemberModal')}
        type="button"
      >
        <span className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-[8px] bg-purple-100 text-xl leading-none text-purple-500">
          +
        </span>
        <span className="flex flex-col">
          <span className="text-[0.8125rem] font-semibold leading-tight text-gray-900">
            가족 구성원 추가
          </span>
          <span className="pt-1 text-[0.6875rem] leading-tight text-gray-500">추가 신청하기</span>
        </span>
      </button>

      <section className="space-y-6">
        {sections.map((section) => (
          <div key={section.id}>
            <header className="mb-4 flex items-center gap-8">
              <SectionIcon type={section.iconType} />
              <h2 className="text-[0.75rem] font-semibold leading-none text-gray-900">
                {section.title}
              </h2>
              <span className="text-[0.75rem] leading-none text-gray-500">
                {section.members.length}명
              </span>
            </header>

            <ul>
              {section.members.map((member) => {
                const canOpenMenu = member.familyRole === 'PARENT' || member.familyRole === 'CHILD';
                const isMenuOpen = activeMenuMemberId === member.id;
                const changeRoleLabel =
                  member.familyRole === 'PARENT' ? '자녀로 변경' : '부모로 변경';
                const profileTone =
                  section.id === 'PARENT'
                    ? 'bg-purple-100 text-purple-500'
                    : 'bg-green-100 text-green-800';

                return (
                  <li
                    className="relative flex items-center gap-4 border-t border-gray-200 py-5 first:border-t-0"
                    key={member.id}
                  >
                    <span
                      className={`flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-[8px] ${profileTone}`}
                    >
                      <UserIcon className="h-9 w-9" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-8">
                        <strong className="text-[0.8125rem] font-semibold leading-none text-gray-900">
                          {member.name}
                        </strong>
                        <RoleBadge role={member.familyRole} />
                      </div>

                      <p className="flex items-center gap-8 text-[0.6875rem] leading-none text-gray-500">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{member.phone}</span>
                      </p>
                    </div>

                    {canOpenMenu ? (
                      <button
                        aria-expanded={isMenuOpen}
                        aria-label={`${member.name} 메뉴 열기`}
                        className="relative flex h-10 w-10 items-center justify-center text-gray-500"
                        onClick={() =>
                          setActiveMenuMemberId((prev) => (prev === member.id ? null : member.id))
                        }
                        type="button"
                      >
                        <DotVerticalIcon />
                      </button>
                    ) : null}

                    {canOpenMenu && isMenuOpen ? (
                      <div className="absolute right-10 top-[2rem] z-10 w-56 overflow-hidden rounded-3xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.15)]">
                        <button
                          className="flex w-full items-center gap-3 px-5 py-4 text-left text-[0.875rem] text-gray-900"
                          onClick={() =>
                            open('changeFamilyRoleModal', {
                              props: {
                                currentRole: member.familyRole,
                                name: member.name,
                                onSuccess: () => {
                                  setActiveMenuMemberId(null);
                                  router.refresh();
                                },
                                subId: member.subId,
                              },
                            })
                          }
                          type="button"
                        >
                          <SwapIcon />
                          <span>{changeRoleLabel}</span>
                        </button>
                        <div className="h-px bg-gray-200" />
                        <button
                          className="flex w-full items-center gap-3 px-5 py-4 text-left text-[0.875rem] text-red-500"
                          onClick={() =>
                            open('deleteFamilyMemberModal', {
                              props: {
                                name: member.name,
                                onSuccess: () => {
                                  setActiveMenuMemberId(null);
                                  router.refresh();
                                },
                                subId: member.subId,
                              },
                            })
                          }
                          type="button"
                        >
                          <TrashIcon />
                          <span>가족 삭제</span>
                        </button>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};
