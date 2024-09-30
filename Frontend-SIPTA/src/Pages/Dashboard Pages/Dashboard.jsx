import React from "react";
import { useEffect } from "react";
import NavbarDashboard from "../../Components/NavbarDashboard";
import SidebarDashboard from "../../Components/SidebarDashboard";
import BoxBarangKeluar from "../../Pages/Out/BoxBarangKeluar";
import BoxBarangMasuk from "../../Components/Dashboard/BoxBarangMasuk";
import BoxBarangPinjaman from "../../Pages/Loan/BoxBarangPinjaman";
import BoxBarangRusak from "../../Pages/Damage/BoxBarangRusak";
import BoxTotalBarang from "../../Components/Dashboard/BoxTotalBarang";
import BoxChart from "../../Components/Dashboard/BoxChart";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
    });
  }, []);
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
                <div className="flex w-full h-full space-x-6 px-4">
                  <div id="LeftBoxParent" className="w-[50%]">
                    <div id="FirstData">
                      <div className="flex w-full space-x-6">
                        <div className="w-[50%]">
                          <BoxBarangMasuk />
                        </div>
                        <div className="w-[50%]">
                          <BoxBarangKeluar />
                        </div>
                      </div>
                    </div>
                    <div id="SecondData" className="mt-3">
                      <div className="flex w-full space-x-6">
                        <div className="w-[50%]">
                          <BoxBarangPinjaman />
                        </div>
                        <div className="w-[50%]">
                          <BoxBarangRusak />
                        </div>
                      </div>
                    </div>
                    <div id="ThirdData" className="mt-3">
                      <div className="w-[100%]">
                        <BoxTotalBarang />
                      </div>
                    </div>
                  </div>
                  <div id="RightBoxParent" className="w-[50%] h-[35%]">
                    <div
                      id="ChartSection"
                      className="w-full h-full flex flex-col"
                    >
                      <div className="w-[100%] h-[100%]">
                        <div className="w-full h-[573px]">
                          <BoxChart />
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Dashboard;
