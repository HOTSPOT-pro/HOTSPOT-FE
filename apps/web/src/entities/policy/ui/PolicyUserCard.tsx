'use client';
import DownArrow from '@hotspot/ui/assets/icons/arrow-down.svg';
import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import { useState } from 'react';
import { useUserStore } from '@/features/user';
import { UserProfileIcon } from '@/shared/ui/user-profile-icon/UserProfileIcon';
import type { PolicyPerUser } from '../model/type';
import { AccordionContainer } from './AccordionContainer';

export const PolicyUserCard = (policyUser: PolicyPerUser) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMe = policyUser.id === useUserStore().userId;

  return (
    <div className="w-full px-5 py-4 bg-white rounded-3xl">
      <div className="flex items-center rounded-lg overflow-hidden bg-white">
        <button
          className="flex-1 flex flex-row p-4 items-center text-left"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <div>
            <UserProfileIcon type={isMe ? 'MAIN' : 'OTHER'} />
          </div>

          <div className="flex-1 flex flex-col gap-0.5">
            <p className="font-bold text-sm">{policyUser.name}</p>
            <p className="text-xs text-gray-600">한도 {policyUser.limit}GB</p>
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <span>정책 {policyUser.blockServices.length + policyUser.policyList.length}개</span>
              <span className={`text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                <DownArrow className="w-3 h-3" />
              </span>
            </div>
          </div>
        </button>

        <button
          className="p-4 text-gray-400 hover:text-purple-600 transition-colors"
          onClick={() => console.log('상세 페이지 이동')}
          type="button"
        >
          <RightArrow />
        </button>
      </div>

      {/* 아코디언 */}
      {isOpen && (
        <AccordionContainer
          blockServices={policyUser.blockServices}
          policyList={policyUser.policyList}
        />
      )}
    </div>
  );
};
