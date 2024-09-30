import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowUp,
  FaArrowDown,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import axios from "axios"; // Import axios for HTTP requests
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { CiSearch } from "react-icons/ci";
import SeeDetail from "../../Inventaris/Tabel/ViewInventoryItem";
import EditInventoryItem from "../../../Pages/Inventaris/Tabel/EditInventoryItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function InventoryTable() {
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [entries, setEntries] = useState(5);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editData, setEditData] = useState({ picture: "" });
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * entries;
  const indexOfFirstRecord = indexOfLastRecord - entries;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / entries);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false); // Set loading ke false setelah data selesai di-load
  //   }, 2000);
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/input-barang`
        );
        const recordsWithNumbers = response.data.map((record, index) => ({
          ...record,
          nomor: index + 1,
        }));
        setRecords(recordsWithNumbers);
        setAllRecords(recordsWithNumbers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [editData]);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/input-barang/${id}`);
        const updatedRecords = records.filter((record) => record.id !== id);
        const recordsWithNumbers = updatedRecords.map((record, index) => ({
          ...record,
          nomor: index + 1,
        }));
        setRecords(recordsWithNumbers);
        alert("Data berhasil dihapus");
      } catch (error) {
        console.error("Terjadi kesalahan saat menghapus data!", error);
        alert("Gagal menghapus data. Silakan coba lagi.");
      }
    }
  }

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nama_barang", editData.nama_barang || "");
      formData.append("nama_peminjam", editData.nama_peminjam || "");
      formData.append("divisi_peminjam", editData.divisi_peminjam || "");
      formData.append("tujuan_keluar", editData.tujuan_keluar || "");
      formData.append("status_barang", editData.status_barang || "");
      formData.append("solusi_barang", editData.solusi_barang || "");
      formData.append("sn", editData.sn || "");
      formData.append("tipe_barang", editData.tipe_barang || "");
      formData.append("jumlah", editData.jumlah || "");
      formData.append("kualitas", editData.kualitas || "");
      formData.append("satuan", editData.satuan || "");
      formData.append("keterangan", editData.keterangan || "");
      formData.append("work_unit", editData.work_unit || "");
      formData.append("lokasi", editData.lokasi || "");
      formData.append("kategori_input", editData.kategori_input || "");
      formData.append(
        "tanggal_awal_pinjam",
        editData.tanggal_awal_pinjam || ""
      );
      formData.append(
        "tanggal_akhir_pinjam",
        editData.tanggal_akhir_pinjam || ""
      );
      formData.append("_method", "PUT");

      if (editData.picture) {
        formData.append("picture", editData.picture);
      }
      if (editData.bukti) {
        formData.append("bukti", editData.bukti);
      }

      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      console.log("Data yang dikirim:", editData);
      console.log("FormData:", formData);

      const response = await axios.post(
        "http://localhost:8000/api/input-barang/" + editData.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Data berhasil diperbarui!");
        setTimeout(() => {
          window.location.reload(); // Reload halaman setelah update berhasil
        }, 1250);
        // Update records state dengan data yang diupdate
        const updatedRecords = records.map((record) =>
          record.id === editData.id ? { ...editData } : record
        );
        setRecords(updatedRecords);
        setAllRecords(updatedRecords);
        closeUpdateModal();
      } else {
        toast.error("Terjadi kesalahan saat memperbarui data!");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Terjadi kesalahan pada server!");
    }
  };

  //   const handleUpdate = async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData();

  //     formData.append("nama_barang", nama_barang);
  //     formData.append("kategori_input", kategori_input);
  //     formData.append("sn", sn);
  //     formData.append("tipe_barang", tipe_barang);
  //     formData.append("jumlah", jumlah);
  //     formData.append("kualitas", kualitas);
  //     formData.append("satuan", satuan);
  //     formData.append("keterangan", keterangan);
  //     formData.append("work_unit", work_unit);
  //     formData.append("lokasi", lokasi);
  //     formData.append("picture", picture);
  //     formData.append("bukti", bukti);
  //     formData.append("nama_peminjam", nama_peminjam);
  //     formData.append("divisi_peminjam", divisi_peminjam);
  //     formData.append("tanggal_awal_pinjam", tanggal_awal_pinjam);
  //     formData.append("tanggal_akhir_pinjam", tanggal_akhir_pinjam);
  //     formData.append("status_barang", status_barang);
  //     formData.append("solusi_barang", solusi_barang);
  //     formData.append("tujuan_keluar", tujuan_keluar);
  //     formData.append("_method", "PUT");

  //     await axios
  //       .post(`http://localhost:8000/api/input-barang/${id}`, formData)

  //       .then(() => {
  //         navigate("/tabel-inventory");
  //       })
  //       .catch((error) => {
  //         console.error("Error updating data:", error);
  //       });
  //   };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedRecords = [...records].sort((a, b) => {
      if (key === "nomor") {
        // Sorting numerik
        return direction === "ascending" ? a[key] - b[key] : b[key] - a[key];
      } else {
        // Sorting string
        if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
        if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
        return 0;
      }
    });
    setRecords(sortedRecords);
  };

  const getClassNamesFor = (column) => {
    if (!sortConfig.key) return "";
    return sortConfig.key === column
      ? sortConfig.direction === "ascending"
        ? "text-blue-500"
        : "text-red-500"
      : "";
  };

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      // Jika input kosong, kembalikan semua data
      setRecords(allRecords);
    } else {
      const filteredData = allRecords.filter(
        (row) =>
          row.nama_barang.toLowerCase().includes(searchTerm) ||
          row.nama_peminjam?.toLowerCase().includes(searchTerm) ||
          row.sn?.toString().toLowerCase().includes(searchTerm) ||
          row.tipe_barang?.toLowerCase().includes(searchTerm)
      );
      setRecords(filteredData);
    }
  }

  function openUpdateModal(record) {
    setEditData(record);
    setIsUpdateModalOpen(true);
  }

  function closeUpdateModal() {
    setIsUpdateModalOpen(false);
  }

  function openDetailModal(data) {
    setDetailData(data);
    setIsDetailModalOpen(true);
  }

  function closeDetailModal() {
    setIsDetailModalOpen(false);
  }

  return (
    <div className="container px-0 py-2 mt-3 w-full">
      <ToastContainer />
      <div className="bg-white rounded-xl p-4 shadow-md poppins-regular text-sm">
        <div className="flex justify-between mb-3">
          <div className="h-full mb-2">
            <div className="relative flex items-center">
              <CiSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari Nama Barang, Nama Peminjam, Tipe Barang, atau SN"
                onChange={handleFilter}
                className="form-control rounded-2xl pl-10 poppins-regular text-xs h-10"
                style={{ width: "410px" }}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
              </div>
            ) : (
              <div className="flex">
                {/* Tabel Kiri */}
                <div className="min-w-max bg-white w-[15%]">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100" style={{ height: "50px" }}>
                        <th
                          className="text-xs text-center px-2 py-2 cursor-pointer relative"
                          style={{ width: "5%" }}
                          onClick={() => handleSort("nomor")}
                        >
                          No
                          <span
                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "nomor"
                            )}`}
                          >
                            {sortConfig.key === "nomor" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center py-2 cursor-pointer relative"
                          style={{ width: "15%" }}
                          onClick={() => handleSort("kategori_input")}
                        >
                          Kategori
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "kategori_input"
                            )}`}
                          >
                            {sortConfig.key === "kategori_input" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((record, index) => (
                        <tr
                          key={record.id}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                          style={{ height: "75px" }}
                        >
                          <td className="text-xs text-center">{index + 1}</td>
                          <td className="text-xs text-center">
                            {record.kategori_input}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tabel Tengah */}
                <div className="flex-1 bg-white overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr
                        className="bg-gray-100"
                        style={{ height: "50px", width: "80px" }}
                      >
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("nama_barang")}
                        >
                          Nama Barang
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "nama_barang"
                            )}`}
                          >
                            {sortConfig.key === "nama_barang" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("tipe_barang")}
                        >
                          Tipe
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "tipe_barang"
                            )}`}
                          >
                            {sortConfig.key === "tipe_barang" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("kualitas")}
                        >
                          Kualitas
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "kualitas"
                            )}`}
                          >
                            {sortConfig.key === "kualitas" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("tanggal")}
                        >
                          Tanggal
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "tanggal"
                            )}`}
                          >
                            {sortConfig.key === "tanggal" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("tanggal_awal_pinjam")}
                        >
                          Awal Peminjaman
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "tanggal_awal_pinjam"
                            )}`}
                          >
                            {sortConfig.key === "tanggal_awal_pinjam" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("tanggal_akhir_pinjam")}
                        >
                          Akhir Peminjaman
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "tanggal_akhir_pinjam"
                            )}`}
                          >
                            {sortConfig.key === "tanggal_akhir_pinjam" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("divisi_peminjam")}
                        >
                          Divisi Peminjam
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "divisi_peminjam"
                            )}`}
                          >
                            {sortConfig.key === "divisi_peminjam" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("nama_peminjam")}
                        >
                          Nama Peminjam
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "nama_peminjam"
                            )}`}
                          >
                            {sortConfig.key === "nama_peminjam" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("sn")}
                        >
                          S/N
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "sn"
                            )}`}
                          >
                            {sortConfig.key === "sn" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("jumlah")}
                        >
                          Jumlah
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "jumlah"
                            )}`}
                          >
                            {sortConfig.key === "jumlah" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("satuan")}
                        >
                          Satuan
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "satuan"
                            )}`}
                          >
                            {sortConfig.key === "satuan" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("keterangan")}
                        >
                          Keterangan
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "keterangan"
                            )}`}
                          >
                            {sortConfig.key === "keterangan" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("work_unit")}
                        >
                          Unit Kerja
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "work_unit"
                            )}`}
                          >
                            {sortConfig.key === "work_unit" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                        <th
                          className="text-xs text-center px-4 py-2 cursor-pointer relative"
                          onClick={() => handleSort("lokasi")}
                        >
                          Lokasi
                          <span
                            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${getClassNamesFor(
                              "lokasi"
                            )}`}
                          >
                            {sortConfig.key === "lokasi" &&
                              (sortConfig.direction === "ascending" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              ))}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((record, index) => (
                        <tr
                          key={record.id}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                          style={{ height: "75px", width: "80px" }}
                        >
                          <td className="text-xs text-center">
                            {record.nama_barang}
                          </td>
                          <td className="text-xs text-center">
                            {record.tipe_barang}
                          </td>
                          <td className="text-xs text-center ">
                            {record.kualitas}
                          </td>
                          <td className="text-xs text-center ">
                            {record.tanggal}
                          </td>
                          <td className="text-xs text-center ">
                            {record.tanggal_awal_pinjam}
                          </td>
                          <td className="text-xs text-center ">
                            {record.tanggal_akhir_pinjam}
                          </td>
                          <td className="text-xs text-center ">
                            {record.divisi_peminjam}
                          </td>
                          <td className="text-xs text-center ">
                            {record.nama_peminjam}
                          </td>
                          <td className="text-xs text-center ">{record.sn}</td>
                          <td className="text-xs text-center ">
                            {record.jumlah}
                          </td>
                          <td className="text-xs text-center ">
                            {record.satuan}
                          </td>
                          <td className="text-xs text-center ">
                            {record.keterangan}
                          </td>
                          <td className="text-xs text-center ">
                            {record.work_unit}
                          </td>
                          <td className="text-xs text-center ">
                            {record.lokasi}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Tabel Kanan */}
                <div className="min-w-max bg-white">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th
                          className="text-xs text-center px-4 "
                          style={{ width: "10%", height: "50px" }}
                        >
                          Aksi Admin
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((record, index) => (
                        <tr
                          key={record.id}
                          className={`border-b ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                          style={{ height: "75px" }}
                        >
                          <td className="text-xs text-center px-4">
                            <div className="flex justify-center gap-2">
                              <div
                                className="bg-[#3498DB] p-2 rounded-xl hover:bg-blue-200"
                                title="Detail"
                                onClick={() => openDetailModal(record)}
                              >
                                <FaEye className="text-white cursor-pointer text-lg" />
                              </div>
                              <div
                                className="bg-[#387F39] p-2 rounded-xl hover:bg-green-200"
                                title="Edit"
                                onClick={() => openUpdateModal(record)}
                              >
                                <FaEdit className="text-white cursor-pointer text-lg" />
                              </div>
                              <div
                                className="bg-[#C53929] p-2 rounded-xl hover:bg-red-200"
                                title="Delete"
                                onClick={() => handleDelete(record.id)}
                              >
                                <FaTrash className="text-white cursor-pointer text-lg" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <span>Menampilkan </span>
              <select
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1"
              >
                {[5, 10, 15, 20].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <span> Baris</span>
            </div>

            <div>
              <span>
                Menampilkan {indexOfFirstRecord + 1} hingga{" "}
                {Math.min(indexOfLastRecord, records.length)} dari{" "}
                {records.length} Data
              </span>
            </div>

            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1 ? "bg-gray-200" : "bg-blue-600 text-white"
                }`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaAngleLeft color={currentPage === 1 ? "#ccc" : "#fff"} />
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === number + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </button>
              ))}
              <button
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200"
                    : "bg-blue-600 text-white"
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaAngleRight
                  color={currentPage === totalPages ? "#ccc" : "#fff"}
                />
              </button>
            </div>
          </div>
        </div>

        {isUpdateModalOpen && (
          // <UpdateInventoryItem
          //   isUpdateModalOpen={isUpdateModalOpen}
          //   closeUpdateModal={closeUpdateModal}
          //   setIsUpdateModalOpen={setIsUpdateModalOpen}
          //   editData={editData}
          //   setEditData={setEditData}
          //   handleUpdate={handleUpdate}
          //   detailData={detailData}
          // />
          <EditInventoryItem
            isUpdateModalOpen={isUpdateModalOpen}
            closeUpdateModal={closeUpdateModal}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            handleSave={handleSave}
            editData={editData}
            setEditData={setEditData}
          />
        )}
        {isDetailModalOpen && (
          <SeeDetail
            isDetailModalOpen={isDetailModalOpen}
            setIsDetailModalOpen={setIsDetailModalOpen}
            closeDetailModal={closeDetailModal}
            detailData={detailData}
          />
        )}
      </div>
    </div>
  );
}

export default InventoryTable;
