import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaAngleRight,
  FaAngleLeft,
} from "react-icons/fa";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { AiFillCaretDown } from "react-icons/ai";

function InventoryTable() {
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValues, setSearchValues] = useState({
    procurement_no: "",
    procurement_name: "",
    budget_type: "",
    budget_sub_type: "",
    value: "",
    procurement_date: "",
  });

  const entries = 5;
  const indexOfLastRecord = currentPage * entries;
  const indexOfFirstRecord = indexOfLastRecord - entries;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const fetchProcurements = async () => {
    try {
      const response = await axios.get("/procurements");
      return response;
    } catch (error) {
      console.error("Error fetching procurements:", error);
      throw error;
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchProcurements();
        setRecords(response.data);
        setAllRecords(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleFilter = (event, key) => {
    const value = event.target.value.toLowerCase();
    setSearchValues({ ...searchValues, [key]: value });

    const isSearchEmpty =
      !searchValues.procurement_no &&
      !searchValues.procurement_name &&
      !searchValues.budget_type &&
      !searchValues.budget_sub_type &&
      !searchValues.value &&
      !searchValues.procurement_date &&
      !value; // Also include the current value being typed in

    if (isSearchEmpty) {
      setRecords(allRecords);
      return;
    }

    const filteredData = allRecords.filter((row) => {
      return (
        row.procurement_no.toLowerCase().includes(searchValues.procurement_no) &&
        row.procurement_name.toLowerCase().includes(searchValues.procurement_name) &&
        (row.budget_type.toLowerCase() === searchValues.budget_type || searchValues.budget_type === "") &&
        row.budget_sub_type.toLowerCase().includes(searchValues.budget_sub_type) &&
        (row.value.toString().includes(searchValues.value) || searchValues.value === "") &&
        row.procurement_date.includes(searchValues.procurement_date)
      );
    });

    setRecords(filteredData);
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleAction = (action, recordId) => {
    if (action === "edit") {
      console.log(`Edit record with ID: ${recordId}`);
    } else if (action === "delete") {
      console.log(`Delete record with ID: ${recordId}`);
    } else if (action === "view") {
      console.log(`View record with ID: ${recordId}`);
    }
    setOpenDropdown(null); // Close dropdown after action
  };

  return (
    <div className="container mx-auto p-2 mt-5">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader color="#00BFFF" loading={loading} size={50} />
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-xs leading-normal">
                  <th className="py-2 px-4 text-center" style={{ width: "100px" }}>
                    Pengadaan#
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchValues.procurement_no}
                        onChange={(e) => handleFilter(e, "procurement_no")}
                        className="form-control rounded border border-gray-300 h-8 w-full pr-8"
                      />
                      <CiSearch size={20} className="absolute left-2 text-black-400" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-center">
                    Nama
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchValues.procurement_name}
                        onChange={(e) => handleFilter(e, "procurement_name")}
                        className="form-control rounded border border-gray-300 h-8 w-full pr-8"
                      />
                      <CiSearch size={20} className="absolute left-2 text-black-400" />
                      </div>
                  </th>
                  <th className="py-2 px-4 text-center"style={{ width: "160px" }}>
                    Jenis Anggaran
                    <div className="relative">
                      <select
                        value={searchValues.budget_type}
                        onChange={(e) => handleFilter(e, "budget_type")}
                        className="form-control rounded border border-gray-300 h-9 w-full pr-8 appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="opex">opex</option>
                        <option value="capex">capex</option>
                      </select>
                      <AiFillCaretDown className="absolute right-2 top-2 pointer-events-none text-gray-500" />
                    </div>
                  </th>
                  <th className="py-2 px-4 text-center">
                    Sub Anggaran
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchValues.budget_sub_type}
                        onChange={(e) => handleFilter(e, "budget_sub_type")}
                        className="form-control rounded border border-gray-300 h-8 w-full pr-8"
                      />
                      <CiSearch size={20} className="absolute left-2 text-black-400" />
                      </div>
                  </th>
                  <th className="py-2 px-4 text-center">
                    Value
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={searchValues.value}
                        onChange={(e) => handleFilter(e, "value")}
                        className="form-control rounded border border-gray-300 h-8 w-full pr-8"
                      />
                      <CiSearch size={20} className="absolute left-2 text-black-400" />
                      </div>
                  </th>
                  <th className="py-2 px-4 text-center">Total Barang</th>
                  <th className="py-2 px-4 text-center">
                    Tanggal Pengadaan
                    <div className="relative flex items-center">
                      <input
                        type="date"
                        value={searchValues.procurement_date}
                        onChange={(e) => handleFilter(e, "procurement_date")}
                        className="form-control rounded border border-gray-300 h-8 w-full pr-2"
                      />
                    </div>
                  </th>
                  <th className="py-2 px-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-600 text-sm">
                {currentRecords.map((record, index) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 text-center">
                      {record.procurement_no}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {record.procurement_name}
                    </td>
                    <td className="py-2 px-4 text-center">{record.budget_type}</td>
                    <td className="py-2 px-4 text-center">
                      {record.budget_sub_type}
                    </td>
                    <td className="text-center">
                      {new Intl.NumberFormat("id-ID", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(record.value)}
                    </td>
                    <td className="text-center">
                      {Number(record.procurement_total)
                        .toFixed(0)
                        .replace(/\.00$/, "")}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {record.procurement_date}
                    </td>
                    <td className="py-2 px-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="focus:outline-none"
                      >
                        ⋮
                      </button>
                      {openDropdown === index && (
                        <div className="absolute right-0 bg-white border rounded shadow-lg">
                          <button
                            onClick={() => handleAction("view", record.id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleAction("edit", record.id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleAction("delete", record.id)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          className={`px-4 py-2 bg-gray-100 text-gray-500 rounded ${
            currentPage === 1 ? "cursor-not-allowed" : ""
          }`}
        >
          <FaAngleLeft />
        </button>
        <span>{`Page ${currentPage}`}</span>
        <button
          disabled={currentRecords.length < entries}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          className={`px-4 py-2 bg-gray-100 text-gray-500 rounded ${
            currentRecords.length < entries ? "cursor-not-allowed" : ""
          }`}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
}

export default InventoryTable;
