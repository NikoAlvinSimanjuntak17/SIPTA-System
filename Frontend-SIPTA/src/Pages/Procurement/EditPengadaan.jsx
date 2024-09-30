import React, { useRef, useEffect, useState } from "react";
import InputSerialNumber from "../../Pages/Inventaris/InputSerialNumber";
import InputType from "../../Pages/Inventaris/InputType";
import InputQuantity from "../../Pages/Inventaris/InputQuantity";
import InputQuality from "../../Pages/Inventaris/InputQuality";
import InputUnits from "../../Pages/Inventaris/InputUnits";
import InputPicture from "../../Pages/Inventaris/InputPicture";
import InputInformation from "../../Pages/Inventaris/InputInformation";
import InputWorkUnit from "../../Pages/Inventaris/InputWorkUnit";
import InputLocation from "../../Pages/Inventaris/InputLocation";
import InputName from "../../Pages/Inventaris/InputName";
import InputCategory from "../../Components/Dashboard/InputPengadaan";
import InputStartDate from "../../Components/Dashboard/InputStartDate";
import InputEndDate from "../../Components/Dashboard/InputEndDate";
import InputDivisiPeminjam from "../../Components/Dashboard/InputDivisiPeminjam";
import InputNamaPeminjam from "../../Components/Dashboard/InputNamaPeminjam";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from "react-bootstrap";
import InputBuktiKeluar from "../../Components/Dashboard/InputBuktiKeluar";
import InputTujuanKeluar from "../../Components/Dashboard/InputTujuanKeluar";
import InputStatusRusak from "../../Components/Dashboard/InputStatusRusak";
import InputSolusiRusak from "../../Components/Dashboard/InputSolusiRusak";
import InputNomorPengadaan from "../../Components/Dashboard/InputNomorPengadaan";
import InputNamaPengadaan from "../../Components/Dashboard/InputNamaPengadaan";
import InputTanggalPengadaan from "../../Components/Dashboard/InputTanggalPengadaan";
import InputJenisAnggaran from "../../Components/Dashboard/InputJenisAnggaran";
import InputSubAnggaran from "../../Components/Dashboard/InputSubAnggaran";
import InputNilaiBarang from "../../Components/Dashboard/InputNilaiBarang";

const EditPengadaan = ({
  isUpdateModalOpen,
  closeUpdateModal,
  handleSave,
  editData,
  setEditData,
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    editData?.kategori_input || ""
  );
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setEditData({
      ...editData,
      kategori_input: category,
    });
  };

  const [imageURL, setImageURL] = useState(editData.picture || "");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isUpdateModalOpen) {
      setLoading(false);
      if (editData?.picture) {
        setImageURL(editData.picture);
      }
    }
  }, [isUpdateModalOpen, editData?.picture]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeUpdateModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleImageChange = (file) => {
  //   if (file) {
  // const url = URL.createObjectURL(file); // Create object URL
  // setImageURL(url);
  // setImageFile(file); // Save file for upload
  // setEditData({
  //   ...editData,
  //   pictureFile: file,
  //   pictureFileName: file.name,
  // });
  //   }
  // };
  const handleImageChange = (file) => {
    const url = URL.createObjectURL(file); // Create object URL
    setImageURL(url);
    setImageFile(file); // Save file for upload
    setEditData({
      ...editData,
      picture: file,
    });
  };

  // useEffect(() => {
  //   return () => {
  //     if (imageURL && imageURL.startsWith("blob:")) {
  //       URL.revokeObjectURL(imageURL);
  //     }
  //   };
  // }, [imageURL]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);

    // Prepare form data
    const formData = new FormData();
    formData.append("no_pengadaan", editData.no_pengadaan || "");
    formData.append("nama_pengadaan", editData.nama_pengadaan || "");
    formData.append("tanggal_pengadaan", editData.tanggal_pengadaan || "");
    formData.append("jenis_anggaran", editData.jenis_anggaran || "");
    formData.append("sub_anggaran", editData.sub_anggaran || "");
    formData.append("nilai_barang", editData.nilai_barang || "");
    formData.append("jumlah_barang", editData.jumlah_barang || "");

    if (editData.bukti) {
      formData.append("bukti", editData.bukti);
    }

    console.log("FormData:", ...formData);

    // Send data to the backend
    try {
      await handleSave(formData);
    } catch (error) {
      console.error("Error updating item:", error);
    } finally {
      setLoading(false);
      closeUpdateModal();
    }
  };

  return (
    <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <Modal
            show={isUpdateModalOpen}
            onHide={closeUpdateModal}
            size="md"
            scrollable
            dialogClassName="modal-dialog-centered"
          >
            <Modal.Header>
              <Modal.Title>Edit Pengadaan</Modal.Title>
            </Modal.Header>
            <Modal.Body ref={modalRef}>
              <div className="mb-4">
                <InputNomorPengadaan
                  label="Nomor Pengadaan"
                  value={editData?.no_pengadaan || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      no_pengadaan: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <InputNamaPengadaan
                  value={editData?.nama_pengadaan || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      nama_pengadaan: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <InputTanggalPengadaan
                  selectedDate={editData?.tanggal_pengadaan} // Use editData?.tanggal_awal_pinjam directly
                  onDateChange={(date) =>
                    setEditData({
                      ...editData,
                      tanggal_pengadaan: date,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <InputJenisAnggaran
                  value={editData?.jenis_anggaran || ""}
                  onChange={(jenis_anggaran) =>
                    setEditData({
                      ...editData,
                      jenis_anggaran: jenis_anggaran,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <InputSubAnggaran
                  value={editData?.sub_anggaran || ""}
                  onChange={(sub_anggaran) =>
                    setEditData({
                      ...editData,
                      sub_anggaran: sub_anggaran,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <InputNilaiBarang
                  value={editData?.nilai_barang || ""}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      nilai_barang: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                type="button"
                variant="primary"
                className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white"
                onClick={(e) => handleSubmit(e)} // Pass the event manually
              >
                Update
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
};

export default EditPengadaan;
