import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { CiSearch } from "react-icons/ci";
import SeeDetail from "./ViewInventoryItem";
import UpdateInventoryItem from "./UpdateInventoryItem";

const TableComponent = ({
  handleFilter,
  handleDelete,
  records,
  setRecords,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  isDetailModalOpen,
  setIsDetailModalOpen,
  fetchData,
}) => {
  const [entries, setEntries] = useState(5);
  function handleEntriesChange(e) {
    setEntries(parseInt(e.target.value));
  }

  const [search, setSearch] = useState("");

  return (
    <div className="container px-0 py-2 mt-3 w-full">
      <div className="bg-white rounded-xl p-4 shadow-md poppins-regular text-sm">
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <label htmlFor="entries" className="me-2">
              Show
            </label>
            <select
              id="entries"
              className="form-select text-sm"
              style={{ width: "80px" }}
              onChange={handleEntriesChange}
              value={entries}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <label htmlFor="entries" className="ms-2">
              entries
            </label>
          </div>
          <div className="h-full">
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
        <DataTable
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
              width: "5%",
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
          {/* Kondisional untuk menampilkan kolom tanggal_awal_pinjam dan tanggal_akhir_pinjam */}
        </DataTable>
        {isUpdateModalOpen && (
          <UpdateInventoryItem
            isUpdateModalOpen={isUpdateModalOpen}
            closeUpdateModal={closeUpdateModal}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            editData={editData}
            setEditData={setEditData}
            fetchData={fetchData}
            // handleUpdate={handleUpdate}
            detailData={detailData}
            records={records}
            setRecords={setRecords}
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
};

export default TableComponent;
