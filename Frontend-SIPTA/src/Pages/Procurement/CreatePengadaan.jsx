import React, { useState } from "react";
import axios from "axios";

const CreatePengadaan = ({ isOpen, onClose }) => {
  const [procurementName, setProcurementName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/procurements", { procurement_name: procurementName });
      alert("Pengadaan berhasil dibuat!");
      onClose(); // Tutup modal setelah berhasil submit
    } catch (error) {
      console.error("Error creating procurement:", error);
      alert("Gagal membuat pengadaan.");
    }
  };

  if (!isOpen) {
    return null; // Jika modal tidak terbuka, tidak render apa-apa
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Tambah Pengadaan Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nama Pengadaan
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={procurementName}
              onChange={(e) => setProcurementName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePengadaan;
