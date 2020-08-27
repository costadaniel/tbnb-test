<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;
use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(): ProductCollection
    {
        return new ProductCollection(Product::all());
    }

    public function store(Request $request)
    {
        $product = Product::create($request ->all());

        return new ProductResource($product);
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    
}
