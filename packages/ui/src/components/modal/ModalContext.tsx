'use client';

import React from 'react';

export type ModalId = string;

export type OpenModalOptions = {
  closeOnOutsideClick?: boolean; // TODO: 안됨 추후 해결
  closeOnEsc?: boolean;
  lockScroll?: boolean; // TODO: 원래 막아두기
};

export type OpenModalPayload = {
  id: ModalId;
  props?: Record<string, unknown>;
  options?: OpenModalOptions;
};

type ModalState =
  | { isOpen: false; id: null; props?: undefined; options?: undefined }
  | {
      isOpen: true;
      id: ModalId;
      props?: Record<string, unknown>;
      options?: OpenModalOptions;
    };

type ModalContextValue = {
  state: ModalState;
  open: (
    id: ModalId,
    payload?: { props?: Record<string, unknown>; options?: OpenModalOptions },
  ) => void;
  close: () => void;
  /** 현재 열린 모달이 특정 id인지 */
  isOpen: (id: ModalId) => boolean;
  /** 현재 열린 모달의 props 가져오기 */
  getProps: <T extends Record<string, unknown> = Record<string, unknown>>() => T | undefined;
};

const ModalContext = React.createContext<ModalContextValue | null>(null);

export function useModal() {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ModalState>({
    id: null,
    isOpen: false,
  });

  const close = React.useCallback(() => {
    setState({ id: null, isOpen: false });
  }, []);

  const open = React.useCallback<ModalContextValue['open']>((id, payload) => {
    setState({
      id,
      isOpen: true,
      options: payload?.options,
      props: payload?.props,
    });
  }, []);

  const value = React.useMemo<ModalContextValue>(() => {
    return {
      close,
      getProps: <T extends Record<string, unknown> = Record<string, unknown>>() =>
        state.isOpen ? (state.props as T | undefined) : undefined,
      isOpen: (id) => state.isOpen && state.id === id,
      open,
      state,
    };
  }, [state, open, close]);

  React.useEffect(() => {
    if (!state.isOpen) return;

    const html = document.documentElement;
    const prevOverflowY = html.style.overflowY;

    const opts = state.options ?? {};
    const shouldLockScroll = opts.lockScroll ?? true;
    if (shouldLockScroll) {
      // iOS 대응: overscroll 방지
      html.style.overflowY = 'hidden';
    }

    const shouldCloseOnEsc = opts.closeOnEsc ?? true;
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
  }, [state.isOpen, state.options, close]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
