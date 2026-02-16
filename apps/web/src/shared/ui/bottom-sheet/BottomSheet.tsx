'use client';
import { Overlay } from '@hotspot/ui';
import { cn } from 'node_modules/@hotspot/ui/src/lib/cssMerge';
import React, { type ReactNode, useEffect, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimate(true);
        });
      });

      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    } else {
      setIsAnimate(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <Overlay isVisible={isAnimate} onClick={onClose} />

      <div
        className={cn(
          'relative w-full z-modal rounded-t-2xl bg-white p-6 shadow-xl transition-transform duration-300 ease-out',
          isAnimate ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="max-h-[70vh] overflow-y-auto py-6 px-4">{children}</div>
      </div>
    </div>
  );
};
