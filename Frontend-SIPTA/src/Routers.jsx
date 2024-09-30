import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard Pages/Dashboard";
import Home from "./Pages/Home";
// import TabelBarangMasuk from "./Pages/Dashboard Pages/TabelBarangMasuk";
// import TabelBarangKeluar from "./Pages/Dashboard Pages/TabelBarangKeluar";
// import TabelBarangPinjaman from "./Pages/Dashboard Pages/TabelBarangPinjaman";
// import TabelBarangRusak from "./Pages/Dashboard Pages/TabelBarangRusak";
// import BarangMasuk from "./Pages/Dashboard Pages/BarangMasuk";
// import BarangKeluar from "./Pages/Dashboard Pages/BarangKeluar";
// import BarangPinjaman from "./Pages/Dashboard Pages/BarangPinjaman";
// import BarangRusak from "./Pages/Dashboard Pages/BarangRusak";
import QrCodePage from "./Pages/Dashboard Pages/QRCode";
// import InputBarang from "./Pages/Inventaris/InputBarang";
import ItemInfo from "./Pages/Dashboard Pages/ItemInfo";
import TabelInventory from "./Pages/Inventaris/Tabel/TabelInventory";
import ProtectedRoute from "./ProtectedRoute";
import Notification from "./Pages/Dashboard Pages/Notification";
import InputInventaris from "./Pages/Inventaris/InputInventaris";
import TabelPengadaan from "./Pages/Procurement/TabelPengadaan";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Bungkus rute yang membutuhkan autentikasi dengan ProtectedRoute */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notification"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/tabel-barang-masuk"
        element={
          <ProtectedRoute>
            <TabelBarangMasuk />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/tabel-barang-keluar"
        element={
          <ProtectedRoute>
            <TabelBarangKeluar />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/tabel-barang-pinjaman"
        element={
          <ProtectedRoute>
            <TabelBarangPinjaman />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/tabel-barang-rusak"
        element={
          <ProtectedRoute>
            <TabelBarangRusak />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/tabel-inventory"
        element={
          <ProtectedRoute>
            <TabelInventory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tabel-pengadaan"
        element={
          <ProtectedRoute>
            <TabelPengadaan />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/input-barang-masuk"
        element={
          <ProtectedRoute>
            <BarangMasuk />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/input-barang-keluar"
        element={
          <ProtectedRoute>
            <BarangKeluar />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/input-barang-pinjaman"
        element={
          <ProtectedRoute>
            <BarangPinjaman />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/input-barang-rusak"
        element={
          <ProtectedRoute>
            <BarangRusak />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/input-barang"
        element={
          <ProtectedRoute>
            <InputBarang />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/input-inventaris"
        element={
          <ProtectedRoute>
            <InputInventaris />
          </ProtectedRoute>
        }
      />

      <Route
        path="/print-qr-code/:id"
        element={
          <ProtectedRoute>
            <QrCodePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/item-info/:id"
        element={
          <ProtectedRoute>
            <ItemInfo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routers;
