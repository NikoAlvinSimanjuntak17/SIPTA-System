import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ViewInventoryItem({
  isDetailModalOpen,
  closeDetailModal,
  detailData,
}) {
  const isPinjaman = detailData?.kategori_input === "Barang Pinjaman";
  const isKeluar = detailData?.kategori_input === "Barang Keluar";
  const isRusak = detailData?.kategori_input === "Barang Rusak";
  return (
    <Modal
      show={isDetailModalOpen}
      onHide={closeDetailModal}
      size="md" // Ukuran modal sedang (medium) untuk tidak terlalu lebar
      scrollable
      dialogClassName="modal-dialog-centered" // Memastikan modal berada di tengah vertikal
    >
      <Modal.Header>
        <Modal.Title>Detail Barang</Modal.Title>
        <Button
          variant="link"
          onClick={closeDetailModal}
          style={{ visibility: "hidden" }}
        >
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 text-center">
          {/* Menampilkan gambar di atas informasi barang */}
          {detailData?.picture && (
            <img
              src={`http://localhost:8000/storage/pictures/${detailData.picture}`}
              alt={detailData.nama_barang}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>
        <form>
          {isPinjaman ? (
            <>
              <div className="mb-3">
                <label htmlFor="tipeBarang" className="form-label">
                  Kategori Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipeBarang"
                  value={detailData?.kategori_input || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tanggalAwalPinjam" className="form-label">
                  Tanggal Awal Peminjaman
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tanggalAwalPinjam"
                  value={detailData?.tanggal_awal_pinjam || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tanggalAkhirPinjam" className="form-label">
                  Tanggal Akhir Peminjaman
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tanggalAkhirPinjam"
                  value={detailData?.tanggal_akhir_pinjam || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="divisiPeminjam" className="form-label">
                  Divisi Peminjam
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="divisiPeminjam"
                  value={detailData?.divisi_peminjam || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="namaPeminjam" className="form-label">
                  Nama Peminjam
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaPeminjam"
                  value={detailData?.nama_peminjam || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unitKerja" className="form-label">
                  Bukti
                </label>
                {detailData?.bukti && (
                  <div className="mb-2">
                    <a
                      href={`http://localhost:8000/storage/bukti/${detailData.bukti}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        color: "#3498DB",
                        textDecoration: "none",
                      }}
                    >
                      {detailData.bukti}
                    </a>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="namaBarang" className="form-label">
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaBarang"
                  value={detailData?.nama_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipeBarang" className="form-label">
                  Tipe Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipeBarang"
                  value={detailData?.tipe_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sn" className="form-label">
                  Serial Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sn"
                  value={detailData?.sn || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keterangan" className="form-label">
                  Keterangan
                </label>
                <textarea
                  className="form-control"
                  id="keterangan"
                  rows="3"
                  value={detailData?.keterangan || ""}
                  readOnly
                  style={{ resize: "none" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unitKerja" className="form-label">
                  Unit Kerja
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unitKerja"
                  value={detailData?.work_unit || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lokasi" className="form-label">
                  Lokasi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lokasi"
                  value={detailData?.lokasi || ""}
                  readOnly
                />
              </div>
            </>
          ) : isRusak ? (
            <>
              <div className="mb-3">
                <label htmlFor="kategoriBarang" className="form-label">
                  Kategori Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="kategoriBarang"
                  value={detailData?.kategori_input || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="namaBarang" className="form-label">
                  Status Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaBarang"
                  value={detailData?.status_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="namaBarang" className="form-label">
                  Solusi Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaBarang"
                  value={detailData?.solusi_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="namaBarang" className="form-label">
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaBarang"
                  value={detailData?.nama_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipeBarang" className="form-label">
                  Tipe Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipeBarang"
                  value={detailData?.tipe_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sn" className="form-label">
                  Serial Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sn"
                  value={detailData?.sn || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keterangan" className="form-label">
                  Keterangan
                </label>
                <textarea
                  className="form-control"
                  id="keterangan"
                  rows="3"
                  value={detailData?.keterangan || ""}
                  readOnly
                  style={{ resize: "none" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unitKerja" className="form-label">
                  Unit Kerja
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unitKerja"
                  value={detailData?.work_unit || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lokasi" className="form-label">
                  Lokasi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lokasi"
                  value={detailData?.lokasi || ""}
                  readOnly
                />
              </div>
            </>
          ) : isKeluar ? (
            <>
              <div className="mb-3">
                <label htmlFor="kategoriBarang" className="form-label">
                  Kategori Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="kategoriBarang"
                  value={detailData?.kategori_input || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="namaBarang" className="form-label">
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaBarang"
                  value={detailData?.nama_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipeBarang" className="form-label">
                  Tipe Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipeBarang"
                  value={detailData?.tipe_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sn" className="form-label">
                  Serial Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sn"
                  value={detailData?.sn || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keterangan" className="form-label">
                  Keterangan
                </label>
                <textarea
                  className="form-control"
                  id="keterangan"
                  rows="3"
                  value={detailData?.keterangan || ""}
                  readOnly
                  style={{ resize: "none" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unitKerja" className="form-label">
                  Bukti
                </label>
                {detailData?.bukti && (
                  <div className="mb-2">
                    <a
                      href={`http://localhost:8000/storage/bukti/${detailData.bukti}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                      style={{
                        display: "inline-block",
                        padding: "8px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        color: "#3498DB",
                        textDecoration: "none",
                      }}
                    >
                      {detailData.bukti}
                    </a>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="unitKerja" className="form-label">
                  Unit Kerja
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unitKerja"
                  value={detailData?.work_unit || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lokasi" className="form-label">
                  Lokasi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lokasi"
                  value={detailData?.lokasi || ""}
                  readOnly
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label htmlFor="kategoriBarang" className="form-label">
                  Kategori Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="kategoriBarang"
                  value={detailData?.kategori_input || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="namaBarang" className="form-label">
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namaBarang"
                  value={detailData?.nama_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipeBarang" className="form-label">
                  Tipe Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipeBarang"
                  value={detailData?.tipe_barang || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sn" className="form-label">
                  Serial Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sn"
                  value={detailData?.sn || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keterangan" className="form-label">
                  Keterangan
                </label>
                <textarea
                  className="form-control"
                  id="keterangan"
                  rows="3"
                  value={detailData?.keterangan || ""}
                  readOnly
                  style={{ resize: "none" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="unitKerja" className="form-label">
                  Unit Kerja
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="unitKerja"
                  value={detailData?.work_unit || ""}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lokasi" className="form-label">
                  Lokasi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lokasi"
                  value={detailData?.lokasi || ""}
                  readOnly
                />
              </div>
            </>
          )}

          <Modal.Footer>
            <div className="d-flex justify-content-end gap-2">
              <Link
                to={`/print-qr-code/${detailData?.id}`}
                className="btn bg-[#3498DB] hover:bg-[#2980B9] text-white"
              >
                Print QR Code
              </Link>
              <Button variant="danger" onClick={closeDetailModal}>
                Close
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ViewInventoryItem;
