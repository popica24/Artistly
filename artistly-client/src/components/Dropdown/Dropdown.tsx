import { useState, useRef, useEffect } from "react";
import "./style.css";

type Props<T> = {
  header: string;
  field: any;
  items: Array<T> | undefined;
  getItemValue: (item: T) => string | number;
  getItemLabel: (item: T) => string;
};

const Dropdown = <T,>({
  header,
  field,
  items,
  getItemValue,
  getItemLabel,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | number>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (item: T) => {
    const value = getItemValue(item);
    setSelectedItem(value);
    setIsOpen(false);
    field.onChange(value); // This will trigger the react-hook-form field update
  };

  useEffect(() => {
    // Close the dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-select" ref={dropdownRef}>
      <span
        className="select-button transition-colors"
        role="combobox"
        aria-label="select button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="select-dropdown"
        onClick={toggleDropdown}
      >
        <span className="selected-value">
          {selectedItem &&
          getItemLabel(
            items?.find((item) => getItemValue(item) === selectedItem)!
          )
            ? getItemLabel(
                items?.find((item) => getItemValue(item) === selectedItem)!
              )
            : header}
        </span>
        <span className="arrow"></span>
      </span>
      {isOpen && (
        <ul className="select-dropdown" role="listbox" id="select-dropdown">
          {items?.map((item) => (
            <li
              key={getItemValue(item)}
              role="option"
              onClick={() => handleOptionClick(item)}
              className={selectedItem === getItemValue(item) ? "selected" : ""}
              tabIndex={0}
            >
              <input
                type="radio"
                id={`${getItemValue(item)}`}
                name="custom-dropdown"
                checked={selectedItem === getItemValue(item)}
                readOnly
              />
              <label htmlFor={`${getItemValue(item)}`}>
                {getItemLabel(item)}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
