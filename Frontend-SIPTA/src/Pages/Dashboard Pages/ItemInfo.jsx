import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ItemInfo() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/input-barang/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#d6eaf8] flex items-center justify-center">
      {data ? (
        <div className="bg-white rounded-xl shadow-lg max-w-6xl w-full flex">
          {/* Bagian Informasi Barang */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-4 text-[#85c1e9] text-center">
              Informasi Barang
            </h1>
            <div className="flex flex-row w-full poppins-regular">
              {data.kategori_input === "Barang Masuk" && (
                <div className="flex flex-row w-full text-xs">
                  <div className="flex flex-col space-y-2 w-[100%]" id="Left">
                    {/* Kategori Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Kategori Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.kategori_input}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Nama Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Nama Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.nama_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Tipe Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Tipe Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.tipe_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Unit Kerja */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Unit Kerja
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.work_unit}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Lokasi */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Lokasi
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.lokasi}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Serial Number
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.sn}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Keterangan Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.keterangan}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                  </div>
                </div>
              )}
              {data.kategori_input === "Barang Keluar" && (
                <div className="flex flex-row w-full text-xs space-x-4">
                  <div className="flex flex-col space-y-2 w-[50%]" id="Left">
                    {/* Kategori Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Kategori Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.kategori_input}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Nama Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Nama Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.nama_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Tipe Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Tipe Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.tipe_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Unit Kerja */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Unit Kerja
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.work_unit}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Lokasi */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Lokasi
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.lokasi}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Serial Number
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.sn}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 w-[50%]" id="Right">
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Tujuan Keluar
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.tujuan_keluar}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Bukti
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.bukti}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Keterangan Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.keterangan}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                  </div>
                </div>
              )}
              {data.kategori_input === "Barang Pinjaman" && (
                <div className="flex flex-row w-full text-xs space-x-4">
                  <div className="flex flex-col space-y-2 w-[50%]" id="Left">
                    {/* Kategori Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Kategori Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.kategori_input}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Nama Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Nama Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.nama_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Tipe Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Tipe Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.tipe_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Unit Kerja */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Unit Kerja
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.work_unit}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Lokasi */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Lokasi
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.lokasi}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Serial Number
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.sn}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 w-[50%]" id="Right">
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Tanggal Awal Peminjaman
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.tanggal_awal_pinjam}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Tanggal Akhir Peminjaman
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.tanggal_akhir_pinjam}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Divisi Peminjam
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.divisi_peminjam}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Nama Peminjam
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.nama_peminjam}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Keterangan Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.keterangan}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                  </div>
                </div>
              )}
              {data.kategori_input === "Barang Rusak" && (
                <div className="flex flex-row w-full text-xs space-x-4">
                  <div className="flex flex-col space-y-2 w-[50%]" id="Left">
                    {/* Kategori Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Kategori Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.kategori_input}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Nama Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Nama Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.nama_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Tipe Barang */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Tipe Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.tipe_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Unit Kerja */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Unit Kerja
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.work_unit}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    {/* Lokasi */}
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Lokasi
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.lokasi}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Serial Number
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.sn}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 w-[50%]" id="Right">
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Status Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.status_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>

                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Solusi Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.solusi_barang}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                    <div>
                      <p className="text-[#b2babb] text-sm font-semibold">
                        Keterangan Barang
                      </p>
                      <p className="text-black text-lg font-regular">
                        {data.keterangan}
                      </p>
                      <hr className="border-[#b2babb] border-t-2 my-2" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Bagian Gambar */}
          <div className="flex-shrink-0 w-[50%] bg-[#85c1e9] flex items-center justify-center p-4 rounded-r-lg">
            {data?.picture && (
              <img
                src={`http://localhost:8000/storage/pictures/${data.picture}`}
                alt={data.nama_barang}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemInfo;
