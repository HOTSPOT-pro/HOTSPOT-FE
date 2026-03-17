'use client';
import CloseCircleFillIcon from '@hotspot/ui/assets/icons/close-circle-fill.svg';
import SearchIcon from '@hotspot/ui/assets/icons/search.svg';
import { type ChangeEvent, type FormEvent, useCallback, useState } from 'react';

interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
}

export const SearchBar = ({
  value,
  defaultValue = '',
  placeholder,
  onChange,
  onSubmit,
  onClear,
}: SearchBarProps) => {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const keyword = isControlled ? value : innerValue;
  const hasText = keyword.trim().length > 0;

  const handleChange = useCallback(
    (nextValue: string) => {
      if (!isControlled) {
        setInnerValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(keyword);
    },
    [keyword, onSubmit],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleChange(event.target.value);
    },
    [handleChange],
  );

  const handleClearClick = useCallback(() => {
    handleChange('');
    onClear?.();
  }, [handleChange, onClear]);

  const handleSearchClick = useCallback(() => {
    onSubmit?.(keyword);
  }, [keyword, onSubmit]);

  return (
    <div className="flex w-full items-center rounded-[4px] bg-gray-200 px-12 py-8">
      <form className="w-full pr-8" onSubmit={handleFormSubmit}>
        <input
          className="w-full font-title-title4-medium outline-none [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          id="searchInput"
          onChange={handleInputChange}
          placeholder={placeholder}
          type="search"
          value={keyword}
        />
      </form>
      <div className="flex gap-8">
        {hasText && (
          <button
            className="rounded-full text-gray-500 outline-none transition-colors hover:text-gray-700"
            onClick={handleClearClick}
            type="button"
          >
            <CloseCircleFillIcon className="h-24 w-24" />
          </button>
        )}
        <button className="outline-none" onClick={handleSearchClick} type="button">
          <SearchIcon className={`h-24 w-24 ${hasText ? 'text-gray-500' : 'text-gray-100'}`} />
        </button>
      </div>
    </div>
  );
};
