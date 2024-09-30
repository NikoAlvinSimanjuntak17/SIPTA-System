<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubCategoryController extends Controller
{
    // Get all sub-categories by category ID
    public function index()
    {
        $subcategories = SubCategory::all();
        return response()->json($subcategories);
    }
    public function getSubCategoriesWithCategory()
    {
        // Ambil semua kategori beserta procurement yang terkait
        $subcategories = SubCategory::with('category')->get();

        // Loop untuk menampilkan nama procurement terkait setiap kategori (misalnya, untuk debugging)
        foreach ($subcategories as $subcategory) {
            echo $subcategory->category->category_name; // Pastikan nama kolom sesuai dengan yang ada di tabel procurement
        }

        // Mengembalikan data dalam bentuk JSON sebagai respon API
        return response()->json($subcategories);
    }
    public function getSubCategoriesByCategoryId($category_id)
    {
        $validator = Validator::make(['category_id' => $category_id], [
            'category_id' => 'required|exists:categories,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        // Get categories associated with the procurement
        $subcategories = SubCategory::where('category_id', $category_id)->get();
        return response()->json($subcategories);
    }

    // Get a specific sub-category by ID
    public function show($id)
    {
        $subCategory = SubCategory::find($id);

        return response()->json($subCategory);
    }

    // Create a new sub-category
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'sub_category_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $subCategory = SubCategory::create([
            'category_id' => $request->category_id,
            'sub_category_name' => $request->sub_category_name
        ]);

        return response()->json($subCategory, 201);
    }

    // Update a sub-category
    public function update(Request $request, $id)
    {
        $subCategory = SubCategory::find($id);

        if (!$subCategory) {
            return response()->json(['error' => 'SubCategory not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'sub_category_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $subCategory->update([
            'sub_category_name' => $request->sub_category_name
        ]);

        return response()->json($subCategory);
    }

    // Delete a sub-category
    public function destroy($id)
    {
        $subCategory = SubCategory::find($id);

        if (!$subCategory) {
            return response()->json(['error' => 'SubCategory not found'], 404);
        }

        $subCategory->delete();

        return response()->json(['message' => 'SubCategory deleted successfully']);
    }
}
