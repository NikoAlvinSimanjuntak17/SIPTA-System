import React, { useEffect, useState } from "react";
import { VscListFlat } from "react-icons/vsc";

const BoxBarangRusak = () => {
  const [totalBarangRusak, setTotalBarangRusak] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/input-barang");
        const data = await response.json();

        // Filter data untuk kategori 'Barang Masuk'
        const barangRusak = data.filter(
          (item) => item.kategori_input === "Barang Rusak"
        );

        // Set jumlah barang masuk
        setTotalBarangRusak(barangRusak.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Barang Rusak</h2>
        <div className="bg-[#F0134D] p-2 rounded-2xl">
          <VscListFlat className="text-black" />
        </div>
      </div>
      <h1 className="text-gray-600 text-3xl mb-3">{totalBarangRusak}</h1>
      <p className="text-m font-semibold" style={{ color: "#F0134D" }}>
        Total Rusak
      </p>
    </div>
  );
};

export default BoxBarangRusak;
