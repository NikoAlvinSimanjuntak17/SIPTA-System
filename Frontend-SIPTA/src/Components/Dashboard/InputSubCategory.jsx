/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const InputSubCategory = ({ categoryId, selectedSubCategory, onSubCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subcategories, setSubCategories] = useState([]);
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState(
    selectedSubCategory ? subcategories.find(subcategory => subcategory.id === selectedSubCategory)?.sub_category_name : "Choose Sub Category"
  );

  const dropdownRef = useRef(null); // Create a reference for the dropdown

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:8000/api/subcategories/by-category-id/${categoryId}`)
        .then((response) => {
          setSubCategories(response.data);
          setSelectedSubCategoryName("Choose Sub Category");
        })
        .catch((error) => {
          console.error("Error fetching sub categories:", error);
        });
    }
  }, [categoryId]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (subcategory) => {
    setSelectedSubCategoryName(subcategory.sub_category_name);
    setIsOpen(false);
    if (onSubCategoryChange) {
      onSubCategoryChange(subcategory.id);
    }
  };

  const handleAddSubCategory = () => {
    // Implement the functionality to add a new subcategory here
    console.log("Add Sub Category button clicked");
  };

  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3" ref={dropdownRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Sub Kategori</h2>
        <button
          onClick={handleAddSubCategory}
          className="text-black-500 hover:text-gray-700"
          aria-label="Add Sub Category"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center poppins-regular relative inline-block text-left w-full">
        <div className="w-full">
          <button
            name="sub kategori"
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs poppins-regular text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="options-menu"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {selectedSubCategoryName}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isOpen && (
          <div
            className="origin-top-right absolute left-0 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1 w-full" role="none">
              {subcategories.length > 0 ? (
                subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => handleSelect(subcategory)}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    {subcategory.sub_category_name}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 px-4 py-2">No sub categories available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSubCategory;
