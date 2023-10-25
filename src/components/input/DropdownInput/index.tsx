import { FC, useEffect, useState, useRef } from "react";
import { IError } from "../../../utils";

export interface IDropdownInputOption {
  key: string;
  label: string;
}

interface IDropdownInputProps {
  optionsKey?: string;
  placeHolder: any;
  options: IDropdownInputOption[];
  isMulti: boolean;
  isSearchable: any;
  onChange: any;
  errors: Array<IError>;
  name: string;
  value: IDropdownInputOption | null;
  listValue: IDropdownInputOption[];
  removeErrors: (name: string) => void;
  onRemoveOption?: (option: IDropdownInputOption, inputName: string) => void;
}

const DropdownInput: FC<IDropdownInputProps> = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
  errors,
  name,
  value,
  listValue,
  onRemoveOption,
  removeErrors,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  // const [selectedValue, setSelectedValue] = useState<any>(null);
  // const [selectedMultiValue, setSelectedMultiValue] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e: any) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (_e: any) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!value && listValue.length === 0) {
      return `Select ${name}`;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {listValue.map((option: IDropdownInputOption) => (
            <div key={option.key} className="dropdown-tag-item">
              {option.label}
              <span
                onClick={(e) => onTagRemove(e, option)}
                className="dropdown-tag-close"
              >
                x
              </span>
            </div>
          ))}
        </div>
      );
    } else {
      return value?.label;
    }
  };

  const removeOption = (option: IDropdownInputOption) => {
    return listValue.filter((o: IDropdownInputOption) => o.key !== option.key);
  };

  const onTagRemove = (e: any, option: IDropdownInputOption) => {
    e.stopPropagation();
    if (onRemoveOption) {
      onRemoveOption(option, name);
    }
  };

  const onItemClick = (option: IDropdownInputOption) => {
    let newValue;
    if (isMulti) {
      if (
        listValue?.findIndex(
          (o: IDropdownInputOption) => o.key === option.key
        ) >= 0
      ) {
        newValue = removeOption(option);
        onChange(option, name);
      } else {
        onChange(option, name);
      }
      return;
    } else {
      newValue = option;
      onChange(newValue, name);
    }
  };

  const isSelected = (option: IDropdownInputOption) => {
    if (isMulti) {
      return (
        listValue?.filter((o: IDropdownInputOption) => o.key === option.key)
          .length > 0
      );
    }

    if (!value) {
      return false;
    }

    return value.key === option.key;
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter((option: IDropdownInputOption) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="text-input">
      <h1 className="text-input__label">{placeHolder}</h1>
      <div
        className="text-input auth__dropdown"
        style={
          errors.findIndex((err) => err.for === name) > -1
            ? { border: "1px solid red" }
            : undefined
        }
      >
        <div
          ref={inputRef}
          onClick={(e) => {
            handleInputClick(e);
            const hasErrors = errors.findIndex((err) => err.for === name) > -1;
            if (hasErrors) {
              removeErrors(name);
            }
          }}
          className="auth__dropdown-input"
        >
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className="">
            <div className="dropdown-down-button">v</div>
          </div>
          {showMenu && (
            <div className="dropdown-menu">
              {isSearchable && (
                <div className="search-box">
                  <input
                    onChange={onSearch}
                    value={searchValue}
                    ref={searchRef}
                  />
                </div>
              )}
              {getOptions().map((option: IDropdownInputOption) => (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.key}
                  className={`dropdown-item ${
                    isSelected(option) && "selected"
                  }`}
                >
                  {option?.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {errors.findIndex((err) => err.for === name) > -1 ? (
        <p
          className="auth__condition-text"
          style={{ marginTop: "2px", color: "red", marginBottom: "-15px" }}
        >
          {errors[errors.findIndex((err) => err.for === name)].message}
        </p>
      ) : null}
    </div>
  );
};

export default DropdownInput;
