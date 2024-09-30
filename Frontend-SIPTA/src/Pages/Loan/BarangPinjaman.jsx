import React, { useState } from "react";
import NavbarDashboard from "../../Components/NavbarDashboard";
import SidebarDashboard from "../../Components/SidebarDashboard";
import InputType from "../../Components/Dashboard/InputType";
import InputSerialNumber from "../../Components/Dashboard/InputSerialNumber";
import InputQuantity from "../../Components/Dashboard/InputQuantity";
import InputUnits from "../../Components/Dashboard/InputUnits";
import InputQuality from "../../Components/Dashboard/InputQuality";
import InputDate from "../../Components/Dashboard/InputDate";
import InputPicture from "../../Components/Dashboard/InputPicture";
import InputInformation from "../../Components/Dashboard/InputInformation";
import InputWorkUnit from "../../Components/Dashboard/InputWorkUnit";
import InputLocation from "../../Components/Dashboard/InputLocation";
import InputName from "../../Components/Dashboard/InputName";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BarangPinjaman = () => {
  const [data, setData] = useState({
    nama_barang: "",
    tipe_barang: "",
    kualitas: "Choose Item Condition",
    tanggal: null,
    sn: "",
    jumlah: "",
    satuan: "",
    picture: null,
    keterangan: "",
    work_unit: "",
    lokasi: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  //Untuk Dropdown Input Condition
  const handleQualityChange = (quality) => {
    setData({
      ...data,
      kualitas: quality,
    });
  };

  //Untuk Dropdown Input Work Unit
  const handleWorkUnitChange = (work_unit) => {
    setData({
      ...data,
      work_unit: work_unit,
    });
  };

  //Untuk Date Picker
  const handleDateChange = (date) => {
    setData((prevData) => ({
      ...prevData,
      tanggal: date,
    }));
  };

  const handleFileChange = (file) => {
    setData((prevData) => ({
      ...prevData,
      picture: file,
    }));
  };

  const handleInformationChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Memperbarui state sesuai dengan nama input
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nama_barang", data.nama_barang);
      formData.append("tipe_barang", data.tipe_barang);
      formData.append("kualitas", data.kualitas);
      formData.append("tanggal", convertToISOFormat(data.tanggal)); // Format ke YYYY-MM-DD
      formData.append("sn", data.sn);
      formData.append("jumlah", data.jumlah);
      formData.append("satuan", data.satuan);
      formData.append("keterangan", data.keterangan);
      formData.append("lokasi", data.lokasi);
      formData.append("work_unit", data.work_unit);

      if (data.picture) {
        formData.append("picture", data.picture);
      }

      const response = await fetch(
        "http://localhost:8000/api/barang-pinjaman",
        {
          method: "POST",
          body: formData, // Jangan set header Content-Type
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved:", result);
        toast.success("Data berhasil disimpan!");
        //Reset Data after Success
        setData({
          nama_barang: "",
          tipe_barang: "",
          kualitas: "Choose Item Condition",
          tanggal: null,
          sn: "",
          jumlah: "",
          satuan: "",
          picture: null,
          keterangan: "",
          work_unit: "",
          lokasi: "",
        });
      } else {
        console.error("Error saving data:", await response.text());
        toast.error("Terjadi kesalahan saat menyimpan data!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan pada server!");
    }
  };

  // Fungsi untuk mengkonversi tanggal ke format YYYY-MM-DD
  const convertToISOFormat = (date) => {
    if (date) {
      const d = new Date(date);
      return d.toISOString().split("T")[0]; // YYYY-MM-DD
    }
    return "";
  };

  return (
    <div className="w-screen flex flex-col bg-white">
      <ToastContainer />
      <div className="fixed top-0 right-0 z-10 w-[85%]">
        <NavbarDashboard />
      </div>
      <div className="flex overflow-y-hidden">
        <div className="absolute right-0 w-[85%]">
          <div className="h-screen">
            <div id="DashboardContent" className="flex flex-row">
              <div className="flex flex-col bg-gray-100 w-full h-screen pt-24">
                <div className="flex flex-row w-full h-full space-x-6 px-4">
                  <div id="LeftBoxParent" className="w-[60%] space-y-6">
                    <div id="FirstData">
                      <div className="flex w-full space-x-6 h-[12%]">
                        <div className="w-[50%]">
                          <InputName
                            value={data.nama_barang}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="w-[50%]">
                          <InputSerialNumber
                            value={data.sn}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div id="SecondData">
                      <div className="flex w-full space-x-6 h-[12%]">
                        <div className="w-[50%]">
                          <InputType
                            value={data.tipe_barang}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="w-[50%]">
                          <InputQuantity
                            value={data.jumlah}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div id="ThirdData">
                      <div className="flex w-full space-x-6 h-[12%]">
                        <div className="w-[50%]">
                          <InputQuality
                            value={data.kualitas}
                            onChange={handleQualityChange}
                          />
                        </div>
                        <div className="w-[50%]">
                          <InputUnits
                            value={data.satuan}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div id="FourthData">
                      <div className="flex w-full space-x-6 h-[12%]">
                        <div className="w-[50%]">
                          <InputDate
                            selectedDate={data.tanggal}
                            onDateChange={handleDateChange}
                          />
                        </div>
                        <div className="w-[50%]">
                          <InputPicture onChange={handleFileChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="RightBoxParent" className="w-[40%] space-y-6">
                    <div id="FristData" className="w-full flex flex-col">
                      <div className="w-[100%] h-[12%]">
                        <InputInformation
                          value={data.keterangan}
                          onChange={handleInformationChange}
                        />
                      </div>
                    </div>
                    <div id="SecondData" className="w-full flex flex-col">
                      <div className="w-[100%] h-[12%]">
                        <InputWorkUnit
                          value={data.work_unit}
                          onChange={handleWorkUnitChange}
                        />
                      </div>
                    </div>
                    <div id="ThirdData" className="w-full flex flex-col">
                      <div className="w-[100%] h-[12%]">
                        <InputLocation
                          value={data.lokasi}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-16 flex justify-end px-4 w-full">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md w-[25%] poppins-regular text-xs"
                  >
                    Submit Data
                  </button>
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

export default BarangPinjaman;
