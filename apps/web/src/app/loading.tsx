import ViewRight from '@hotspot/ui/assets/images/character/ViewRight.svg';
import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <ViewRight className="animate-bounce w-21 h-21" />
      <span className="text-gray-500 text-4">이동하는 중입니다...</span>
    </div>
  );
};

export default Loading;
