import React, { useState, useEffect } from "react";

const InputSubAnggaran = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubAnggaran, setSelectedSubAnggaran] = useState(
    value || "Pilih Sub Anggaran"
  );

  useEffect(() => {
    setSelectedSubAnggaran(value || "Pilih Sub Anggaran");
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (sub_anggaran) => {
    setSelectedSubAnggaran(sub_anggaran);
    setIsOpen(false);
    if (onChange) {
      onChange(sub_anggaran);
    }
  };

  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Sub Anggaran</h2>
      </div>
      <div className="flex justify-center poppins-regular relative inline-block text-left w-full">
        <div className="w-full">
          <button
            name="tipe_barang"
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs poppins-regular text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            {selectedSubAnggaran}
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
              <button
                onClick={() => handleSelect("Beban Pemeliharaan")}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                Beban Pemeliharaan
              </button>
              <button
                onClick={() => handleSelect("Beban Jaringan")}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                role="menuitem"
              >
                Beban Jaringan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSubAnggaran;
