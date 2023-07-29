import { FC, useEffect, useState, useRef } from "react";

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

interface IDropdownInputOption {
  email: string;
  name: string;
}

interface IDropdownInputProps {
  placeHolder: any;
  options: IDropdownInputOption[];
  isMulti: boolean;
  isSearchable: any;
  onChange: any;
}

const DropdownInput: FC<IDropdownInputProps> = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
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
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option: IDropdownInputOption) => (
            <div key={option.email} className="dropdown-tag-item">
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
    return selectedValue.label;
  };

  const removeOption = (option: IDropdownInputOption) => {
    return selectedValue.filter(
      (o: IDropdownInputOption) => o.email !== option.email
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
          (o: IDropdownInputOption) => o.email === option.email
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
    onChange(newValue);
  };

  const isSelected = (option: IDropdownInputOption) => {
    if (isMulti) {
      return (
        selectedValue.filter(
          (o: IDropdownInputOption) => o.email === option.email
        ).length > 0
      );
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.email;
  };

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option: IDropdownInputOption) =>
        option.name?.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  return (
    <div className="dropdown-container">
      {/* {console.log(selectedValue, "check selected daw")} */}
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">v</div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {isSearchable && (
            <div className="search-box">
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          )}
          {getOptions().map((option: IDropdownInputOption) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.email}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownInput;
