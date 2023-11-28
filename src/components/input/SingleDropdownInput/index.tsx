import { ChangeEvent, FC, MouseEventHandler, useRef, useState } from "react";
import useListenToOutsideClicks from "../DropdownInput/useListenToOutsideClicks";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

interface IDropdownItem {
  key: string;
  label: string;
}

interface IDropdown {
  value: IDropdownItem;
  title: string;
  options: IDropdownItem[];
  isSearchable: boolean;
  onChange: (value: IDropdownItem) => void;
}

const DropdownSingle: FC<IDropdown> = ({
  options,
  isSearchable,
  title,
  onChange,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<IDropdownItem>();
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  useListenToOutsideClicks({
    inputRef,
    searchRef,
    showMenu,
    setShowMenu,
  });
  const handleInputClick: MouseEventHandler = () => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return "Select...";
    } else {
      return selectedValue.label;
    }
  };

  const onItemClick = (option: IDropdownItem) => {
    const newValue = option;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: IDropdownItem) => {
    if (!selectedValue) {
      return false;
    } else {
      return selectedValue.key === option.key;
    }
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  return (
    <div className="dropdown">
      <p>{title}</p>
      <div className="dropdown__container">
        <div
          ref={inputRef}
          onClick={handleInputClick}
          className="dropdown__input"
        >
          <div className="dropdown__selected-value">{getDisplay()}</div>
          <Icon />
        </div>
        {showMenu && (
          <div className="dropdown__menu">
            {isSearchable ? (
              <div className="dropdown__search-box">
                <input
                  onChange={onSearch}
                  value={searchValue}
                  ref={searchRef}
                />
              </div>
            ) : null}
            {getOptions().map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.key}
                className={`dropdown__item ${
                  isSelected(option) && "dropdown__selected"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownSingle;
