<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'sub_category_id',
        'category_id',
        'procurement_id',
        'item_name',
        'quality',
        'quantity',
        'status',
        'serial_number',
        'item_image',
        'unit',
        'work_unit',
        'location',
        'created_by_user_id',
    ];

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function procurement()
    {
        return $this->belongsTo(Procurement::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
}
