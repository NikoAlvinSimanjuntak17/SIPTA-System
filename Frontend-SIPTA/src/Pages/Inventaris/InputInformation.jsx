import React, { useState } from "react";

const InputInformation = ({ value, onChange }) => {
  const [information, setInformation] = useState("");

  return (
    <div className="w-full h-[216px] p-3 bg-white shadow-md rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-sm poppins-semibold">Keterangan Barang</h2>
      </div>
      <div id="InputForm">
        <textarea
          id="information"
          name="keterangan"
          placeholder="Masukkan Keterangan Barang"
          className="poppins-regular text-xs w-full h-[152px] p-1 border rounded-lg text-[#919191]"
          style={{ color: "black" }}
          value={value}
          onChange={onChange}
          rows="4"
        />
      </div>
    </div>
  );
};

export default InputInformation;
