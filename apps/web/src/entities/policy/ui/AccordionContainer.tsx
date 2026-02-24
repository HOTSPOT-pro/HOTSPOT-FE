import CloseCircle from '@hotspot/ui/assets/icons/close-circle.svg';
import Time from '@hotspot/ui/assets/icons/time.svg';
import type { Policy } from '../model/type';
import { Accordion } from './Accordion';

interface AccordionProps {
  policyList: Policy[];
  blockServices: Policy[];
}

export const AccordionContainer = ({ policyList, blockServices }: AccordionProps) => {
  return (
    <div className="flex gap-1.5 flex-col">
      <Accordion
        title={
          <div className="flex flex-row gap-2 px-3.5 py-3">
            <Time className="w-4.5 text-purple-600" />
            <span>적용 정책</span>
            <span>{policyList.length}개</span>
          </div>
        }
      >
        {policyList.map((i) => (
          <div
            className="bg-white rounded-xl px-3 py-2.5 flex-row flex items-center gap-2.5"
            key={i.id}
          >
            <Time className="w-4.5 text-purple-600" />
            <div className="flex flex-col">
              <div className="font-normal text-sm">{i.name}</div>
              <div className="text-gray-600 text-xs">{i.description}</div>
            </div>
          </div>
        ))}
      </Accordion>
      <Accordion
        title={
          <div className="flex flex-row gap-2 px-3.5 py-3">
            <CloseCircle className="w-4.5 text-red-600" />
            <span>차단된 서비스</span>
            <span>{blockServices.length}개</span>
          </div>
        }
      >
        {blockServices.map((i) => (
          <div
            className="bg-white rounded-xl px-3 py-2.5 flex-row flex items-center gap-2.5"
            key={i.id}
          >
            <CloseCircle className="w-4.5 text-red-600" />
            <div className="flex flex-col">
              <div className="font-normal text-sm">{i.name}</div>
              <div className="text-gray-600 text-xs">{i.description}</div>
            </div>
          </div>
        ))}
      </Accordion>
    </div>
  );
};
