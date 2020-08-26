<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/product', function(){
    $product = [
        "id" => 123456,
        "name" => "Vela Vermelha",
        "description" => "Uma Bela Vela Vermelha",
        "quantity" => 20,
        "value" => 7.5
    ];
    
    return $product;
});