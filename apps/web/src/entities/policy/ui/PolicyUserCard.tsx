'use client';
import { useState } from 'react';
import type { Policy, PolicyPerUser } from '../model/type';

export const PolicyUserCard = (policyUser: PolicyPerUser) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>프로필</div>
      <div>{policyUser.name}</div>
      <div>{policyUser.limit}</div>
      <Accordion title={`정책 ${policyUser.blockServices.length + policyUser.policyList.length}개`}>
        <Accordion title={`적용 정책 ${policyUser.policyList.length}개`}>
          {policyUser.policyList.map((i) => (
            <div>
              <div>{i.name}</div>
              <div className="text-gray-500">{i.description}</div>
            </div>
          ))}
        </Accordion>
        <Accordion title={`차단된 서비스 ${policyUser.blockServices.length}개`}>
          {policyUser.blockServices.map((i) => (
            <div>
              <div>{i.name}</div>
              <div className="text-gray-500">{i.description}</div>
            </div>
          ))}
        </Accordion>
      </Accordion>
      <div></div>
    </div>
  );
};

interface AccordionProps {
  title: React.ReactNode; // 타이틀에 문자열뿐만 아니라 JSX(아이콘 등)도 넣을 수 있게 함
  children: React.ReactNode; // 아코디언 내부에 들어갈 내용
  defaultOpen?: boolean;
}

const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg mb-2 overflow-hidden shadow-sm bg-white">
      {/* 헤더 부분 */}
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className="flex-1 text-left font-medium text-gray-800">{title}</div>
        <span className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* 내용 부분 (애니메이션을 넣고 싶다면 여기서 처리) */}
      {isOpen && <div className="p-4 border-t border-gray-100 animate-fadeIn">{children}</div>}
    </div>
  );
};
