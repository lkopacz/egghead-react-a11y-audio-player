import { useState, useRef, useEffect } from "react";

const DropdownMenu = ({
  buttonClass,
  buttonText,
  menuClass,
  className,
  children,
}) => {
  const buttonToggleRef = useRef(null);
  const dropdownWrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [focusableNodeList, setFocusableNodeList] = useState(null);
  const [firstFocusable, setFirstFocusable] = useState(null);
  const [lastFocusable, setLastFocusable] = useState(null);
  const tabKey = "Tab";
  const downKey = "ArrowDown";
  const upKey = "ArrowUp";
  const escKey = "Escape";

  useEffect(() => {
    const menuWrapper = dropdownWrapperRef.current.querySelector(
      `.${menuClass}`
    );

    const focusable = menuWrapper.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusable.forEach((item, index) => {
      item.setAttribute("tabindex", "-1");
      item.dataset.index = index;
    });
    setFocusableNodeList(focusable);
    setFirstFocusable(focusable[0]);
    setLastFocusable(focusable[focusable.length - 1]);
  }, []);

  const keyDownListeners = (e) => {
    const index = Number(e.target.getAttribute("data-index"));

    switch (e.key) {
      case tabKey:
        setIsOpen(false);
        break;
      case upKey:
        if (e.target === firstFocusable) {
          lastFocusable.focus();
        } else {
          dropdownWrapperRef.current
            .querySelector(`[data-index="${index - 1}"]`)
            .focus();
        }
        break;
      case downKey:
        if (e.target === lastFocusable) {
          firstFocusable.focus();
        } else {
          dropdownWrapperRef.current
            .querySelector(`[data-index="${index + 1}"]`)
            .focus();
        }
        break;
      case escKey:
        setIsOpen(false);
        buttonToggleRef.current.focus();
        break;
      default:
        break;
    }
  };

  const toggleMenu = () => {
    const focusElement = isOpen
      ? buttonToggleRef.current
      : focusableNodeList[0];

    focusableNodeList.forEach((item) => {
      if (isOpen) {
        item.removeEventListener("keydown", keyDownListeners);
      } else {
        item.addEventListener("keydown", keyDownListeners);
      }
    });

    setIsOpen(!isOpen);
    requestAnimationFrame(() => focusElement.focus());
  };

  return (
    <div ref={dropdownWrapperRef} className={className}>
      <button
        ref={buttonToggleRef}
        className={buttonClass}
        onClick={toggleMenu}
        aria-expanded={isOpen ? true : false}
        aria-haspopup="true"
      >
        {buttonText}
      </button>
      <div className={isOpen ? `${menuClass} open` : menuClass}>{children}</div>
    </div>
  );
};

export default DropdownMenu;
