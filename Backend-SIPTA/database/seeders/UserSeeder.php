<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Menambahkan pengguna contoh ke tabel users
        $admin1 = User::create([
            'name' => 'Admin',
            'email' => 'admin1@example.com',
            'password' => Hash::make('password123'),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $admin2 = User::create([
            'name' => 'Admin2',
            'email' => 'admin2@example.com',
            'password' => Hash::make('password123'),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Tetapkan role untuk pengguna
        $roleAdmin = Role::where('name', 'user')->first(); // Sesuaikan dengan role yang tersedia
        if ($roleAdmin) {
            $admin1->addRole($roleAdmin);
            $admin2->addRole($roleAdmin);
        }
    }
}
