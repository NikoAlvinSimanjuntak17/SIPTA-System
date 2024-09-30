import React from "react";
import { useEffect } from "react";
import NavigationBar from "../Components/Navbar";
import backgroundImage from "../assets/img/peti_kemas.jpg";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
    });
  }, []);

  return (
    <div
      className="relative h-[100vh] w-[100vw] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      data-aos="fade-up"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10" data-aos="fade-up">
        <NavigationBar />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="text-center">
          <h1 className="poppins-semibold text-white text-4xl md:text-6xl uppercase font-bold mb-2">
            Manage Goods <span className="text-[#EBB64D]">Perfectly.</span>
          </h1>
          <h2 className="poppins-semibold text-white text-2xl md:text-3xl uppercase font-bold mb-2">
            Inventory Dashboard
          </h2>
          <h2 className="poppins-semibold text-white text-2xl md:text-3xl uppercase font-bold mb-4">
            Teknologi Informasi
          </h2>
          <p className="poppins-regular text-white text-center text-sm md:text-base mb-6 px-4">
            Inventory dashboard PT Pelindo Multi Terminal digunakan untuk
            pengelolaan persediaan dengan terstruktur secara efektif
            <br />
            pada ruang lingkup SPMT dengan dikelola langsung oleh Divisi
            Teknologi.
          </p>
          <NavLink to="/login">
            <button className="poppins-semibold bg-[#EBB64D] text-black px-6 py-3 rounded-lg">
              Masuk ke Inventory Dashboard
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
