import CloseCircle from '@hotspot/ui/assets/icons/close-circle.svg';
import Time from '@hotspot/ui/assets/icons/time.svg';
import { policyDescriptionFormatter } from '../lib/policyDescriptionFormatter';
import type { Block, Policy } from '../model/types';
import { Accordion } from './Accordion';
import { PolicyItem } from './PolicyItem';

interface AccordionContainerProps {
  policyList: Policy[];
  blockServices: Block[];
}

export const AccordionContainer = ({ policyList, blockServices }: AccordionContainerProps) => {
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
          <PolicyItem
            description={policyDescriptionFormatter(i.policySnapshot.days, i.startTime, i.endTime)}
            icon={<Time className="w-4.5 text-purple-600" />}
            item={i}
            key={i.id}
          />
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
          <PolicyItem icon={<CloseCircle className="w-4.5 text-red-600" />} item={i} key={i.id} />
        ))}
      </Accordion>
    </div>
  );
};
