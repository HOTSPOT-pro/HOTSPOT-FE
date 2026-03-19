'use client';
import { useModal } from '@hotspot/ui';
import DownArrow from '@hotspot/ui/assets/icons/arrow-down.svg';
import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import { useCallback, useState } from 'react';
import { UserMeLabel } from '@/domains/user';
import { UserBlockLabel, UserProfileIcon, UserRoleLabel, useUserStore } from '../../user';
import type { PolicyPerUser } from '../model/types';
import { AccordionContainer } from './AccordionContainer';

interface PolicyUserCardProps {
  familyId: number;
  data: PolicyPerUser;
}

export const PolicyUserCard = ({ familyId, data }: PolicyUserCardProps) => {
  const [isAccordianOpen, setIsAccordianOpen] = useState(false);
  const { open } = useModal();
  const isMe = data.subId === useUserStore().subId;

  const handleOpenModal = useCallback(() => {
    open('policyDetailModal', {
      props: {
        familyId: familyId,
        icon: <UserProfileIcon type={data.role} />,
        user: data,
      },
    });
  }, [open, data, familyId]);

  const handleToggle = useCallback(() => {
    setIsAccordianOpen((prev) => !prev);
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center rounded-lg overflow-hidden bg-white">
        <button
          className="flex-1 flex flex-row py-8 items-center text-left gap-16"
          onClick={handleToggle}
          type="button"
        >
          <div>
            <UserProfileIcon type={data.role} />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <p className="font-bold text-sm pb-1 flex items-center gap-4">
              {data.memberName}
              <UserRoleLabel role={data.role} />
              <UserBlockLabel isBlocked={data.isBlocked} />
              <UserMeLabel isMe={isMe} />
            </p>
            <p className="text-xs text-gray-600">한도 {data.familyDataSubLimit}GB</p>
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <span>
                정책{' '}
                {data.appBlockedServiceResponseList.length + data.blockPolicyResponseList.length}개
              </span>
              <span
                className={`text-[10px] transition-transform ${isAccordianOpen ? 'rotate-180' : ''}`}
              >
                <DownArrow className="w-20 h-20" />
              </span>
            </div>
          </div>
        </button>

        <button
          className="p-16 text-gray-400 hover:text-purple-600 transition-colors"
          onClick={handleOpenModal}
          type="button"
        >
          <RightArrow className="w-24 h-24" />
        </button>
      </div>

      {/* 아코디언 */}
      {isAccordianOpen && (
        <AccordionContainer
          blockServices={data.appBlockedServiceResponseList}
          policyList={data.blockPolicyResponseList}
        />
      )}
    </div>
  );
};
