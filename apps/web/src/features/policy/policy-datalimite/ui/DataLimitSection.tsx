import { Slider, Toggle } from '@hotspot/ui';
import type { Datalimit, UpdateDatalimit } from '../model/types';

interface DataLimitSectionProps {
  datalimit?: Datalimit;
  minNum?: number;
  draft: Partial<UpdateDatalimit>;
  onUpdate: (updates: Partial<UpdateDatalimit>) => void;
}

export const DataLimitSection = ({ datalimit, minNum, draft, onUpdate }: DataLimitSectionProps) => {
  const displayLocked = draft.isLocked ?? datalimit?.isLocked ?? false;
  const displayLimit = draft.dataLimit ?? datalimit?.dataLimit ?? 0;

  const handleBlockToggle = (checked: boolean) => {
    onUpdate({ isLocked: checked });
  };
  const handleSliderChange = (value: number) => {
    onUpdate({ dataLimit: value });
  };

  return (
    <div className="px-8 py-16 flex flex-col gap-16">
      <div className="flex items-center justify-between">
        <p className="font-heading-heading3">즉시 차단</p>
        <Toggle checked={displayLocked} id={'block'} onChange={handleBlockToggle} />
      </div>
      <div>
        <p className="font-heading-heading3">데이터 한도</p>
        <Slider
          initialValue={displayLimit}
          maxNum={datalimit?.familyDataAmount ?? 0}
          minNum={minNum ?? 0}
          onChange={handleSliderChange}
          step={1}
        />
      </div>
    </div>
  );
};
