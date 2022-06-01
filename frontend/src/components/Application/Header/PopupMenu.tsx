import { useState } from "react";

interface PopupMenuProps {
  element: JSX.Element,
  children: JSX.Element[];
}

export const PopupMenu = ({element, children}: PopupMenuProps) => {
  const [isShownMenu, setIsShownMenu] = useState(false);
  const onMouseEnter = () => setIsShownMenu(true);
  const onMouseLeave = () => setIsShownMenu(false);
  const onClickButton = () => setIsShownMenu(x => !x);

  return(
    <div
      className="relative inline-block center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        aria-haspopup="true"
        className="w-10"
        onClick={onClickButton}
      >
      {element}
      </button>
      {isShownMenu &&
      <div
        className="absolute bg-white text-black h-20 -left-24"
      >
        {children}
      </div>
      }

    </div>
  );
};
