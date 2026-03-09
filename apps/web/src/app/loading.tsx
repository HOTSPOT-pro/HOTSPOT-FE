import ViewRight from '@hotspot/ui/assets/images/character/view-right-animated.svg';

const Loading = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
      <ViewRight className="w-20 h-20" />
      <span className="text-gray-500">이동하는 중입니다...</span>
    </div>
  );
};

export default Loading;
