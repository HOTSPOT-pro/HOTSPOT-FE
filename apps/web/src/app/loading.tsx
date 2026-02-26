import ViewRight from '@hotspot/ui/assets/images/character/ViewRight.svg';

const Loading = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
      <ViewRight className="animate-bounce" />
      <span className="text-gray-500">이동하는 중입니다...</span>
    </div>
  );
};

export default Loading;
