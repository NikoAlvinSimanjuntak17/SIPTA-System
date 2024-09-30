import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const NavbarDashboard = () => {
  const [userImg, setUserImg] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile image URL from localStorage
    const imgUrl = localStorage.getItem("userImg") || ""; // Placeholder
    setUserImg(imgUrl);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userImg");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/tabel-inventory":
        return "Tabel Inventaris";
      case "/input-barang":
        return "Input Inventaris";
      case "/notification":
        return "Tabel Sisa Masa Barang Pinjaman";
      case "/tabel-pengadaan":
        return "Tabel Pengadaan";
      default:
        return "Dashboard";
    }
  };

  return (
    <div id="NavbarParent" className="w-full h-full bg-white p-3">
      <div
        id="InsideParent"
        className="flex w-full h-full justify-between items-center"
      >
        <div
          id="TitleSection"
          className="flex items-center w-full sm:w-[45%] h-full pl-3"
        >
          <span className="uppercase poppins-semibold text-lg sm:text-xl tracking-widest">
            {getTitle()}
          </span>
        </div>
        <div id="IconSection" className="flex items-center ml-auto mx-2 h-full">
          <div className="relative ml-4">
            <img
              src={userImg || "/path/to/default/profile.png"}
              width="35"
              height="35"
              className="rounded-full cursor-pointer"
              onClick={toggleMenu}
              alt="Profile"
            />
            {menuVisible && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</button>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
          <button
            className="bg-[#F0134D] w-[100px] px-2 py-2 rounded-3 text-white flex items-center justify-center space-x-2"
            onClick={handleLogout}
          >
            <div>
              <span className="poppins-regular text-sm">Logout</span>
            </div>
            <IoIosLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
