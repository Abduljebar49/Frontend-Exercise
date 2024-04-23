import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInputValue,
  fetchOptions,
  selectInputValue,
  selectOptions,
} from "../redux/reducers/autoCompleteSlice";
import useLocation from "../hooks/userLocation";

interface IProps {
  onSelected: (value: string) => void;
}
const Autocomplete = ({ onSelected }: IProps) => {
  const { city, country } = useLocation();

  const dispatch = useDispatch();
  const inputValue = useSelector(selectInputValue);
  const options = useSelector(selectOptions);
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  type Timeout = ReturnType<typeof setTimeout>;
  const [hideTimeout, setHideTimeout] = useState<Timeout | null>(null);

  useEffect(() => {
    if (inputValue) {
      dispatch(fetchOptions(inputValue));
    }
  }, [inputValue, dispatch]);

  useEffect(() => {
    if(city && country){
      onSelected(`${city}, ${country}`)
    }
  }, [city, country]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch(setInputValue(inputValue));
    setFilteredOptions(options);
    setShowDropdown(true);
  };

  const handleOptionSelect = (option: any) => {
    const name = `${option.address?.city}, ${option.address.country}`;
    onSelected(name);
    dispatch(setInputValue(name));
    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
    setHideTimeout(timeout);
  };

  const handleInputFocus = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setShowDropdown(true);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        name="address"
        id="address"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter an address"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      {showDropdown && inputValue && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionSelect(option)}
            >
              {option.address?.city}, {option.address?.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
