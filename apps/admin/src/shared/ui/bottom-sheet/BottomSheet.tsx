'use client';
import { Overlay } from '@hotspot/ui';
import React, { type ReactNode, useEffect, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <Overlay isVisible={isOpen} onClick={onClose} />

      <div
        className={`relative w-full z-50 rounded-t-2xl bg-white p-6 shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-h-[70vh] overflow-y-auto py-6 px-4">{children}</div>
      </div>
    </div>
  );
};
