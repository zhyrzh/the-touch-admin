import {
  useRef,
  useState,
  FC,
  MouseEventHandler,
  ChangeEvent,
  MouseEvent,
} from "react";
import useListenToOutsideClicks from "./useListenToOutsideClicks";
import { IError } from "../../../utils";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
    </svg>
  );
};

interface IDropdownItem {
  key: string;
  label: string;
}

interface IDropdown {
  value: IDropdownItem[];
  title: string;
  options: IDropdownItem[];
  isSearchable: boolean;
  errors: Array<IError>;
  name: string;
  isRequired?: boolean;
  onChange: (value: IDropdownItem[]) => void;
}

const DropdownMulti: FC<IDropdown> = ({
  value,
  title,
  options,
  isSearchable,
  errors,
  name,
  isRequired = false,
  onChange,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (value.length === 0) {
      return "Select option";
    } else {
      return (
        <div className="dropdown__tags">
          {value.map((option) => (
            <div key={option.key} className="dropdown__tag-item">
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown__tag-close"
              >
                <CloseIcon />
              </span>
            </div>
          ))}
        </div>
      );
    }
  };

  const removeOption = (option: IDropdownItem) => {
    return value.filter((o) => o.key !== option.key);
  };

  const onTagRemove = (e: MouseEvent, option: IDropdownItem) => {
    e.stopPropagation();
    const newValue = removeOption(option);

    onChange(newValue);
  };

  const onItemClick = (option: IDropdownItem) => {
    let newValue;
    if (value.findIndex((o) => o.key === option.key) >= 0) {
      newValue = removeOption(option);
    } else {
      newValue = [...value, option];
    }

    onChange(newValue);
  };

  const isSelected = (option: IDropdownItem) => {
    return value.filter((o) => o.key === option.key).length > 0;
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
      <p className="dropdown__title">{title}</p>
      <div
        className="dropdown__container"
        style={
          isRequired && errors.findIndex((err) => err.for === name) > -1
            ? { border: "1px solid red" }
            : undefined
        }
      >
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
        {isRequired &&
        errors &&
        errors.findIndex((err) => err.for === name) > -1 ? (
          <p className="dropdown__error-text">
            {errors[errors.findIndex((err) => err.for === name)].message}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default DropdownMulti;
