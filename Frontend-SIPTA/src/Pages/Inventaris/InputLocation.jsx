import React from 'react';

const InputLocation = ({ location, onChange }) => {
  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Lokasi
      </label>
      <select
        id="location"
        name="location"
        value={location}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Pilih Lokasi</option>
        <option value="Belawan">Belawan</option>
        <option value="Dumai">Dumai</option>
        <option value="Sibolga">Sibolga</option>
        <option value="Tanjung Pinang">Tanjung Pinang</option>
      </select>
    </div>
  );
};

export default InputLocation;
