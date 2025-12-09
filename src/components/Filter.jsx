import { useEffect, useRef, useState } from "react";

const Filter = ({ onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState("Sort By");
  const dropdownRef = useRef(null);

  const options = [
    "Fantasy",
    "NonFiction",
    "Romance",
    "Biographies",
    "Science",
    "Philosophy",
  ];

  const handleSelect = (option) => {
    setSelectedText(option);
    onCategoryChange(option); 
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropDown" onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
      <div className="wrapper">
        <div className="selected">{selectedText}</div>
        <i className={`ri-arrow-drop-down-fill arrow ${isOpen ? "open" : ""}`}></i>
      </div>

      <div className={`filterList ${isOpen ? "show" : ""}`}>
        {options.map((option) => (
          <div className="items" key={option} onClick={() => handleSelect(option)}>
            <div className="filterItemsText">{option}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;