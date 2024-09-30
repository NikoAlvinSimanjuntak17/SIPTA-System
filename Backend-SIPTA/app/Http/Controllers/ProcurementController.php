<?php

namespace App\Http\Controllers;

use App\Models\Procurement;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class ProcurementController extends Controller
{
    // Display a listing of procurements (GET /api/procurements)
    public function index()
    {
        $procurements = Procurement::all();
        return response()->json($procurements);
    }
    
    public function getCategoriesByProcurement($id)
    {
        $categories = Category::where('procurement_id', $id)->get();
        return response()->json($categories);
    }
    // Store a newly created procurement (POST /api/procurements)
    public function store(Request $request)
    {
        $request->validate([
            'procurement_no' => 'required|string|max:255',
            'procurement_name' => 'required|string|max:255',
            'budget_type' => 'required|string|max:255',
            'budget_sub_type' => 'required|string|max:255',
            'value' => 'required|numeric',
            'procurement_date' => 'required|date',
            'procurement_total' => 'required|numeric',
        ]);

        // Automatically use the logged-in user's ID for 'created_by_user_id'
        $procurement = Procurement::create([
            'procurement_no' => $request->procurement_no,
            'procurement_name' => $request->procurement_name,
            'budget_type' => $request->budget_type,
            'budget_sub_type' => $request->budget_sub_type,
            'value' => $request->value,
            'procurement_date' => $request->procurement_date,
            'procurement_total' => $request->procurement_total,
            'created_by_user_id' => Auth::id(), // Get the ID of the logged-in user
        ]);

        return response()->json($procurement, 201);
    }

    // Display a specific procurement (GET /api/procurements/{id})
    public function show($id)
    {
        $procurement = Procurement::findOrFail($id);
        return response()->json($procurement);
    }

    // Update a specific procurement (PUT/PATCH /api/procurements/{id})
    public function update(Request $request, $id)
    {
        $procurement = Procurement::findOrFail($id);

        $request->validate([
            'procurement_no' => 'sometimes|required|string|max:255',
            'procurement_name' => 'sometimes|required|string|max:255',
            'budget_type' => 'sometimes|required|string|max:255',
            'budget_sub_type' => 'sometimes|required|string|max:255',
            'value' => 'sometimes|required|numeric',
            'procurement_date' => 'sometimes|required|date',
            'procurement_total' => 'sometimes|required|numeric',
        ]);

        $procurement->update([
            'procurement_no' => $request->procurement_no ?? $procurement->procurement_no,
            'procurement_name' => $request->procurement_name ?? $procurement->procurement_name,
            'budget_type' => $request->budget_type ?? $procurement->budget_type,
            'budget_sub_type' => $request->budget_sub_type ?? $procurement->budget_sub_type,
            'value' => $request->value ?? $procurement->value,
            'procurement_date' => $request->procurement_date ?? $procurement->procurement_date,
            'procurement_total' => $request->procurement_total ?? $procurement->procurement_total,
            'created_by_user_id' => Auth::id(), // Ensure the logged-in user is set as the updater
        ]);

        return response()->json($procurement);
    }

    // Remove a specific procurement (DELETE /api/procurements/{id})
    public function destroy($id)
    {
        $procurement = Procurement::findOrFail($id);
        $procurement->delete();
        return response()->json(null, 204);
    }
}
