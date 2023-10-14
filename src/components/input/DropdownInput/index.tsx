import { FC, useEffect, useState, useRef } from "react";
import { IError } from "../../../utils";

// const dummyItems = [
//   {
//     id: "admin1@gmail.com",
//     name: "John Doe",
//   },
//   {
//     id: "admin2@gmail.com",
//     name: "Jane Doe",
//   },
//   {
//     id: "admin3@gmail.com",
//     name: "Juan Doe",
//   },
// ];

export interface IDropdownInputOption {
  key: string;
  name: string;
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
  removeErrors: (name: string) => void;
}

const DropdownInput: FC<IDropdownInputProps> = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
  errors,
  name,
  removeErrors,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(
    isMulti ? ([] as any[]) : null
  );
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
    if (!selectedValue || selectedValue.length === 0) {
      return `Select ${name}`;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option: IDropdownInputOption) => (
            <div key={option.key} className="dropdown-tag-item">
              {option.name}
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
    }
    return selectedValue.name;
  };

  const removeOption = (option: IDropdownInputOption) => {
    return selectedValue.filter(
      (o: IDropdownInputOption) => o.key !== option.key
    );
  };

  const onTagRemove = (e: any, option: IDropdownInputOption) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option: IDropdownInputOption) => {
    let newValue;
    if (isMulti) {
      if (
        selectedValue.findIndex(
          (o: IDropdownInputOption) => o.key === option.key
        ) >= 0
      ) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue, name);
  };

  const isSelected = (option: IDropdownInputOption) => {
    if (isMulti) {
      return (
        selectedValue.filter((o: IDropdownInputOption) => o.key === option.key)
          .length > 0
      );
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.key;
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter((option: IDropdownInputOption) =>
      option.name?.toLowerCase().includes(searchValue.toLowerCase())
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
            if (errors.findIndex((err) => err.for === name) > -1) {
              removeErrors(name);
            }
          }}
          className="auth__dropdown-input"
        >
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className="">
            <div className="">v</div>
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
                  {option?.name}
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
