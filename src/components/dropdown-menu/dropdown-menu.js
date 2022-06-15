import { useState, useRef } from "react";
import uniqid from "uniqid";

const DropdownMenu = ({
  buttonClass,
  buttonText,
  menuClass,
  className,
  options,
  onOptionClick,
}) => {
  const buttonToggleRef = useRef(null);
  const dropdownWrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonId = uniqid("menu-");
  const dropdownId = uniqid("dropdown-");

  const tabKey = "Tab";
  const downKey = "ArrowDown";
  const upKey = "ArrowUp";
  const escKey = "Escape";

  const toggleMenu = () => {
    const focusElement = isOpen
      ? buttonToggleRef.current
      : dropdownWrapperRef.current.querySelector('[role="menuitem"]');

    setIsOpen(!isOpen);
    requestAnimationFrame(() => focusElement.focus());
  };

  const handleItemClick = (option) => {
    setIsOpen(false);
    onOptionClick(option);
    buttonToggleRef.current.focus();
  };

  const handleItemKeyDown = (e, i) => {
    const optionsNodeList =
      dropdownWrapperRef.current.querySelectorAll('[role="menuitem"]');
    switch (e.key) {
      case tabKey:
        setIsOpen(false);
        break;
      case upKey:
        if (i === 0) {
          optionsNodeList[options.length - 1].focus();
        } else {
          optionsNodeList[i - 1].focus();
        }
        break;
      case downKey:
        if (i === options.length - 1) {
          optionsNodeList[0].focus();
        } else {
          optionsNodeList[i + 1].focus();
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

  return (
    <div className={className}>
      <button
        ref={buttonToggleRef}
        id={menuButtonId}
        className={buttonClass}
        onClick={toggleMenu}
        aria-expanded={isOpen ? true : false}
        aria-haspopup="true"
        aria-controls={dropdownId}
      >
        {buttonText}
      </button>
      <div
        ref={dropdownWrapperRef}
        role="menu"
        id={dropdownId}
        aria-labelledby={menuButtonId}
        className={isOpen ? `${menuClass} open` : menuClass}
      >
        {options.map((option, i) => (
          <button
            key={i}
            role="menuitem"
            onClick={() => handleItemClick(option)}
            onKeyDown={(e) => handleItemKeyDown(e, i)}
          >
            {option}x
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
