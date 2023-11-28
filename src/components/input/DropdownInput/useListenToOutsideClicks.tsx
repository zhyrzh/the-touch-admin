import { useEffect, RefObject } from "react";

interface IProp {
  inputRef: RefObject<HTMLDivElement>;
  searchRef: RefObject<HTMLInputElement>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const useListenToOutsideClicks = ({
  inputRef,
  searchRef,
  showMenu,
  setShowMenu,
}: IProp) => {
  useEffect(() => {
    // setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMenu]);

  useEffect(() => {
    const handler: (this: Window, ev: globalThis.MouseEvent) => any = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as HTMLInputElement)
      ) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
};

export default useListenToOutsideClicks;
