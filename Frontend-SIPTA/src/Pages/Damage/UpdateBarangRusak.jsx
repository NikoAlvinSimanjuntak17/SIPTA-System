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

const UpdateBarangRusak = ({
  isUpdateModalOpen,
  closeUpdateModal,
  handleUpdate,
  editData,
  setEditData,
  itemId, // ID barang yang akan diupdate
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Function to handle clicks outside the modal
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeUpdateModal();
    }
  };

  const handleCancel = () => {
    closeUpdateModal();
  };

  // Fetch data when modal is opened
  useEffect(() => {
    if (isUpdateModalOpen && itemId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:8000/api/barang-rusak/${itemId}`
          );
          if (response.ok) {
            const data = await response.json();
            setEditData(data); // Set data yang diambil
          } else {
            console.error("Error fetching data");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isUpdateModalOpen, itemId, setEditData]);

  // Add and clean up event listener
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
              Update Tabel Barang Rusak
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
                  value={editData?.itemName || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      itemName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputSerialNumber
                  value={editData?.serialNumber || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      serialNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputType
                  value={editData?.type || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      type: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputQuantity
                  value={editData?.quantity || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputQuality
                  value={editData?.quality || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      quality: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputUnits
                  value={editData?.units || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      units: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputDate
                  value={editData?.date || ""}
                  onChange={(date) =>
                    setEditData({
                      ...editData,
                      date,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputPicture
                  value={editData?.picture || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      picture: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputInformation
                  value={editData?.information || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      information: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputWorkUnit
                  value={editData?.workUnit || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      workUnit: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputLocation
                  value={editData?.location || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      location: e.target.value,
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
                  onClick={handleCancel}
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

export default UpdateBarangRusak;
