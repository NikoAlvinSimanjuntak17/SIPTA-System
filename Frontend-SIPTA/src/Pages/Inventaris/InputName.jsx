import React from "react";

const InputName = ({ value, onChange }) => {
  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Nama Item</h2>
      </div>
      <div className="flex justify-center poppins-regular relative inline-block text-left w-full">
        <input
          type="text"
          name="item_name"
          value={value}
          onChange={onChange}
          placeholder="Masukkan Nama Item"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default InputName;
