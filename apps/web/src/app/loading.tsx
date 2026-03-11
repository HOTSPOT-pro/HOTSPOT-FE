import ViewRightAnimatedIcon from '@hotspot/ui/assets/images/character/view-right-animated.svg';

const Loading = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
      <ViewRightAnimatedIcon className="animate-bounce" />
      <p className="text-gray-500 items-center justify-center">
        <span>이동하는 중입니다</span>
        <span className="animate-dot-appear-1 inline-block">.</span>
        <span className="animate-dot-appear-2 inline-block">.</span>
        <span className="animate-dot-appear-3 inline-block">.</span>
      </p>
    </div>
  );
};

export default Loading;
