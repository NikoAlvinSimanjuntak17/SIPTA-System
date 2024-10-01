import React, { useState, useRef, useEffect } from 'react';

const InputQuality = ({ quality, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState(
    quality ? quality : 'Pilih Kualitas'
  );

  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectedQuality(value);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name: 'quality', value } });
    }
  };

  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3" ref={dropdownRef}>
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Kualitas Barang</h2>
      </div>
      <div className="flex justify-center poppins-regular relative inline-block text-left w-full">
        <div className="w-full">
          <button
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs poppins-regular text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={toggleDropdown}
          >
            {selectedQuality}
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
          >
            <div className="py-1 w-full">
              <button
                onClick={() => handleSelect('Baru')}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Baru
              </button>
              <button
                onClick={() => handleSelect('Bagus')}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Bagus
              </button>
              <button
                onClick={() => handleSelect('Rusak')}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Rusak
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputQuality;
