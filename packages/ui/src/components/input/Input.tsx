'use client';

import { type InputHTMLAttributes, useState } from 'react';
import XCircle from '../../assets/images/icon/close-circle.svg';
import Eye from '../../assets/images/icon/eye.svg';
import EyeOff from '../../assets/images/icon/eye-off.svg';
import { cn } from '../../lib/cssMerge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  onClear?: () => void;
}

export const Input = ({
  label,
  error,
  className,
  type = 'text',
  value,
  onClear,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isNumber = type === 'number';
  const hasValue = String(value ?? '').length > 0;

  // 인풋 타입 체크
  let inputType = type;
  if (isPassword && showPassword) inputType = 'text';
  if (isPassword && !showPassword) inputType = 'password';

  // 버튼 노출 조건
  const showClearButton = hasValue && onClear && !isNumber;
  const showPasswordButton = hasValue && isPassword;

  return (
    <div className={cn('flex flex-col w-full max-w-sm group', className)}>
      <label
        className="text-sm font-medium text-gray-600 transition-colors group-focus-within:text-purple-600"
        htmlFor={props.id}
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
          id={props.id}
          type={inputType}
          value={value}
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
          {showClearButton ? (
            <button
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClear}
              type="button"
            >
              <XCircle className="w-4 h-4" />
            </button>
          ) : null}

          {/* 비밀번호 토글 */}
          {showPasswordButton ? (
            <button
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
};
