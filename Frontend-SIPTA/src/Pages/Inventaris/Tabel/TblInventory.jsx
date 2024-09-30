import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
import SeeDetail from "./ViewInventoryItem";
import UpdateInventoryItem from "./UpdateInventoryItem";
import EditInventoryItem from "./EditInventoryItem";

function TblInventory() {
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [entries, setEntries] = useState(5);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editData, setEditData] = useState();
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

  useEffect(() => {
    // Fetch data when the component mounts
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/input-barang"
        );
        const recordsWithNumbers = response.data.map((record, index) => ({
          ...record,
          nomor: index + 1,
        }));
        setRecords(recordsWithNumbers);
        setAllRecords(recordsWithNumbers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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

  function handleEntriesChange(event) {
    setEntries(parseInt(event.target.value));
  }

  function openUpdateModal(data) {
    setEditData(data); // Pastikan data yang diset di sini sudah benar
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

  // async function handleUpdate() {
  //   if (editData) {
  //     const formData = new FormData();

  //     // Tambahkan semua field yang ada di editData ke FormData
  //     for (let key in editData) {
  //       if (editData[key] !== null && editData[key] !== undefined) {
  //         formData.append(key, editData[key]);
  //       }
  //     }

  //     try {
  //       await axios.put(
  //         `http://localhost:8000/api/input-barang/${editData.id}`,
  //         editData,
  //         {
  //           // headers: {
  //           //   "Content-Type": "multipart/form-data",
  //           // },
  //         }
  //       );

  //       // Update records setelah update berhasil
  //       const updatedRecords = records.map((record) =>
  //         record.id === editData.id ? { ...record, ...editData } : record
  //       );
  //       const recordsWithNumbers = updatedRecords.map((record, index) => ({
  //         ...record,
  //         nomor: index + 1,
  //       }));
  //       setRecords(recordsWithNumbers);
  //       alert("Data berhasil diperbarui");
  //       setIsUpdateModalOpen(false);
  //     } catch (error) {
  //       console.error("Terjadi kesalahan saat memperbarui data!", error);
  //     }
  //   }
  // }

  return (
    <div className="container px-0 py-2 mt-3 w-full">
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
        {/* <DataTable
          value={records}
          paginator
          rows={entries}
          rowsPerPageOptions={[5, 10, 15, 20]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          className="p-datatable-striped space-y-4"
          rowClassName={(data, rowIndex) =>
            rowIndex % 2 === 0
              ? "bg-white border-b border-gray-200"
              : "bg-gray-100 border-b border-gray-200"
          }
          sortMode="multiple"
          headerStyle={{ backgroundColor: "#F8F9FA" }}
        >
          <Column
            field="nomor"
            header="No"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
            headerStyle={{ backgroundColor: "#F8F9FA" }}
            bodyStyle={{ backgroundColor: "#F3F4F6" }}
            style={{
              width: "3%",
              textAlign: "left",
              position: "sticky",
              left: 0,
              zIndex: 1,
            }}
          />
          <Column
            field="kategori_input"
            header="Kategori"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="nama_barang"
            header="Nama Barang"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
            style={{
              width: "20%",
            }}
          />
          <Column
            field="tipe_barang"
            header="Tipe"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="kualitas"
            header="Kualitas"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="tanggal"
            header="Tanggal"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="tanggal_awal_pinjam"
            header="Awal Peminjaman"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="tanggal_akhir_pinjam"
            header="Akhir Peminjaman"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="divisi_peminjam"
            header="Divisi Peminjam"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="nama_peminjam"
            header="Nama Peminjam"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="sn"
            header="S/N"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="jumlah"
            header="Jumlah"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="satuan"
            header="Satuan"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="keterangan"
            header="Keterangan"
            headerClassName="text-xs"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="work_unit"
            header="Unit Kerja"
            headerClassName="text-sm"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            field="lokasi"
            header="Lokasi"
            headerClassName="text-sm"
            className="text-center poppins-regular text-xs"
            sortable
          />
          <Column
            header="Aksi Admin"
            headerClassName="text-xs sticky right-0 z-[1]"
            className="sticky right-0 z-[1]"
            headerStyle={{ backgroundColor: "#F8F9FA" }}
            bodyStyle={{ backgroundColor: "#F3F4F6" }}
            body={(rowData) => (
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  justifyContent: "center",
                }}
              >
                <div
                  className="bg-[#3498DB] px-2 py-2 rounded-3"
                  onClick={() => openDetailModal(rowData)}
                >
                  <FaEye
                    title="Lihat Detail"
                    className="text-white cursor-pointer text-sm sm:text-base"
                  />
                </div>
                <div
                  className="bg-[#387F39] px-2 py-2 rounded-3"
                  onClick={() => openUpdateModal(rowData)}
                >
                  <FaEdit
                    title="Edit"
                    className="text-white cursor-pointer text-sm sm:text-base"
                  />
                </div>
                <div
                  className="bg-[#C53929] px-2 py-2 rounded-3"
                  onClick={() => handleDelete(rowData.id)}
                >
                  <FaTrash
                    title="Hapus"
                    className="text-white cursor-pointer text-sm sm:text-base"
                  />
                </div>
              </div>
            )}
          />
        </DataTable> */}
        <div className="w-full">
          <div>
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

export default TblInventory;
