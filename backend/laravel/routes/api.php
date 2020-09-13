<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('/product', 'ProductController');
Route::get('/product/history/{product}', 'ProductController@showProductHistory');
Route::post('/product/bulk', 'ProductController@bulkUpdate');