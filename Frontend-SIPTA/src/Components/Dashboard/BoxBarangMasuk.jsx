import React, { useEffect, useState } from "react";
import { FiSquare } from "react-icons/fi";

const BoxBarangMasuk = () => {
  const [totalBarangMasuk, setTotalBarangMasuk] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/input-barang");
        const data = await response.json();

        // Filter data untuk kategori 'Barang Masuk'
        const barangMasuk = data.filter(
          (item) => item.kategori_input === "Barang Masuk"
        );

        // Set jumlah barang masuk
        setTotalBarangMasuk(barangMasuk.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Barang Masuk</h2>
        <div className="bg-[#9EDE73] p-2 rounded-2xl">
          <FiSquare className="text-black" />
        </div>
      </div>
      <h1 className="text-gray-600 text-3xl mb-3">{totalBarangMasuk}</h1>
      <p className="text-m font-semibold" style={{ color: "#9EDE73" }}>
        Total Masuk
      </p>
    </div>
  );
};

export default BoxBarangMasuk;
