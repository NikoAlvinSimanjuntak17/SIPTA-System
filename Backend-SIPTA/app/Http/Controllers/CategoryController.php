<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Procurement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    // Display a listing of categories (GET /api/categories)
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }
    public function getCategoriesWithProcurement()
    {
        // Ambil semua kategori beserta procurement yang terkait
        $categories = Category::with('procurement')->get();

        // Loop untuk menampilkan nama procurement terkait setiap kategori (misalnya, untuk debugging)
        foreach ($categories as $category) {
            echo $category->procurement->procurement_name; // Pastikan nama kolom sesuai dengan yang ada di tabel procurement
        }

        // Mengembalikan data dalam bentuk JSON sebagai respon API
        return response()->json($categories);
    }

    // Store a newly created category (POST /api/categories)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'procurement_id' => 'required|exists:procurements,id',
            'category_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    // Display a specific category (GET /api/categories/{id})
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category);
    }

    public function getCategoriesByProcurementId($procurement_id)
{
    $validator = Validator::make(['procurement_id' => $procurement_id], [
        'procurement_id' => 'required|exists:procurements,id',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 400);
    }

    // Get categories associated with the procurement
    $categories = Category::where('procurement_id', $procurement_id)->get();
    return response()->json($categories);
}


    // Update a specific category (PUT/PATCH /api/categories/{id})
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'procurement_id' => 'sometimes|required|exists:procurements,id',
            'category_name' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $category->update($request->all());
        return response()->json($category);
    }

    // Remove a specific category (DELETE /api/categories/{id})
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
