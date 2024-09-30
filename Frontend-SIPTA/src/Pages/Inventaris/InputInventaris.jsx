/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import NavbarDashboard from "../../Components/NavbarDashboard";
import SidebarDashboard from "../../Components/SidebarDashboard";
import InputCategory from "../../Components/Dashboard/InputCategory";
import InputSubCategory from "../../Components/Dashboard/InputSubCategory";
// import InputDate from "../../Components/Dashboard/InputDate";
import { ToastContainer, toast } from "react-toastify";
import InputPengadaan from "../../Components/Dashboard/InputPengadaan";
// import InputStartDate from "../../Components/Dashboard/InputStartDate";
// import InputEndDate from "../../Components/Dashboard/InputEndDate";
// import InputTujuanKeluar from "../../Components/Dashboard/InputTujuanKeluar";
// import InputBuktiKeluar from "../../Components/Dashboard/InputBuktiKeluar";
// import InputDivisiPeminjam from "../../Components/Dashboard/InputDivisiPeminjam";
// import InputNamaPeminjam from "../../Components/Dashboard/InputNamaPeminjam";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
// import InputNomorPengadaan from "../../Components/Dashboard/InputNomorPengadaan";
// import InputNamaPengadaan from "../../Components/Dashboard/InputNamaPengadaan";
// import InputNilaiBarang from "../../Components/Dashboard/InputNilaiBarang";
// import InputJenisAnggaran from "../../Components/Dashboard/InputJenisAnggaran";
// import InputTanggalPengadaan from "../../Components/Dashboard/InputTanggalPengadaan";
// import InputJumlahBarang from "../../Components/Dashboard/InputJumlahBarang";
// import InputSubAnggaran from "../../Components/Dashboard/InputSubAnggaran";
// import InputBuktiPengadaan from "../../Components/Dashboard/InputBuktiPengadaan";

const InputInventaris = () => {
  const [procurements, setProcurements] = useState([]);
  const [selectedProcurement, setSelectedProcurement] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

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
    picture: null,
    work_unit: "",
    lokasi: "",
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

  const handleProcurementChange = async (procurementId) => {
    setSelectedProcurement(procurementId); // Update to use procurement ID
    try {
      const response = await fetchCategoriesByProcurement(procurementId); // Update to use procurement ID
      setCategories(response.data); // Set categories based on selected procurement
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const response = await fetchSubCategoriesByCategory(categoryId); // Update to use procurement ID
      setSubCategories(response.data); // Set categories based on selected procurement
    } catch (error) {
      console.error("Error fetching sub categories", error);
    }
  };
  const handleSubCategoryChange = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
    setData({
      ...data,
      subcategory_id: subcategoryId,
    });
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

  const handleSavePengadaan = async () => {
    try {
      const formData = new FormData();
      formData.append("kategori_input", data.kategori_input);
      formData.append("no_pengadaan", data.no_pengadaan);
      formData.append("nama_pengadaan", data.nama_pengadaan);
      formData.append(
        "tanggal_pengadaan",
        convertToISOFormat(data.tanggal_pengadaan)
      );
      formData.append("nilai_barang", data.nilai_barang);
      formData.append("jumlah_barang", data.jumlah_barang);
      formData.append("jenis_anggaran", data.jenis_anggaran);
      formData.append("sub_anggaran", data.sub_anggaran);

      if (data.bukti_pengadaan) {
        formData.append("bukti_pengadaan", data.bukti_pengadaan);
      }

      const response = await fetch(
        "http://localhost:8000/api/input-pengadaan",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Data saved:", result);
        toast.success("Data pengadaan berhasil disimpan!");
        //Reset Data after Success
        setData({
          pengadaan_input_input: "Choose Input Pengadaan",
          no_pengadaan: "",
          nama_pengadaan: "",
          tanggal_pengadaan: "",
          bukti_pengadaan: "",
          nilai_barang: "",
          jumlah_barang: "",
          jenis_anggaran: "Masukkan Jenis Anggaran",
          sub_anggaran: "Masukkan Sub Anggaran",
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
          kategori_input: "Choose Input Pengadaan",
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
              <div className="flex flex-col bg-gray-100 w-full h-screen pt-20 px-4">
                <p className="font-sm text-gray-600 mt-2 mb-3">
                  Masukkan Jenis Pengadaan Terlebih Dahulu
                </p>
                <div
                  id="LeftBoxParent"
                  className="flex flex-row w-[100%] space-x-6"
                >
                  <div className="w-[33%]">
                  <InputPengadaan onProcurementChange={handleProcurementChange} />
                  </div>
                  <div className="w-[33%]">
                  <InputCategory procurementId={selectedProcurement} onCategoryChange={handleCategoryChange} />
                  </div>
                  <div className="w-[33%]">
                  <InputSubCategory categoryId={selectedCategory} onSubCategoryChange={handleSubCategoryChange} />
                  </div>
                </div>
                {selectedProcurement === "Barang Masuk" && data.tanggal && (
                  <>
                    <div
                      className="flex flex-row w-full h-full space-x-6 pt-4"
                      data-aos="fade-up"
                    >
                      <div id="LeftBoxParent" className="w-[60%] space-y-6">
                      </div>
                    </div>
                  </>
                )}
                {selectedProcurement && data.tanggal && (
                  <div className="flex justify-end w-full py-4">
                    <button
                      onClick={
                        selectedProcurement === "barang masuk"
                          ? handleSave
                          : handleSavePengadaan
                      }
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

export default InputInventaris;
