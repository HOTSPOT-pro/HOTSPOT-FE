'use client';

import { forwardRef, type InputHTMLAttributes, useState } from 'react';
import XCircle from '../../assets/icons/close-circle-fill.svg';
import Eye from '../../assets/icons/eye-fill.svg';
import EyeOff from '../../assets/icons/eye-off-fill.svg';
import { cn } from '../../lib/cssMerge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  description?: string;
  error?: string;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, description, className, type = 'text', onClear, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const handleClear = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = '';
        ref.current.focus();
      }
      onClear?.();
    };

    return (
      <div className={cn('flex flex-col w-full group', className)}>
        <label
          className="font-title-title5-medium text-text-secondary transition-colors"
          htmlFor={id}
        >
          {label}
        </label>

        <div className="relative w-full flex items-center border-b border-border-divider gap-4">
          <input
            {...props}
            className={cn(
              'peer w-full bg-transparent py-8 text-gray-900 font-body-body1 outline-none transition-all leading-none',
              'placeholder:text-text-placeholder',
            )}
            id={id}
            ref={ref}
            type={showPassword ? 'text' : type}
          />

          {/* 하단 보더 애니메이션 */}
          <span
            className={cn(
              'absolute -bottom-0.25 left-0 h-0.25 w-0 bg-purple-600 transition-all duration-300 group-focus-within:w-full',
              error && 'bg-red-500 w-full',
            )}
          />

          <div className="right-0 flex items-center gap-8">
            {/* 삭제 */}
            <button
              aria-label="입력값 지우기"
              className="w-5.5 h-5.5 text-gray-400 hover:text-gray-600 transition-colors flex justify-center items-center"
              onClick={handleClear}
              type="button"
            >
              <XCircle className="w-4.5 h-4.5" />
            </button>

            {/* 비밀번호 토글 */}
            {isPassword ? (
              <button
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                aria-pressed={showPassword}
                className="w-5.5 h-5.5 line text-gray-400 hover:text-gray-600 transition-colors flex justify-center items-center"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff className="w-4.5 h-4.5" />
                ) : (
                  <Eye className="w-4.5 h-4.5" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        {error ? <span className="mt-8 font-body-body3 text-text-error">{error}</span> : null}
        {description ? (
          <span className="mt-8 font-body-body3 text-text-tertiary">{description}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
