'use client';

import React from 'react';

type PopUpId = string;

type OpenPopUpOptions = {
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
};

type PopUpState =
  | { isOpen: false; id: null; props?: undefined; options?: undefined }
  | {
      isOpen: true;
      id: PopUpId;
      props?: Record<string, unknown>;
      options?: OpenPopUpOptions;
    };

type PopUpContextValue = {
  state: PopUpState;
  open: (
    id: PopUpId,
    payload?: { props?: Record<string, unknown>; options?: OpenPopUpOptions },
  ) => void;
  close: () => void;
  isOpen: (id: PopUpId) => boolean;
  getProps: <T extends Record<string, unknown> = Record<string, unknown>>() => T | undefined;
};

const PopUpContext = React.createContext<PopUpContextValue | null>(null);

export const usePopUp = () => {
  const context = React.useContext(PopUpContext);
  if (!context) throw new Error('usePopUp must be used within PopUpProvider');
  return context;
};

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<PopUpState>({
    id: null,
    isOpen: false,
  });

  const close = React.useCallback(() => {
    setState({ id: null, isOpen: false });
  }, []);

  const open = React.useCallback<PopUpContextValue['open']>((id, payload) => {
    setState({
      id,
      isOpen: true,
      options: payload?.options,
      props: payload?.props,
    });
  }, []);

  const value = React.useMemo<PopUpContextValue>(() => {
    return {
      close,
      getProps: <T extends Record<string, unknown> = Record<string, unknown>>() =>
        state.isOpen ? (state.props as T | undefined) : undefined,
      isOpen: (id) => state.isOpen && state.id === id,
      open,
      state,
    };
  }, [close, open, state]);

  React.useEffect(() => {
    if (!state.isOpen) return;

    const html = document.documentElement;
    const prevOverflowY = html.style.overflowY;
    const opts = state.options ?? {};
    const shouldLockScroll = opts.lockScroll ?? true;
    const shouldCloseOnEsc = opts.closeOnEsc ?? true;

    if (shouldLockScroll) {
      html.style.overflowY = 'hidden';
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    if (shouldCloseOnEsc) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (shouldCloseOnEsc) {
        window.removeEventListener('keydown', onKeyDown);
      }
      if (shouldLockScroll) {
        html.style.overflowY = prevOverflowY;
      }
    };
  }, [close, state.isOpen, state.options]);

  return <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>;
};
