import MenuIcon from '@hotspot/ui/assets/icons/menu.svg';

interface HeaderProps {
  headerText: string;
  showOpenButton?: boolean;
  onOpenSideBar?: () => void;
}

export const Header = ({ headerText, showOpenButton = false, onOpenSideBar }: HeaderProps) => {
  return (
    <div className="flex h-14.5 w-full items-center gap-16 border-b border-gray-200 bg-white px-16">
      {showOpenButton && (
        <button
          aria-label="사이드 메뉴 열기"
          className="flex h-32 w-32 items-center justify-center rounded-md hover:bg-gray-100"
          onClick={onOpenSideBar}
          type="button"
        >
          <MenuIcon />
        </button>
      )}
      <h1 className="font-title-title3-semibold">{headerText}</h1>
    </div>
  );
};
