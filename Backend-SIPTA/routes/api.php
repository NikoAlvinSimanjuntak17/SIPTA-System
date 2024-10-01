<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventoryItemController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use Laravel\Sanctum\Sanctum;

use App\Http\Controllers\ProcurementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('procurements', ProcurementController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::get('categories-with-procurement', [CategoryController::class, 'getCategoriesWithProcurement']);
    Route::get('categories/by-procurement-id/{procurement_id}', [CategoryController::class, 'getCategoriesByProcurementId']);
    Route::apiResource('sub-categories', SubCategoryController::class);
    Route::get('subcategories-with-category', [SubCategoryController::class, 'getSubCategoriesWithCategory']);
    Route::get('subcategories/by-category-id/{category_id}', [SubCategoryController::class, 'getSubCategoriesByCategoryId']);
    Route::apiResource('inventory-items', InventoryItemController::class);

});
Route::post('/login', [AuthController::class, 'auth']);

Route::get('public-post-list', [PostController::class, 'postList']);

//Input-Barang
Route::get('/input-barang', [InventoryItemController::class, 'index']);
Route::post('/input-barang', [InventoryItemController::class, 'store']);
Route::put('/input-barang/{id}', [InventoryItemController::class, 'update']);
Route::delete('/input-barang/{id}', [InventoryItemController::class, 'destroy']);
Route::get('/input-barang/{id}', [InventoryItemController::class, 'show']);
Route::get('/inventory-export', [InventoryItemController::class, 'export']);


//Pengadaan


