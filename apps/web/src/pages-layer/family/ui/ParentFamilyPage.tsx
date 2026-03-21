'use client';

import PhoneIcon from '@hotspot/ui/assets/icons/phone.svg';
import UserIcon from '@hotspot/ui/assets/icons/user.svg';
import { useMemo } from 'react';
import { UserRoleLabel } from '@/domains/user/ui/UserRoleLabel';
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

const PendingRoleBadge = () => (
  <span className="inline-flex items-center rounded-lg border border-gray-100 bg-gray-100 px-4 py-1 text-[0.625rem] font-medium leading-none text-gray-500">
    대기
  </span>
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

export const ParentFamilyPage = ({ familyInfo }: { familyInfo: FamilyInfoResponse | null }) => {
  const sections = useMemo(() => buildSections(familyInfo), [familyInfo]);

  useHeader({
    leftAction: { type: 'back' },
    rightAction: { type: 'none' },
    title: '우리 가족',
    variant: 'sub',
  });

  return (
    <div className="flex h-full flex-col bg-white px-4 py-4">
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
                        {member.familyRole === 'NONE' ? (
                          <PendingRoleBadge />
                        ) : (
                          <UserRoleLabel role={member.familyRole} />
                        )}
                      </div>

                      <p className="flex items-center gap-8 text-[0.6875rem] leading-none text-gray-500">
                        <PhoneIcon className="h-4 w-4" />
                        <span>{member.phone}</span>
                      </p>
                    </div>
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
