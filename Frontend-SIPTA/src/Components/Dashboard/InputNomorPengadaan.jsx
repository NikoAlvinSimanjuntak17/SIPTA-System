import React from "react";

const InputNomorPengadaan = ({ value, onChange }) => {
  return (
    <div className="w-full h-auto p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Nomor Pengadaan</h2>
      </div>
      <div id="InputForm">
        <input
          name="no_pengadaan"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Masukkan No. PR/ No. PO/ No. SPK/ No. Kontrak"
          className="poppins-regular text-xs w-full h-8 p-1 border rounded-lg text-[#919191]"
          style={{ color: "black" }}
          required
        />
      </div>
    </div>
  );
};

export default InputNomorPengadaan;
