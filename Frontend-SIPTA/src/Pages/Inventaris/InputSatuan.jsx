import React from 'react';

const InputSatuan = ({ unit, onChange }) => {
  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
        Satuan
      </label>
      <input
        type="text"
        id="unit"
        name="unit"
        value={unit}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Masukkan Satuan"
      />
    </div>
  );
};

export default InputSatuan;
