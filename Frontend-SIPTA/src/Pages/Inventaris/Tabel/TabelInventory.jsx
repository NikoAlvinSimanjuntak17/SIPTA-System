import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarDashboard from "../../../Components/NavbarDashboard";
import SidebarDashboard from "../../../Components/SidebarDashboard";
import logoPelindo from "../../../assets/img/logo-pelindo.png";
import { saveAs } from "file-saver";
import { FiBell } from "react-icons/fi"; // Import ikon notifikasi
import { NavLink } from "react-router-dom";
import InventoryTable from "../../../Pages/Inventaris/Tabel/InventoryTable";
import AOS from "aos";
import "aos/dist/aos.css";

const TabelInventory = ({ inventoryData }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
    });
  }, []);
  const [search, setSearch] = useState("");
  const [totalBarangPinjaman, setTotalBarangPinjaman] = useState(0);

  const calculateRemainingBorrowTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (daysLeft > 3) {
      return null; // Atau bisa juga dikembalikan nilai lain, seperti kosong
    }

    return daysLeft > 0 ? `${daysLeft} Hari` : "Habis";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/input-barang");
        const data = await response.json();

        // Filter data untuk kategori 'Barang Pinjaman'
        const barangPinjaman = data.filter(
          (item) => item.kategori_input === "Barang Pinjaman"
        );

        // Filter lebih lanjut untuk hanya barang dengan sisa waktu 3 hari atau kurang
        const barangPinjamanMendekatiHabis = barangPinjaman.filter(
          (item) =>
            calculateRemainingBorrowTime(item.tanggal_akhir_pinjam) !== null
        );

        // Set jumlah barang pinjaman mendekati habis
        setTotalBarangPinjaman(barangPinjamanMendekatiHabis.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = async () => {
    try {
      const response = await axios.get("/inventory-export", {
        responseType: "blob", // Specify response type as blob for binary data
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Data Inventaris.xlsx");
    } catch (error) {
      console.error("Failed to export Excel:", error);
    }
  };

  return (
    <div className="w-screen flex flex-col bg-white" data-aos="fade-up">
      <div className="fixed top-0 right-0 z-10 w-[85%]">
        <NavbarDashboard />
      </div>
      <div className="flex overflow-y-hidden">
        <div className="absolute right-0 w-[85%]">
          <div className="h-screen">
            <div id="DashboardContent" className="flex flex-row">
              <div className="flex flex-row bg-gray-100 w-full h-screen pt-24">
                <div id="TableHeader" className="w-full px-4">
                  <div className="flex w-full justify-between items-center bg-white rounded-xl shadow-md p-4">
                    <img src={logoPelindo} alt="Logo Pelindo" className="h-6" />
                    <h1 className="text-xl poppins-semibold uppercase text-center lg:text-left tracking-widest">
                      Tabel Inventaris
                    </h1>
                    <div className="flex items-center space-x-2">
                      <NavLink to="/notification" className="relative mr-2">
                        <button className="bg-[#3498DB] text-white font-bold py-2 px-4 rounded-xl flex items-center hover:bg-[#1F78B4]">
                          <FiBell className="mr-2" /> {/* Ikon notifikasi */}
                          Notifikasi
                          <span className="absolute top-[-10px] right-[-10px] bg-[#C53929] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {totalBarangPinjaman}
                          </span>
                        </button>
                      </NavLink>

                      <button
                        onClick={handleExportExcel}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold w-full py-2 px-4 rounded-xl"
                      >
                        Export Excel
                      </button>
                    </div>
                  </div>
                  {/* <TblInventory /> */}
                  <InventoryTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed w-[15%] h-screen right-0 left-0">
        <SidebarDashboard />
      </div>
    </div>
  );
};

export default TabelInventory;
