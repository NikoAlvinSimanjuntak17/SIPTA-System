import React from 'react';

const InputItemImage = ({ item_image, onChange }) => {
  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Gambar Barang</h2>
      </div>
      <div className="flex justify-center poppins-regular relative inline-block text-left w-full">
        <input
          type="file"
          name="item_image"
          accept="image/*"
          onChange={onChange}
          className=" block w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default InputItemImage;
