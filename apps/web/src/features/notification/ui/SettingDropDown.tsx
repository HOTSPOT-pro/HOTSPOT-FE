import { useRouter } from 'next/navigation';
import { useNotification } from '@/features/notification';

interface SettingDropDownProps {
  handleDropDown: () => void;
}

export const SettingDropDown = ({ handleDropDown }: SettingDropDownProps) => {
  const { readAll } = useNotification();
  const router = useRouter();
  return (
    <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
      <div className="flex flex-col py-1">
        <button
          className="px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100"
          onClick={() => {
            readAll();
            handleDropDown();
          }}
          type="button"
        >
          모두 읽음으로 표시
        </button>
        <button
          className="px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-t border-gray-50"
          onClick={() => {
            router.push('/notification/settings');
            handleDropDown();
          }}
          type="button"
        >
          알림 설정
        </button>
      </div>
    </div>
  );
};
