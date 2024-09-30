import React, { useEffect, useState } from "react";
import { TbCheckbox } from "react-icons/tb";

const BoxBarangKeluar = () => {
  const [totalBarangKeluar, setTotalBarangKeluar] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/input-barang");
        const data = await response.json();

        // Filter data untuk kategori 'Barang Masuk'
        const barangKeluar = data.filter(
          (item) => item.kategori_input === "Barang Keluar"
        );

        // Set jumlah barang masuk
        setTotalBarangKeluar(barangKeluar.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Barang Keluar</h2>
        <div className="bg-[#6499E9] p-2 rounded-2xl">
          <TbCheckbox className="text-black" />
        </div>
      </div>
      <h1 className="text-gray-600 text-3xl mb-3">{totalBarangKeluar}</h1>
      <p className="text-m font-semibold" style={{ color: "#6499E9" }}>
        Total Keluar
      </p>
    </div>
  );
};

export default BoxBarangKeluar;
