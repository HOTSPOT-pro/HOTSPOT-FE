'use client';

import React from 'react';

export type ModalId = string;

export type OpenModalOptions = {
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  lockScroll?: boolean;
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

function lockScroll() {
  const html = document.documentElement;
  // iOS 대응: overscroll 방지
  html.style.overflowY = 'hidden';
}

function unlockScroll() {
  const html = document.documentElement;
  html.style.overflowY = 'auto';
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
      getProps: () => (state.isOpen ? (state.props as any) : undefined),
      isOpen: (id) => state.isOpen && state.id === id,
      open,
      state,
    };
  }, [state, open, close]);

  React.useEffect(() => {
    if (!state.isOpen) {
      unlockScroll();
      return;
    }

    const opts = state.options ?? {};
    const shouldLock = opts.lockScroll ?? true;
    if (shouldLock) lockScroll();

    const closeOnEsc = opts.closeOnEsc ?? true;
    if (!closeOnEsc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [state.isOpen, state.options, close]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
