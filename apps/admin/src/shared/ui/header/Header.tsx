import MenuIcon from '@hotspot/ui/assets/icons/menu.svg';

interface HeaderProps {
  headerText: string;
  showOpenButton?: boolean;
  onOpenSideBar?: () => void;
}

export const Header = ({ headerText, showOpenButton = false, onOpenSideBar }: HeaderProps) => {
  return (
    <div className="flex h-[58px] w-full items-center gap-4 border-b border-gray-200 bg-white px-4">
      {showOpenButton && (
        <button
          aria-label="사이드 메뉴 열기"
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100"
          onClick={onOpenSideBar}
          type="button"
        >
          <MenuIcon />
        </button>
      )}
      <h1 className="text-[18px]">{headerText}</h1>
    </div>
  );
};
