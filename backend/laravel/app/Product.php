<?php

namespace App;

use App\ProductHistory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'price', 'quantity'
    ];

    public function history()
    {
        return $this->hasMany(ProductHistory::class);
    }
}
