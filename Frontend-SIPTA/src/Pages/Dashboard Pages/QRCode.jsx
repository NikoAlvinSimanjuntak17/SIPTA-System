import React from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import axios from "axios";

function QrCodePage() {
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

  // URL untuk menampilkan informasi barang
  const qrCodeUrl = data
    ? `http://localhost:5173/item-info/${id}` // URL yang dituju saat discan
    : "";

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-xl font-bold mb-4">
        Scan untuk Mengetahui Informasi Barang
      </h1>
      {data ? (
        <QRCode
          value={qrCodeUrl} // Menggunakan URL yang telah dibuat
          size={256} // Ukuran QR code dapat disesuaikan
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QrCodePage;
