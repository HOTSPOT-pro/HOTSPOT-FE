'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cssMerge';
import { useModal } from './ModalContext';

type Registry = Record<
  string,
  React.ComponentType<{ close: () => void; props?: Record<string, unknown> }>
>;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ModalRootRenderer({ registry }: { registry: Registry }) {
  const { state, close } = useModal();

  const [mounted, setMounted] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!(mounted && state.isOpen && state.id)) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    lastFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const getFocusableElements = () => {
      return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
      );
    };

    const initialTarget = getFocusableElements()[0] ?? dialog;
    initialTarget.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;
      const isInsideDialog = active instanceof Node && dialog.contains(active);

      if (e.shiftKey) {
        if (!isInsideDialog || active === first) {
          e.preventDefault();
          last.focus();
        }
        return;
      }

      if (!isInsideDialog || active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      lastFocusedRef.current?.focus();
      lastFocusedRef.current = null;
    };
  }, [mounted, state.isOpen, state.id]);

  if (!mounted) return null;

  if (!(state.isOpen && state.id)) return null;

  const Comp = registry[state.id];
  if (!Comp) return null;

  const closeOnOutside = state.options?.closeOnOutsideClick ?? true;

  return createPortal(
    <div className="fixed inset-0 z-[999]">
      {closeOnOutside ? (
        <button
          aria-label="Close modal overlay"
          className={cn('absolute inset-0 bg-black/40 cursor-pointer')}
          onClick={close}
          type="button"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
      )}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div aria-modal="true" ref={dialogRef} role="dialog" tabIndex={-1}>
          <Comp close={close} props={state.props} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
