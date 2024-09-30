import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import NavbarDashboard from "../../Components/NavbarDashboard";
import SidebarDashboard from "../../Components/SidebarDashboard";
import logoPelindo from "../../assets/img/logo-pelindo.png";
import TblNotification from "../../Components/Dashboard/TblNotification";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Notification = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
    });
  }, []);
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleGoBack = () => {
    navigate("/tabel-inventory"); // Navigasi ke halaman /tabel-inventory
  };

  return (
    <div className="w-screen flex flex-col bg-white" data-aos="fade-up">
      <div className="fixed top-0 right-0 z-10 w-[85%]">
        <NavbarDashboard />
      </div>
      <div className="flex overflow-y-hidden">
        <div className="absolute right-0 w-[85%]">
          <div className="h-screen">
            <div id="NotificationContent" className="flex flex-row">
              <div className="flex flex-row bg-gray-100 w-full h-screen pt-24">
                <div id="TableHeader" className="w-full px-4">
                  <div className="flex w-full justify-between items-center bg-white rounded-xl shadow-md p-4">
                    <img src={logoPelindo} alt="Logo Pelindo" className="h-6" />
                    <h1 className="text-xl poppins-semibold uppercase text-center lg:text-left tracking-widest">
                      Tabel Notifikasi Pemminjaman
                    </h1>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleGoBack}
                        className="bg-[#F0134D] poppins-regular text-sm text-white px-4 py-2 rounded-lg ml-4"
                      >
                        Kembali
                      </button>
                    </div>
                  </div>
                  <TblNotification />
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

export default Notification;
