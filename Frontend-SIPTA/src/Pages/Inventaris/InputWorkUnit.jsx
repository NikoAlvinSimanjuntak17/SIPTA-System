import React from 'react';

const InputWorkUnit = ({ work_unit, onChange }) => {
  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <label htmlFor="work_unit" className="block text-sm font-medium text-gray-700">
        Unit Kerja
      </label>
      <input
        type="text"
        name="work_unit"
        value={work_unit}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Masukkan Unit Kerja"
      />
    </div>
  );
};

export default InputWorkUnit;
