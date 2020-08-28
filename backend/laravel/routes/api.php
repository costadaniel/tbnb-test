<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('/product', 'ProductController');
Route::get('/product/history/{id}', 'ProductController@showProductHistory');
Route::post('/product/update-number', 'ProductController@updateProductNumber');