import { useState, useRef } from "react";
import uniqid from "uniqid";

const DropdownMenu = ({
  buttonText,
  buttonClass,
  menuClass,
  className,
  options,
  onOptionClick,
}) => {
  // create a state for open/close menu
  // need to be able to send focus to various places
  // a. to button upon close
  // b. to other menu items upon arrow keys
  // c. navigate focus in menu through arrow keys NOT tab

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
      : dropdownWrapperRef.current.querySelector("button");

    setIsOpen(!isOpen);
    requestAnimationFrame(() => focusElement.focus());
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onOptionClick(option);
  };

  const handleOptionKeyDown = (e, i) => {
    const optionsNodeList =
      dropdownWrapperRef.current.querySelectorAll("button");

    switch (e.key) {
      case tabKey:
        setIsOpen(false);
        break;
      case upKey:
        if (i === 0) {
          optionsNodeList[optionsNodeList.length - 1].focus();
        } else {
          optionsNodeList[i - 1].focus();
        }
        break;
      case downKey:
        if (i === optionsNodeList.length - 1) {
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
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
      >
        {buttonText}
      </button>
      <div
        ref={dropdownWrapperRef}
        id={dropdownId}
        role="menu"
        aria-labelledby={menuButtonId}
        className={isOpen ? `${menuClass} open` : menuClass}
      >
        {options.map((option, i) => (
          <button
            key={i}
            role="menuitem"
            tabIndex={-1}
            onClick={() => handleOptionClick(option)}
            onKeyDown={(e) => handleOptionKeyDown(e, i)}
          >
            {option}x
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
