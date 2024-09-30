import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import logoPelindo from "../assets/img/logo-pelindo.png";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsTruck } from "react-icons/bs";
import { VscListFlat } from "react-icons/vsc";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";

const SidebarDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // Update activeTab based on the current route
    const path = location.pathname;
    if (path.includes("dashboard")) setActiveTab("dashboard");
    else if (path.includes("tabel-barang-masuk")) setActiveTab("barangMasuk");
    else if (path.includes("tabel-barang-keluar")) setActiveTab("barangKeluar");
    else if (path.includes("tabel-barang-pinjaman"))
      setActiveTab("barangPinjaman");
    else if (path.includes("tabel-barang-rusak")) setActiveTab("barangRusak");
    else if (path.includes("input-barang-masuk"))
      setActiveTab("barangMasukInv");
    else if (path.includes("input-barang-keluar"))
      setActiveTab("barangKeluarInv");
    else if (path.includes("input-barang-pinjaman"))
      setActiveTab("barangPinjamanInv");
    else if (path.includes("input-barang-rusak"))
      setActiveTab("barangRusakInv");
    else if (path.includes("tabel-inventory")) setActiveTab("inputInventory");
    else if (path.includes("tabel-pengadaan")) setActiveTab("pengadaan");
    else if (path.includes("input-barang")) setActiveTab("inputBarangInv");
    else if (path.includes("social-media")) setActiveTab("socialMedia");
    else if (path.includes("logout")) setActiveTab("logout");
  }, [location]);

  return (
    <div
      id="SidebarParent"
      className="w-full h-screen bg-[#222E3C] border border-black"
    >
      <div id="InsideParent" className="flex flex-col w-full h-full">
        <div className="flex flex-col items-center mb-6 pt-3 px-3">
          <img
            src={logoPelindo}
            alt="Pelindo Logo"
            className="h-8 w-auto mb-2 mt-2"
          />
        </div>
        {/* Reports Section */}
        <div className="text-left text-white mb-3 px-4">
          <span
            className="text-xs poppins-regular pb-1 w-full inline-block"
            style={{ borderBottom: "0.5px solid #BEBEBE" }}
          >
            Menu
          </span>
        </div>
        {[
          "/dashboard",
          "/tabel-pengadaan",
          "/tabel-inventory",
          "/input-inventaris",
        ].map((path) => (
          <NavLink
            key={path}
            to={path}
            className="px-4 poppins-regular text-xs h-9 pt-0 pl-2 flex items-center"
            style={{
              color: isActive(path) ? "white" : "#919191",
              position: "relative",
              textDecoration: "none",
              zIndex: 1,
              backgroundColor: isActive(path) ? "#25364D" : "transparent",
              borderRadius: "5px",
              transition: "background-color 0.3s", // Transition for smooth hover effect
            }}
            onMouseEnter={(e) => {
              if (!isActive(path)) {
                e.currentTarget.style.backgroundColor = "#25364D";
                e.currentTarget.style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(path)) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#919191";
              }
            }}
          >
            {path === "/dashboard" && <GiSettingsKnobs className="mr-2" />}
            {path === "/tabel-inventory" && <BsTruck className="mr-2" />}
            {path === "/tabel-pengadaan" && <BsTruck className="mr-2" />}
            {path === "/input-inventaris" && <VscListFlat className="mr-2" />}
            {/* Menambahkan ikon */}
            {path === "/dashboard"
              ? "Dashboard"
              : path === "/tabel-inventory"
              ? "Tabel Inventaris"
              : path === "/tabel-pengadaan"
              ? "Tabel Pengadaan"
              : "Input Inventaris"}
            {isActive(path) && (
              <span
                className="flex absolute h-9 w-full top-0"
                style={{
                  borderLeft: "3px solid #3B7DDD",
                  transition: "0.5s",
                  pointerEvents: "none",
                  zIndex: -1,
                  left: 0,
                }}
              />
            )}
          </NavLink>
        ))}

        <div className="text-left text-white mt-4 mb-3 px-4">
          <span
            className="text-xs poppins-regular pb-1 w-full inline-block"
            style={{ borderBottom: "0.5px solid #BEBEBE" }}
          >
            Sosial Media
          </span>
        </div>
        <a
          href="https://www.instagram.com/pelindomultiterminal?igsh=MXhmN2VsOHRpMWJuNQ=="
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center text-left px-4 mt-3 cursor-pointer ${
            activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
          }`}
        >
          <FaInstagram
            className={`text-base mr-2 ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          />
          <span
            className={`text-xs poppins-regular ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          >
            Instagram
          </span>
        </a>
        <a
          href="https://twitter.com/indonesiaport"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center text-left px-4 mt-4 cursor-pointer ${
            activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
          }`}
        >
          <FaTwitter
            className={`text-base mr-2 ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          />
          <span
            className={`text-xs poppins-regular ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          >
            Twitter
          </span>
        </a>
        <a
          href="https://www.facebook.com/Indonesiaport"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center text-left px-4 mt-4 cursor-pointer ${
            activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
          }`}
        >
          <FaFacebook
            className={`text-base mr-2 ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          />
          <span
            className={`text-xs poppins-regular ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          >
            Facebook
          </span>
        </a>
        <a
          href="https://www.youtube.com/user/IndonesiaPortCorp"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center text-left px-4 mt-4 cursor-pointer ${
            activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
          }`}
        >
          <FaYoutube
            className={`text-base mr-2 ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          />
          <span
            className={`text-xs poppins-regular ${
              activeTab === "socialMedia" ? "text-white" : "text-[#919191]"
            }`}
          >
            Youtube
          </span>
        </a>
      </div>
    </div>
  );
};

export default SidebarDashboard;
