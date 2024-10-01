<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InventoryItemController extends Controller
{
    public function index()
    {
        return InventoryItem::with(['subCategory', 'category', 'procurement', 'creator'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'sub_category_id' => 'required|exists:sub_categories,id',
            'category_id' => 'required|exists:categories,id',
            'procurement_id' => 'required|exists:procurements,id',
            'item_name' => 'required|string|max:255',
            'quality' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'status' => 'required|in:available,loan,taken out,damage',
            'serial_number' => 'required|string|max:255',
            'item_image' => 'nullable|image|max:2048', // Validate as image
            'unit' => 'required|string|max:255',
            'work_unit' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'created_by_user_id' => 'required|exists:users,id',
        ]);
    
        // Handle the uploaded image
        $imagePath = null;
        if ($request->hasFile('item_image')) {
            // Store the image in the 'public/inventory_images' folder and get its path
            $imagePath = $request->file('item_image')->store('inventory_images', 'public');
        }
    
        // Create the inventory item, including the image path if it exists
        $inventoryItem = InventoryItem::create(array_merge($request->all(), ['item_image' => $imagePath]));
    
        return response()->json($inventoryItem, 201);
    }

    public function show($id)
    {
        return InventoryItem::with(['subCategory', 'category', 'procurement', 'creator'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $inventoryItem = InventoryItem::findOrFail($id);
        
        $request->validate([
            'sub_category_id' => 'sometimes|required|exists:sub_categories,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'procurement_id' => 'sometimes|required|exists:procurements,id',
            'item_name' => 'sometimes|required|string|max:255',
            'quality' => 'sometimes|required|string|max:255',
            'quantity' => 'sometimes|required|integer',
            'status' => 'sometimes|required|in:available,loan,taken out,damage',
            'serial_number' => 'sometimes|required|string|max:255',
            'item_image' => 'sometimes|nullable|string|max:255',
            'unit' => 'sometimes|required|string|max:255',
            'work_unit' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'created_by_user_id' => 'sometimes|required|exists:users,id',
        ]);

        $inventoryItem->update($request->all());

        return response()->json($inventoryItem);
    }

    public function destroy($id)
    {
        $inventoryItem = InventoryItem::findOrFail($id);
        $inventoryItem->delete();

        return response()->json(null, 204);
    }
}
