import CloseCircle from '@hotspot/ui/assets/icons/close-circle.svg';
import Time from '@hotspot/ui/assets/icons/time.svg';
import { policyDescriptionFormatter } from '../lib/policyDescriptionFormatter';
import type { BlockPolicy, Policy } from '../model/types';
import { Accordion } from './Accordion';
import { PolicyItem } from './PolicyItem';

interface AccordionContainerProps {
  policyList: Policy[];
  blockServices: BlockPolicy[];
}

export const AccordionContainer = ({ policyList, blockServices }: AccordionContainerProps) => {
  return (
    <div className="flex gap-1.5 flex-col pb-8">
      <Accordion
        title={
          <div className="flex items-center gap-8 p-16 font-heading-heading4">
            <Time className="w-20 text-purple-600" />
            <span>적용 정책</span>
            <span>{policyList.length}개</span>
          </div>
        }
      >
        {policyList.length !== 0 ? (
          policyList.map((i) => (
            <PolicyItem description={policyDescriptionFormatter(i)} item={i} key={i.id} />
          ))
        ) : (
          <div className="p-16 text-xs text-gray-600 font-body-body4">적용된 정책이 없습니다.</div>
        )}
      </Accordion>
      <Accordion
        title={
          <div className="flex items-center gap-8 p-16 font-heading-heading4">
            <CloseCircle className="w-20 h-20 text-red-600" />
            <span>차단된 서비스</span>
            <span>{blockServices.length}개</span>
          </div>
        }
      >
        {blockServices.length !== 0 ? (
          blockServices.map((i) => <PolicyItem item={i} key={i.id} />)
        ) : (
          <div className="p-16 text-xs text-gray-600 font-body-body4">
            차단된 서비스가 없습니다.
          </div>
        )}
      </Accordion>
    </div>
  );
};
