'use client';
import { Overlay } from '@hotspot/ui';
import { cn } from 'node_modules/@hotspot/ui/src/lib/cssMerge';
import React, { type ReactNode, useEffect, useRef, useState } from 'react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeRange?: number;
}

export const BottomSheet = ({ isOpen, onClose, children, closeRange = 100 }: BottomSheetProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimate, setIsAnimate] = useState(false);

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setDragY(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimate(true));
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

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    let clientY = 0;
    if ('touches' in e) {
      if (!e.touches[0]) return;
      clientY = e.touches[0].clientY;
    } else {
      clientY = e.clientY;
    }
    startY.current = clientY - dragY;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    let clientY: number;
    if ('touches' in e) {
      if (!e.touches[0]) return;
      clientY = e.touches[0].clientY;
    } else {
      clientY = e.clientY;
    }

    if (typeof startY.current === 'number') {
      const currentDragY = Math.max(0, clientY - startY.current);
      setDragY(currentDragY);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragY > closeRange) {
      onClose();
    } else {
      setDragY(0);
    }
  };

  if (!shouldRender) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <버튼 중첩 문제 때문에 여기 버튼 쓸 수 없음>
    <div
      className="fixed inset-0 flex items-end justify-center overflow-hidden"
      onMouseLeave={handleEnd}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onTouchMove={handleMove}
      role="presentation"
    >
      <Overlay isVisible={isAnimate && dragY < closeRange} onClick={onClose} />

      <div
        className={cn(
          'relative w-full z-modal rounded-t-2xl bg-white shadow-xl',
          !isDragging && 'transition-transform duration-300 ease-out',
          !isAnimate ? 'translate-y-full' : 'translate-y-0',
        )}
        style={{
          transform: isDragging ? `translateY(${dragY}px)` : undefined,
        }}
      >
        <button
          aria-label="바텀시트 드래그 핸들"
          className="flex w-full justify-center py-4 cursor-grab active:cursor-grabbing bg-transparent border-none appearance-none outline-none focus:ring-0"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          type="button"
        >
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </button>

        <div className="max-h-[70vh] overflow-y-auto px-6 pb-10">{children}</div>

        <div className="absolute top-full h-screen w-full bg-white" />
      </div>
    </div>
  );
};
