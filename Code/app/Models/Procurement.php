<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Procurement extends Model
{
    use HasFactory;

    // The table associated with the model
    protected $table = 'procurements';

    // The attributes that are mass assignable
    protected $fillable = [
        'procurement_no',
        'procurement_name',
        'budget_type',
        'budget_sub_type',
        'value',
        'procurement_date',
        'procurement_total',
        'created_by_user_id'
    ];

    // Relationship to the User model (created_by_user_id)
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }
    // Procurement.php (Model)
public function categories()
{
    return $this->hasMany(Category::class);
}

}
