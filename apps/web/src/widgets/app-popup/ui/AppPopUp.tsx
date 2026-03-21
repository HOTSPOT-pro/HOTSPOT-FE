'use client';

import { Overlay } from '@hotspot/ui';
import CloseIcon from '@hotspot/ui/assets/icons/close.svg';
import React from 'react';
import { createPortal } from 'react-dom';
import { usePopUp } from '../model/PopUpContext';
import { popupRegistry } from '../model/registry';

export const AppPopUp = () => {
  const { close, state } = usePopUp();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!(mounted && state.isOpen && state.id)) return null;

  const PopUpComponent = popupRegistry[state.id];
  if (!PopUpComponent) return null;

  const closeOnOutside = state.options?.closeOnOutsideClick ?? true;

  return createPortal(
    <div className="fixed inset-0 z-toast">
      <Overlay
        className="absolute inset-0 z-0 w-full max-w-[500px]"
        isVisible
        onClick={closeOnOutside ? close : undefined}
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative z-modal flex w-full max-w-[400px] flex-col gap-1">
          <button
            className="ml-auto flex items-center gap-1 text-sm font-medium text-white"
            onClick={close}
            type="button"
          >
            <span>닫기</span>
            <CloseIcon />
          </button>
          <PopUpComponent close={close} props={state.props} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
