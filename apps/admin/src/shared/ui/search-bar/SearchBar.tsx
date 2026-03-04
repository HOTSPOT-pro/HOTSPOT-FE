import CloseCircleFillIcon from '@hotspot/ui/assets/icons/close-circle-fill.svg';
import SearchIcon from '@hotspot/ui/assets/icons/search.svg';
import { useState } from 'react';

interface SearchBarProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
}
export const SearchBar = ({
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  onClear,
}: SearchBarProps) => {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const keyword = isControlled ? value : innerValue;
  const hasText = keyword.trim().length > 0;

  const handleChange = (nextValue: string) => {
    if (!isControlled) {
      setInnerValue(nextValue);
    }
    onChange?.(nextValue);
  };

  return (
    <div className="flex w-full px-3 py-2 rounded-[4px] items-center bg-gray-200">
      <form
        className="w-full pr-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit?.(keyword);
        }}
      >
        <input
          className="w-full text-[15px] outline-none [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
          id="searchInput"
          onChange={(event) => handleChange(event.target.value)}
          placeholder="번호로 가족을 검색해보세요"
          type="search"
          value={keyword}
        />
      </form>
      <div className="flex gap-2">
        {hasText && (
          <button
            className="outline-none rounded-full text-gray-500 transition-colors hover:text-gray-700"
            onClick={() => {
              handleChange('');
              onClear?.();
            }}
            type="button"
          >
            <CloseCircleFillIcon className="w-6 h-6" />
          </button>
        )}
        <button className="outline-none" onClick={() => onSubmit?.(keyword)} type="button">
          <SearchIcon className={`w-6 h-6 ${hasText ? 'text-gray-500' : 'text-gray-100'}`} />
        </button>
      </div>
    </div>
  );
};
