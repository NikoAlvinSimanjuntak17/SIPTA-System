<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // The table associated with the model                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    protected $table = 'categories';

    // The attributes that are mass assignable
    protected $fillable = [
        'procurement_id',
        'category_name',
    ];

    // Define the relationship to Procurement
    public function procurement()
    {
        return $this->belongsTo(Procurement::class,  'procurement_id');
    }
}
