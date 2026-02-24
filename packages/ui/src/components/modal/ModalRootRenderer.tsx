'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cssMerge';
import { useModal } from './ModalContext';

type Registry = Record<
  string,
  React.ComponentType<{ close: () => void; props?: Record<string, unknown> }>
>;

export function ModalRootRenderer({ registry }: { registry: Registry }) {
  const { state, close } = useModal();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (!(state.isOpen && state.id)) return null;

  const Comp = registry[state.id];
  if (!Comp) return null;

  const closeOnOutside = state.options?.closeOnOutsideClick ?? true;

  return createPortal(
    <div className="fixed inset-0 z-[999]">
      <button
        aria-label="Close modal overlay"
        className={cn(
          'absolute inset-0 bg-black/40',
          closeOnOutside ? 'cursor-pointer' : 'pointer-events-none',
        )}
        onClick={() => {
          if (!closeOnOutside) return;
          close();
        }}
        type="button"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Comp close={close} props={state.props} />
      </div>
    </div>,
    document.body,
  );
}
