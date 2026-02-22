'use client';

import { forwardRef, type InputHTMLAttributes, useState } from 'react';
import XCircle from '../../assets/icons/close-circle-fill.svg';
import Eye from '../../assets/icons/eye-fill.svg';
import EyeOff from '../../assets/icons/eye-off-fill.svg';
import { cn } from '../../lib/cssMerge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, type = 'text', onClear, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isNumber = type === 'number';

    // 인풋 타입 체크
    let inputType = type;
    if (isPassword && showPassword) inputType = 'text';
    if (isPassword && !showPassword) inputType = 'password';

    return (
      <div className={cn('flex flex-col w-full max-w-sm group', className)}>
        <label
          className="text-sm font-medium text-gray-600 transition-colors group-focus-within:text-purple-600"
          htmlFor={id}
        >
          {label}
        </label>

        <div className="relative w-full flex items-center">
          <input
            {...props}
            className={cn(
              'peer w-full bg-transparent py-2 text-gray-900 outline-none border-b-2 border-gray-200 transition-all',
              'placeholder:text-gray-400',
              error ? 'border-red-500' : 'focus:border-transparent',
            )}
            id={id}
            ref={ref}
            type={inputType}
          />

          {/* 하단 보더 애니메이션 */}
          <span
            className={cn(
              'absolute bottom-0 left-0 h-0.5 w-0 bg-purple-600 transition-all duration-300 group-focus-within:w-full',
              error && 'bg-red-500 w-full',
            )}
          />

          <div className="absolute right-0 flex items-center pr-1">
            {/* 삭제 */}
            {!isNumber ? (
              <button
                aria-label="입력값 지우기"
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={onClear}
                type="button"
              >
                <XCircle className="w-4 h-4" />
              </button>
            ) : null}

            {/* 비밀번호 토글 */}
            {isPassword ? (
              <button
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                aria-pressed={showPassword}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            ) : null}
          </div>
        </div>

        {error ? <p className="mt-1.5 text-xs text-red-500">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
