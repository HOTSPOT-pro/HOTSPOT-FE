import { Slider, Toggle } from '@hotspot/ui';
import type { Datalimit, UpdateDatalimit } from '../model/types';

interface DataLimitSectionProps {
  datalimit?: Datalimit;
  draft: Partial<UpdateDatalimit>;
  onUpdate: (updates: Partial<UpdateDatalimit>) => void;
}

export const DataLimitSection = ({ datalimit, draft, onUpdate }: DataLimitSectionProps) => {
  const displayLocked = draft.isLocked ?? datalimit?.isLocked ?? false;
  const displayLimit = draft.dataLimit ?? datalimit?.dataLimit ?? 0;

  const handleBlockToggle = (checked: boolean) => {
    onUpdate({ isLocked: checked });
  };
  const handleSliderChange = (value: number) => {
    onUpdate({ dataLimit: value });
  };

  return (
    <div className="py-4 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold leading-4">즉시 차단</p>
        <Toggle checked={displayLocked} id={'block'} onChange={handleBlockToggle} />
      </div>
      <div>
        <p className="text-xs font-bold leading-4">데이터 한도</p>
        <Slider
          initialValue={displayLimit}
          maxNum={datalimit?.familyDataAmount ?? 0}
          minNum={0}
          onChange={handleSliderChange}
          step={5}
        />
      </div>
    </div>
  );
};
