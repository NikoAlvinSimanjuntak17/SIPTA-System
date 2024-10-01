import React, { useState } from 'react';

const InputSerialNumber = ({ serial_number, onChange }) => {
  const [inputValue, setInputValue] = useState(serial_number || '');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Nomor Seri</h2>
      </div>
      <div className="flex justify-center poppins-regular relative inline-block text-left w-full">
        <input
          type="text"
          name="serial_number"
          value={inputValue}
          onChange={handleInputChange}
          className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs poppins-regular text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          placeholder="Masukkan Nomor Seri"
        />
      </div>
    </div>
  );
};

export default InputSerialNumber;
