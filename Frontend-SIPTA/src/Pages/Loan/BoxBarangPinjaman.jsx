import React, { useEffect, useState } from "react";
import { CiGrid41 } from "react-icons/ci";

const BoxBarangPinjaman = () => {
  const [totalBarangPinjaman, setTotalBarangPinjaman] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/input-barang");
        const data = await response.json();

        // Filter data untuk kategori 'Barang Masuk'
        const barangPinjaman = data.filter(
          (item) => item.kategori_input === "Barang Pinjaman"
        );

        // Set jumlah barang masuk
        setTotalBarangPinjaman(barangPinjaman.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Barang Pinjaman</h2>
        <div className="bg-[#FFCD56] p-2 rounded-2xl">
          <CiGrid41 className="text-black" />
        </div>
      </div>
      <h1 className="text-gray-600 text-3xl mb-3">{totalBarangPinjaman}</h1>
      <p className="text-m font-semibold" style={{ color: "#FFCD56" }}>
        Total Pinjaman
      </p>
    </div>
  );
};

export default BoxBarangPinjaman;
