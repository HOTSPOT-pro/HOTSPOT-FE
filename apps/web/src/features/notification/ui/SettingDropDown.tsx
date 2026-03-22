import { useRouter } from 'next/navigation';
import { useNotification } from '@/features/notification';
import { ROUTES } from '@/shared/constants/routes';

interface SettingDropDownProps {
  handleDropDown: () => void;
}

export const SettingDropDown = ({ handleDropDown }: SettingDropDownProps) => {
  const { readAll } = useNotification();
  const router = useRouter();
  return (
    <div className="absolute right-0 z-dropdown mr-8 w-[150px] overflow-hidden rounded-xl border border-gray-100 bg-white elevation-3">
      <div className="flex flex-col py-4">
        <button
          className="px-8 py-4 text-left text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100"
          onClick={() => {
            readAll();
            handleDropDown();
          }}
          type="button"
        >
          모두 읽음으로 표시
        </button>
        <button
          className="px-8 py-4 text-left text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 border-t border-gray-50"
          onClick={() => {
            router.push(ROUTES.NOTIFICATION.SETTINGS);
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
