-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 30 Sep 2024 pada 02.48
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spmt_it_inventory`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_id` bigint UNSIGNED NOT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `procurement_id`, `category_name`, `created_at`, `updated_at`) VALUES
(1, 1, 'Personal Computer', '2024-09-10 21:37:45', '2024-09-10 21:37:45'),
(2, 1, 'Laptop', '2024-09-10 21:38:06', '2024-09-10 21:38:06'),
(3, 1, 'Kabel', '2024-09-10 21:38:48', '2024-09-10 21:38:48'),
(4, 2, 'Kabel', '2024-09-25 00:04:03', '2024-09-25 00:04:03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `damages`
--

CREATE TABLE `damages` (
  `id` bigint UNSIGNED NOT NULL,
  `inventory_item_id` bigint UNSIGNED NOT NULL,
  `damage_date` date NOT NULL,
  `damage_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `repair_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'damage',
  `resolved_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `inventory_items`
--

CREATE TABLE `inventory_items` (
  `id` bigint UNSIGNED NOT NULL,
  `sub_category_id` bigint UNSIGNED NOT NULL,
  `item_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `status` enum('available','loan','taken out','damage') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `serial_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `work_unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `inventory_item_history`
--

CREATE TABLE `inventory_item_history` (
  `id` bigint UNSIGNED NOT NULL,
  `inventory_item_id` bigint UNSIGNED NOT NULL,
  `action_type` enum('loan','pull out','damage') COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_date` date NOT NULL,
  `details` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `loans`
--

CREATE TABLE `loans` (
  `id` bigint UNSIGNED NOT NULL,
  `inventory_item_id` bigint UNSIGNED NOT NULL,
  `borrower_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `borrower_division` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loan_start_date` date NOT NULL,
  `loan_end_date` date NOT NULL,
  `loan_proof` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'loan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_09_04_070134_create_sub_categories_table', 1),
(2, '2024_09_04_070105_create_categories_table', 2),
(3, '2024_09_04_070003_create_pengadaans_table', 3),
(4, '2014_10_12_000000_create_users_table', 4),
(5, '2014_10_12_100000_create_password_reset_tokens_table', 4),
(6, '2019_08_19_000000_create_failed_jobs_table', 4),
(7, '2019_12_14_000001_create_personal_access_tokens_table', 4),
(8, '2024_08_12_012422_create_barang_masuk_table', 4),
(9, '2024_08_14_033806_create_barang_keluar_table', 4),
(10, '2024_08_14_041557_create_barang_pinjaman_table', 4),
(11, '2024_08_14_043859_create_barang_rusak_table', 4),
(12, '2024_08_16_031658_create_inventory_items_table', 4),
(13, '2024_08_23_033010_add_tujuan_keluar_to_inventory_item_table', 4),
(14, '2024_09_03_083729_laratrust_setup_tables', 4),
(15, '2024_09_04_070500_create_peminjaman_table', 4),
(16, '2024_09_04_070524_create_pengeluaran_table', 4),
(17, '2024_09_04_070542_create_kerusakan_table', 4),
(18, '2024_09_10_025100_create_procurements_table', 5),
(19, '2024_09_10_025114_create_categories_table', 5),
(20, '2024_09_10_025123_create_sub_categories_table', 5),
(21, '2024_09_10_025128_create_inventory_items_table', 5),
(22, '2024_09_10_025134_create_loans_table', 5),
(23, '2024_09_10_025140_create_pull_outs_table', 5),
(24, '2024_09_10_025145_create_damages_table', 5),
(25, '2024_09_10_025150_create_inventory_item_history_table', 5),
(26, '2024_09_10_042340_add_status_to_loans_table', 6),
(27, '2024_09_10_043558_add_status_and_returned_date_to_pull_outs_table', 7),
(28, '2024_09_10_043613_add_status_and_resolved_date_to_damages_table', 7);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'users-create', 'Create Users', 'Create Users', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(2, 'users-read', 'Read Users', 'Read Users', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(3, 'users-update', 'Update Users', 'Update Users', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(4, 'users-delete', 'Delete Users', 'Delete Users', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(5, 'payments-create', 'Create Payments', 'Create Payments', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(6, 'payments-read', 'Read Payments', 'Read Payments', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(7, 'payments-update', 'Update Payments', 'Update Payments', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(8, 'payments-delete', 'Delete Payments', 'Delete Payments', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(9, 'profile-read', 'Read Profile', 'Read Profile', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(10, 'profile-update', 'Update Profile', 'Update Profile', '2024-09-04 00:21:11', '2024-09-04 00:21:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(9, 2),
(10, 2),
(9, 3),
(10, 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `permission_user`
--

CREATE TABLE `permission_user` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `user_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'Personal Access Token', '1588408b6b30d90eb400a3c2ac7bfd1af828397eb6572e328c4ca70882556164', '[\"*\"]', NULL, NULL, '2024-09-10 19:35:33', '2024-09-10 19:35:33'),
(2, 'App\\Models\\User', 1, 'Personal Access Token', '09ea17c7a843f5f16c98a112f576214e0d54aa4585d4e488b896eeb2b6991c59', '[\"*\"]', '2024-09-25 01:31:25', NULL, '2024-09-10 19:57:57', '2024-09-25 01:31:25'),
(3, 'App\\Models\\User', 1, 'Personal Access Token', 'fb47de400eed3f478da36923b94d259ce4436bdb35c1afdea53049d318639061', '[\"*\"]', NULL, NULL, '2024-09-10 20:43:21', '2024-09-10 20:43:21'),
(4, 'App\\Models\\User', 1, 'Personal Access Token', 'ef84c6638711dc705d74aab493614868e96aa11a2a8ee997846a39ed52fec8c8', '[\"*\"]', NULL, NULL, '2024-09-10 20:45:02', '2024-09-10 20:45:02'),
(5, 'App\\Models\\User', 1, 'Personal Access Token', 'f643bc772313a2322cf62d57c60f30aab9a707e5d31a1b509afd7be95fe9fbb4', '[\"*\"]', NULL, NULL, '2024-09-11 18:19:45', '2024-09-11 18:19:45'),
(6, 'App\\Models\\User', 1, 'Personal Access Token', 'f0cb5dd30ebb1bc3ebc88f38e8c3ff86482dd8fc7e0d124d201beee009a3a17f', '[\"*\"]', '2024-09-11 20:03:54', NULL, '2024-09-11 19:30:27', '2024-09-11 20:03:54'),
(7, 'App\\Models\\User', 1, 'Personal Access Token', '42c2af4371af237f6190dd38f059ebcade9a64c7e653ee8735cdacd0cc752f7c', '[\"*\"]', NULL, NULL, '2024-09-11 23:37:15', '2024-09-11 23:37:15'),
(8, 'App\\Models\\User', 1, 'Personal Access Token', '6ca05c1e46800067c1088c1b2d43abf9fe54daf263d8634fc81d347c47e8f2a4', '[\"*\"]', NULL, NULL, '2024-09-12 19:04:46', '2024-09-12 19:04:46'),
(9, 'App\\Models\\User', 1, 'Personal Access Token', '0498daf23f80de24243367a0db1cb8d7951d6e6d86f4f9e9dd0643b0bdb0b5d2', '[\"*\"]', NULL, NULL, '2024-09-13 01:47:05', '2024-09-13 01:47:05'),
(10, 'App\\Models\\User', 1, 'Personal Access Token', 'a57062869ec8a36fced19d99ac5da968cab3c116007db837577a5d30044e1c72', '[\"*\"]', NULL, NULL, '2024-09-13 02:22:30', '2024-09-13 02:22:30'),
(11, 'App\\Models\\User', 1, 'Personal Access Token', '04005ecbc396062e03661f41eed4a40cd4fa5d8fc887e1470981f40cafe1e4b3', '[\"*\"]', NULL, NULL, '2024-09-16 21:50:04', '2024-09-16 21:50:04'),
(12, 'App\\Models\\User', 1, 'Personal Access Token', '2b9eea9a20371959351bedb71bcdac6dadff41052435265d4f052d847881d946', '[\"*\"]', NULL, NULL, '2024-09-17 20:27:44', '2024-09-17 20:27:44'),
(13, 'App\\Models\\User', 1, 'Personal Access Token', '0a59bc18dd736a510ef5753f8af4b6b1ab7efbf6c34ffc1e60ae6c4f4b8f1739', '[\"*\"]', NULL, NULL, '2024-09-24 01:21:35', '2024-09-24 01:21:35'),
(14, 'App\\Models\\User', 1, 'Personal Access Token', 'bf0ed8bdccec14446dec4709754cabff67257320ca23df9833c9ed2a31cd7178', '[\"*\"]', '2024-09-25 00:57:28', NULL, '2024-09-24 01:30:34', '2024-09-25 00:57:28'),
(15, 'App\\Models\\User', 1, 'Personal Access Token', 'ceacff8932452aa3b13c8c284e0c90517de3cf3001acfc1125319e2210bc3fa1', '[\"*\"]', NULL, NULL, '2024-09-24 19:15:10', '2024-09-24 19:15:10'),
(16, 'App\\Models\\User', 1, 'Personal Access Token', '63c93c52c78b87fab6bb9e7c0b05af0832be8c2477489197d3ae57bd2197af22', '[\"*\"]', NULL, NULL, '2024-09-24 20:24:12', '2024-09-24 20:24:12'),
(17, 'App\\Models\\User', 1, 'Personal Access Token', 'ab72a1ef6f94064307b3845271fc7b0f6dcd867010b33a2bbf17def58d4d787b', '[\"*\"]', '2024-09-25 01:05:29', NULL, '2024-09-25 00:03:00', '2024-09-25 01:05:29'),
(18, 'App\\Models\\User', 1, 'Personal Access Token', '9d4d305ab4787497829445d91506d4ab6abf67f191e474b15753f1f22bd4bdcb', '[\"*\"]', NULL, NULL, '2024-09-25 19:33:35', '2024-09-25 19:33:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `procurements`
--

CREATE TABLE `procurements` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `procurement_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `budget_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `budget_sub_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(15,2) NOT NULL,
  `procurement_date` date NOT NULL,
  `procurement_total` decimal(15,2) NOT NULL,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `procurements`
--

INSERT INTO `procurements` (`id`, `procurement_no`, `procurement_name`, `budget_type`, `budget_sub_type`, `value`, `procurement_date`, `procurement_total`, `created_by_user_id`, `created_at`, `updated_at`) VALUES
(1, 'PROC-003', 'Pengadaan Bulan Januari', 'Capex', 'Beban Pemeliharaan', 75000000.00, '2024-09-11', 50.00, 1, '2024-09-10 19:58:58', '2024-09-10 20:03:48'),
(2, 'PROC-004', 'Pengadaan Bulan February', 'Capex', 'Beban Pengadaan', 75000000.00, '2024-09-11', 50.00, 1, '2024-09-11 20:03:54', '2024-09-11 20:03:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pull_outs`
--

CREATE TABLE `pull_outs` (
  `id` bigint UNSIGNED NOT NULL,
  `inventory_item_id` bigint UNSIGNED NOT NULL,
  `destination` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pull_out_proof` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_by_user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pull_out',
  `returned_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'superadmin', 'Superadmin', 'Superadmin', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(2, 'admin', 'Admin', 'Admin', '2024-09-04 00:21:11', '2024-09-04 00:21:11'),
(3, 'user', 'User', 'User', '2024-09-04 00:21:11', '2024-09-04 00:21:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `role_user`
--

CREATE TABLE `role_user` (
  `role_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `user_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `role_user`
--

INSERT INTO `role_user` (`role_id`, `user_id`, `user_type`) VALUES
(3, 1, 'App\\Models\\User'),
(3, 2, 'App\\Models\\User');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `sub_category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `category_id`, `sub_category_name`, `created_at`, `updated_at`) VALUES
(1, 2, 'Lenovo i5', '2024-09-11 01:04:28', '2024-09-11 01:04:28'),
(2, 2, 'Asus i5', '2024-09-11 01:05:10', '2024-09-11 01:05:10'),
(3, 2, 'Lenovo Thinkpad', '2024-09-11 01:05:32', '2024-09-11 01:05:32');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_img` text COLLATE utf8mb4_unicode_ci,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `employee_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `user_img`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `employee_number`) VALUES
(1, 'Admin', 'admin1@example.com', NULL, NULL, NULL, '$2y$12$M/73CihvjNK4BjBGQ4BsHeR9Q9pMIKwjOfnlFq0PtFXvlMkFCqhIi', '0anmlSytg1', '2024-09-04 00:21:18', '2024-09-04 00:21:18', ''),
(2, 'Admin2', 'admin2@example.com', NULL, NULL, NULL, '$2y$12$5WABG8JTE7O8geyDO1hbzuowqbiSgSiV5gGZeJOPUsaoPyy2JzIjy', 'QiKh6MYaKa', '2024-09-04 00:21:18', '2024-09-04 00:21:18', '');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categories_procurement_id_foreign` (`procurement_id`);

--
-- Indeks untuk tabel `damages`
--
ALTER TABLE `damages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `damages_inventory_item_id_foreign` (`inventory_item_id`),
  ADD KEY `damages_created_by_user_id_foreign` (`created_by_user_id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_items_sub_category_id_foreign` (`sub_category_id`),
  ADD KEY `inventory_items_created_by_user_id_foreign` (`created_by_user_id`);

--
-- Indeks untuk tabel `inventory_item_history`
--
ALTER TABLE `inventory_item_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_item_history_inventory_item_id_foreign` (`inventory_item_id`);

--
-- Indeks untuk tabel `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loans_inventory_item_id_foreign` (`inventory_item_id`),
  ADD KEY `loans_created_by_user_id_foreign` (`created_by_user_id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indeks untuk tabel `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indeks untuk tabel `permission_user`
--
ALTER TABLE `permission_user`
  ADD PRIMARY KEY (`user_id`,`permission_id`,`user_type`),
  ADD KEY `permission_user_permission_id_foreign` (`permission_id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `procurements`
--
ALTER TABLE `procurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procurements_created_by_user_id_foreign` (`created_by_user_id`);

--
-- Indeks untuk tabel `pull_outs`
--
ALTER TABLE `pull_outs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pull_outs_inventory_item_id_foreign` (`inventory_item_id`),
  ADD KEY `pull_outs_created_by_user_id_foreign` (`created_by_user_id`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indeks untuk tabel `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`,`user_type`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indeks untuk tabel `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_categories_category_id_foreign` (`category_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `damages`
--
ALTER TABLE `damages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `inventory_items`
--
ALTER TABLE `inventory_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `inventory_item_history`
--
ALTER TABLE `inventory_item_history`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `loans`
--
ALTER TABLE `loans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT untuk tabel `procurements`
--
ALTER TABLE `procurements`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `pull_outs`
--
ALTER TABLE `pull_outs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_procurement_id_foreign` FOREIGN KEY (`procurement_id`) REFERENCES `procurements` (`id`);

--
-- Ketidakleluasaan untuk tabel `damages`
--
ALTER TABLE `damages`
  ADD CONSTRAINT `damages_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `damages_inventory_item_id_foreign` FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items` (`id`);

--
-- Ketidakleluasaan untuk tabel `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD CONSTRAINT `inventory_items_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `inventory_items_sub_category_id_foreign` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`);

--
-- Ketidakleluasaan untuk tabel `inventory_item_history`
--
ALTER TABLE `inventory_item_history`
  ADD CONSTRAINT `inventory_item_history_inventory_item_id_foreign` FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items` (`id`);

--
-- Ketidakleluasaan untuk tabel `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `loans_inventory_item_id_foreign` FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items` (`id`);

--
-- Ketidakleluasaan untuk tabel `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `permission_user`
--
ALTER TABLE `permission_user`
  ADD CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `procurements`
--
ALTER TABLE `procurements`
  ADD CONSTRAINT `procurements_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`);

--
-- Ketidakleluasaan untuk tabel `pull_outs`
--
ALTER TABLE `pull_outs`
  ADD CONSTRAINT `pull_outs_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `pull_outs_inventory_item_id_foreign` FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items` (`id`);

--
-- Ketidakleluasaan untuk tabel `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
