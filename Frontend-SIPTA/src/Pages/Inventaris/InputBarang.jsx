import React, { useState, useEffect } from "react";
import NavbarDashboard from "../../Components/NavbarDashboard";
import SidebarDashboard from "../../Components/SidebarDashboard";
import InputType from "../../Pages/Inventaris/InputType";
import InputSerialNumber from "../../Pages/Inventaris/InputSerialNumber";
import InputQuantity from "../../Pages/Inventaris/InputQuantity";
import InputUnits from "../../Pages/Inventaris/InputUnits";
import InputQuality from "../../Pages/Inventaris/InputQuality";
import InputDate from "../../Pages/Inventaris/InputDate";
import InputPicture from "../../Pages/Inventaris/InputPicture";
import InputInformation from "../../Pages/Inventaris/InputInformation";
import InputWorkUnit from "../../Pages/Inventaris/InputWorkUnit";
import InputLocation from "../../Pages/Inventaris/InputLocation";
import InputName from "../../Pages/Inventaris/InputName";
import { ToastContainer, toast } from "react-toastify";
import InputCategory from "../../Components/Dashboard/InputProcurement";
import InputStartDate from "../../Components/Dashboard/InputStartDate";
import InputEndDate from "../../Components/Dashboard/InputEndDate";
import InputTujuanKeluar from "../../Components/Dashboard/InputTujuanKeluar";
import InputBuktiKeluar from "../../Components/Dashboard/InputBuktiKeluar";
import InputDivisiPeminjam from "../../Components/Dashboard/InputDivisiPeminjam";
import InputNamaPeminjam from "../../Components/Dashboard/InputNamaPeminjam";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const InputBarang = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam milidetik
    });
  }, []);
  const [data, setData] = useState({
    nama_barang: "",
    tipe_barang: "",
    kualitas: "Masukkan Kondisi Barang",
    tanggal: null,
    sn: "",
    jumlah: "",
    satuan: "",
    tujuan_keluar: "",
    picture: null,
    bukti: null,
    keterangan: "",
    work_unit: "",
    lokasi: "",
    tanggal_awal_pinjam: "",
    tanggal_akhir_pinjam: "",
    divisi_peminjam: "",
    nama_peminjam: "",
  });

  //Untuk Form Nama, Jumlah, Serial Number, Tipe, Satuan, dan Lokasi
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

  //Untuk Dropdown Input Category
  const [selectedCategory, setSelectedCategory] = useState();
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setData({
      ...data,
      kategori_input: category,
    });
  };

  //Untuk Date Picker
  const handleDateChange = (date) => {
    setData((prevData) => ({
      ...prevData,
      tanggal: date,
    }));
  };

  //Untuk Date Picker
  const handleStartDateChange = (date) => {
    setData((prevData) => ({
      ...prevData,
      tanggal_awal_pinjam: date,
    }));
  };

  //Untuk Date Picker
  const handleEndDateChange = (date) => {
    setData((prevData) => ({
      ...prevData,
      tanggal_akhir_pinjam: date,
    }));
  };

  const [fileName, setFileName] = useState("Masukkan Gambar");
  //Untuk Upload Foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setData((prevData) => ({
      ...prevData,
      picture: file,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData((prevData) => ({
      ...prevData,
      bukti: file,
    }));
  };

  //Untuk Form Keterangan
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
      formData.append("kategori_input", data.kategori_input);
      formData.append("nama_barang", data.nama_barang);
      formData.append("nama_peminjam", data.nama_peminjam);
      formData.append("divisi_peminjam", data.divisi_peminjam);
      formData.append("tipe_barang", data.tipe_barang);
      formData.append("kualitas", data.kualitas);
      formData.append("tanggal", convertToISOFormat(data.tanggal));
      formData.append(
        "tanggal_awal_pinjam",
        convertToISOFormat(data.tanggal_awal_pinjam)
      );
      formData.append(
        "tanggal_akhir_pinjam",
        convertToISOFormat(data.tanggal_akhir_pinjam)
      );
      formData.append("sn", data.sn);
      formData.append("jumlah", data.jumlah);
      formData.append("satuan", data.satuan);
      formData.append("keterangan", data.keterangan);
      formData.append("lokasi", data.lokasi);
      formData.append("work_unit", data.work_unit);

      if (data.picture) {
        formData.append("picture", data.picture);
      }
      if (data.bukti) {
        formData.append("bukti", data.bukti);
      }

      const response = await fetch("http://localhost:8000/api/input-barang", {
        method: "POST",
        body: formData, // Jangan set header Content-Type
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved:", result);
        toast.success("Data berhasil disimpan!");
        //Reset Data after Success
        setData({
          kategori_input: "Choose Input Category",
          nama_barang: "",
          tipe_barang: "",
          kualitas: "Choose Item Condition",
          tanggal: null,
          tanggal_awal_pinjam: null,
          tanggal_akhir_pinjam: null,
          nama_peminjam: "",
          divisi_peminjam: "",
          tujuan_keluar: "",
          sn: "",
          jumlah: "",
          satuan: "",
          picture: null,
          bukti: null,
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
    <div className="w-screen flex flex-col bg-white" data-aos="fade-up">
      <ToastContainer />
      <div className="fixed top-0 right-0 z-10 w-[85%]">
        <NavbarDashboard />
      </div>
      <div className="flex overflow-y-hidden">
        <div className="absolute right-0 w-[85%]">
          <div className="h-screen">
            <div id="DashboardContent" className="flex flex-row">
              <div className="flex flex-col bg-gray-100 w-full h-screen pt-24 px-4">
                <p className="font-sm text-gray-600 ml-2 mb-2">
                  Masukkan kategori barang dan tanggal terlebih dahulu
                </p>
                <div
                  id="LeftBoxParent"
                  className="flex flex-row w-[100%] space-x-6"
                >
                  <div className="w-[60%]">
                    <InputCategory
                      value={data.kategori_input}
                      selectedCategory={selectedCategory}
                      onCategoryChange={handleCategoryChange}
                    />
                  </div>
                  <div className="w-[40%]">
                    <InputDate
                      selectedDate={data.tanggal}
                      onDateChange={handleDateChange}
                    />
                  </div>
                </div>
                {selectedCategory === "Barang Masuk" && data.tanggal && (
                  <>
                    <div
                      className="flex flex-row w-full h-full space-x-6 pt-4"
                      data-aos="fade-up"
                    >
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
                              <InputWorkUnit
                                value={data.work_unit}
                                onChange={handleWorkUnitChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="FourthData">
                          <div className="flex w-full space-x-6 h-[12%]">
                            <div className="w-[50%]">
                              <InputUnits
                                value={data.satuan}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="w-[50%]">
                              <InputLocation
                                value={data.lokasi}
                                onChange={handleChange}
                              />
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
                            <InputPicture
                              onChange={handlePhotoChange}
                              fileName={fileName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {selectedCategory === "Barang Keluar" && data.tanggal && (
                  <>
                    <div
                      className="flex flex-row w-full h-full space-x-6 pt-4"
                      data-aos="fade-up"
                    >
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
                              <InputWorkUnit
                                value={data.work_unit}
                                onChange={handleWorkUnitChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="FourthData">
                          <div className="flex w-full space-x-6 h-[12%]">
                            <div className="w-[50%]">
                              <InputUnits
                                value={data.satuan}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="w-[50%]">
                              <InputLocation
                                value={data.lokasi}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="FifthData">
                          <div className="flex w-full space-x-6 h-[12%]">
                            <div className="w-[50%]">
                              <InputTujuanKeluar
                                value={data.tujuan_keluar}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="w-[50%]">
                              <InputBuktiKeluar onChange={handleFileChange} />
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
                            <InputPicture
                              onChange={handlePhotoChange}
                              fileName={fileName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {selectedCategory === "Barang Pinjaman" && data.tanggal && (
                  <>
                    <div
                      className="flex flex-row w-full h-full space-x-6 pt-4"
                      data-aos="fade-up"
                    >
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
                              <InputStartDate
                                selectedDate={data.tanggal_awal_pinjam}
                                onDateChange={handleStartDateChange}
                              />
                            </div>
                            <div className="w-[50%]">
                              <InputEndDate
                                selectedDate={data.tanggal_akhir_pinjam}
                                onDateChange={handleEndDateChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="FifthData">
                          <div className="flex w-full space-x-6 h-[12%]">
                            <div className="w-[50%]">
                              <InputDivisiPeminjam
                                value={data.divisi_peminjam}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="w-[50%]">
                              <InputNamaPeminjam
                                value={data.nama_peminjam}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="SixthData">
                          <div className="flex w-full space-x-6 h-[12%]">
                            <div className="w-[50%]">
                              <InputPicture
                                onChange={handlePhotoChange}
                                fileName={fileName}
                              />
                            </div>
                            <div className="w-[50%]">
                              <InputBuktiKeluar onChange={handleFileChange} />
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
                  </>
                )}
                {selectedCategory === "Barang Rusak" && data.tanggal && (
                  <>
                    <div
                      className="flex flex-row w-full h-full space-x-6 pt-4"
                      data-aos="fade-up"
                    >
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
                              <InputWorkUnit
                                value={data.work_unit}
                                onChange={handleWorkUnitChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div id="FourthData">
                          <div className="flex w-full space-x-6 h-[12%]">
                            <div className="w-[50%]">
                              <InputUnits
                                value={data.satuan}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="w-[50%]">
                              <InputLocation
                                value={data.lokasi}
                                onChange={handleChange}
                              />
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
                            <InputPicture
                              onChange={handlePhotoChange}
                              fileName={fileName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {selectedCategory && data.tanggal && (
                  <div className="flex justify-end w-full py-4">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md w-[25%] poppins-regular text-xs"
                    >
                      Tambah Data
                    </button>
                  </div>
                )}
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

export default InputBarang;
