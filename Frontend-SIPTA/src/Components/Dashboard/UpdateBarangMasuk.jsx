import React, { useRef, useEffect, useState } from "react";
import InputSerialNumber from "./InputSerialNumber";
import InputType from "./InputType";
import InputQuantity from "./InputQuantity";
import InputQuality from "./InputQuality";
import InputUnits from "./InputUnits";
import InputDate from "./InputDate";
import InputPicture from "./InputPicture";
import InputInformation from "./InputInformation";
import InputWorkUnit from "./InputWorkUnit";
import InputLocation from "./InputLocation";
import InputName from "./InputName";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillPicture } from "react-icons/ai";

const UpdateBarangMasuk = ({
  isUpdateModalOpen,
  closeUpdateModal,
  handleUpdate,
  editData,
  setEditData,
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isUpdateModalOpen) {
      setLoading(false); // Set loading ke false jika modal dibuka
    }
  }, [isUpdateModalOpen]);

  // Fungsi untuk menangani klik di luar modal
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeUpdateModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isUpdateModalOpen) return null;

  return (
    <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="modal-content bg-white rounded w-full max-w-md max-h-[90vh] relative overflow-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 z-20">
          <div className="flex items-center justify-between p-4">
            <h3 className="poppins-semibold text-xl">
              Update Tabel Barang Masuk
            </h3>
          </div>
        </div>
        <div className="p-4 pt-0">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <div className="mb-4">
                <InputName
                  label="Item Name"
                  value={editData?.nama_barang || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      nama_barang: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputSerialNumber
                  value={editData?.sn || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      sn: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputType
                  value={editData?.tipe_barang || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      tipe_barang: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputQuantity
                  value={editData?.jumlah || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      jumlah: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputQuality
                  value={editData?.kualitas || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      kualitas: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputUnits
                  value={editData?.satuan || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      satuan: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputDate
                  selectedDate={
                    editData?.tanggal ? new Date(editData.tanggal) : null
                  }
                  onDateChange={(date) =>
                    setEditData({
                      ...editData,
                      tanggal: date,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                {editData?.picture ? (
                  // Menampilkan gambar baru jika ada, jika tidak tampilkan placeholder
                  <img
                    src={
                      typeof editData.picture === "string" &&
                      editData.picture.startsWith("http")
                        ? editData.picture
                        : `http://localhost:8000/storage/pictures/${editData.picture}`
                    }
                    alt={editData.nama_barang || "Gambar Barang"}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Placeholder"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
                <InputPicture
                  value={editData?.picture || ""}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // Menyimpan file gambar yang dipilih
                      setEditData({
                        ...editData,
                        picture: URL.createObjectURL(file), // Menggunakan URL.createObjectURL untuk gambar yang diupload
                        // Jika Anda ingin menyimpan nama file asli, Anda dapat menambahkan key lain
                        pictureFileName: file.name,
                      });
                    }
                  }}
                />
              </div>
              <div className="mb-4">
                <InputInformation
                  value={editData?.keterangan || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      keterangan: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputWorkUnit
                  value={editData?.work_unit || ""}
                  onChange={(work_unit) =>
                    setEditData({
                      ...editData,
                      work_unit: work_unit,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputLocation
                  value={editData?.lokasi || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      lokasi: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    console.log("Update clicked");
                    handleUpdate();
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={closeUpdateModal}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateBarangMasuk;
