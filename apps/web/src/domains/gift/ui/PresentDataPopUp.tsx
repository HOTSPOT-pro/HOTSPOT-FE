'use client';

import RecieveGiftAnimatedImage from '@/shared/assets/images/gift/recieve-gift-animated.svg';
import { ROUTES } from '@/shared/constants/routes';
import { usePopUp } from '@/widgets/app-popup/model/PopUpContext';
import {
  PopUp,
  PopUpContent,
  PopUpFooter,
  PopUpHeader,
  PopUpTitle,
} from '../../../shared/ui/pop-up/PopUp';

interface PresentDataPopUpProps {
  title: string;
  content: string;
  onConfirm?: () => void;
  [key: string]: unknown;
}

export const PresentDataPopUp = () => {
  const { close, getProps } = usePopUp();
  const props = getProps<PresentDataPopUpProps>();

  const handleConfirm = () => {
    close();
    props?.onConfirm?.();
  };

  return (
    <PopUp>
      <PopUpHeader>
        <PopUpTitle className="text-center">{props?.title}</PopUpTitle>
      </PopUpHeader>
      <PopUpContent>
        <RecieveGiftAnimatedImage />
        <span className="text-center text-sm text-gray-600">{props?.content}</span>
      </PopUpContent>
      {/* <PopUpFooter>
        <a className="text-xs text-gray-500" href={ROUTES.GIFT}>
          선물 내역 보러가기
        </a>
      </PopUpFooter> */}
    </PopUp>
  );
};
