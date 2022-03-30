import { useState } from "react";

const DropdownMenu = ({
  buttonClass,
  defaultOption,
  listboxClass,
  className,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [activeDescendant, setActiveDescendant] = useState(
    options.findIndex((option) => option === defaultOption)
  );

  const tabKey = "Tab";
  const downKey = "ArrowDown";
  const upKey = "ArrowUp";
  const escKey = "Escape";
  const enterKey = "Enter";
  const spaceKey = " ";

  const handleKeyDown = (e) => {
    switch (e.key) {
      case tabKey:
        if (isOpen) {
          setSelectedOption(options[activeDescendant]);
          setIsOpen(false);
        }

        break;
      case enterKey:
      case spaceKey:
        if (isOpen) {
          setSelectedOption(options[activeDescendant]);
          setIsOpen(false);
          e.preventDefault();
        }
        break;
      case upKey:
        if (activeDescendant === 0) {
          setActiveDescendant(options.length - 1);
        } else {
          setActiveDescendant(activeDescendant - 1);
        }
        break;
      case downKey:
        if (!isOpen) {
          setIsOpen(true);
        } else {
          if (activeDescendant === options.length - 1) {
            setActiveDescendant(0);
          } else {
            setActiveDescendant(activeDescendant + 1);
          }
        }
        break;
      case escKey:
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleClick = () => {};

  const toggleListbox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <label className="visually-hidden" id="dropdown-label">
        Select Playback rate
      </label>
      <div className={className}>
        <button
          role="combobox"
          className={buttonClass}
          aria-labelledby="dropdown-label"
          id="combo-1"
          onClick={toggleListbox}
          onKeyDown={handleKeyDown}
          aria-controls="listbox-1"
          aria-expanded={isOpen ? true : false}
          aria-haspopup="listbox"
          aria-activedescendant={isOpen ? `option-${activeDescendant}` : ""}
        >
          {selectedOption}
        </button>
        <ul
          role="listbox"
          className={!isOpen ? "visually-hidden" : listboxClass}
          id="listbox-1"
          aria-labelledby="dropdown-label"
          tabIndex={-1}
        >
          {options.map((item, i) => (
            <li
              role="option"
              id={`option-${i}`}
              key={i}
              aria-selected={selectedOption === item ? true : false}
              className={i === activeDescendant ? "focus-ring" : undefined}
              onClick={handleClick}
            >
              {item}x
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropdownMenu;
