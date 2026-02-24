import { POLICY_ORDER_TYPE, type PolicyOrderType } from '@entities/policy-order';
import More2Icon from '@hotspot/ui/assets/icons/more-2.svg';
import UserIcon from '@hotspot/ui/assets/icons/user.svg';
import { cn } from '@hotspot/ui/lib';

interface PolicyOrderSelectorProps {
  policy: PolicyOrderType;
  setPolicy: (value: PolicyOrderType) => void;
}

const BASE_STYLE =
  'p-3.5 rounded-2xl flex w-full flex-col justify-center items-center transition gap-1.5 border-2';
const ACTIVE_STYLE = 'bg-purple-100 border-purple-200 font-bold text-purple-600';
const INACTIVE_STYLE = 'bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200';

export const PolicyOrderSelector = ({ policy, setPolicy }: PolicyOrderSelectorProps) => {
  return (
    <div className="flex gap-2 py-3">
      <button
        className={cn(
          BASE_STYLE,
          policy === POLICY_ORDER_TYPE.FIFO ? ACTIVE_STYLE : INACTIVE_STYLE,
        )}
        onClick={() => setPolicy(POLICY_ORDER_TYPE.FIFO)}
        type="button"
      >
        <div
          className={cn(
            'w-8 h-8 flex justify-center items-center rounded-xl mb-1',
            policy === POLICY_ORDER_TYPE.FIFO
              ? 'text-purple-600 bg-purple-200'
              : 'bg-gray-200 text-gray-500',
          )}
        >
          <UserIcon className="w-4 h-4" />
        </div>
        <p className="text-sm">선착순</p>
        <p className="text-[10px] opacity-70 leading-none text-gray-500">먼저 사용하는 순서대로</p>
      </button>

      <button
        className={cn(
          BASE_STYLE,
          policy === POLICY_ORDER_TYPE.PRIORITY ? ACTIVE_STYLE : INACTIVE_STYLE,
        )}
        onClick={() => setPolicy(POLICY_ORDER_TYPE.PRIORITY)}
        type="button"
      >
        <div
          className={cn(
            'w-8 h-8 flex justify-center items-center rounded-xl mb-1',
            policy === POLICY_ORDER_TYPE.PRIORITY
              ? 'text-purple-600 bg-purple-200'
              : 'bg-gray-200 text-gray-500',
          )}
        >
          <More2Icon className="w-4 h-4" />
        </div>
        <p className="text-sm">우선순위</p>
        <p className="text-[10px] opacity-70 leading-none text-gray-500">구성원별 순서 지정</p>
      </button>
    </div>
  );
};
