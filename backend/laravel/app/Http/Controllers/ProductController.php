<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{

    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        foreach($request->data as $product)
        {
            $createdProduct = Product::create($product);
            ProductHistory::create([
                'product_id' => $createdProduct->id,
                'amount' => $createdProduct->quantity,
            ]);
        }
        
        return $request;
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function showProductHistory($id)
    {
        return DB::table('product_histories')->where('product_id', $id)->get();
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        ProductHistory::create([
            'product_id' => $product->id,
            'amount' => $request->quantity,
        ]);

        return $product->update($request->all());
    }

    public function updateProductNumber(Request $request)
    {
        foreach($request->data as $requestProduct)
        {
            $updatedProduct = (object) $requestProduct;

            $product = Product::findOrFail($updatedProduct->id);
            $product->update([
                'name'        => $updatedProduct->name,
                'description' => $updatedProduct->description,
                'price'       => $updatedProduct->price,
                'quantity'    => $updatedProduct->quantity,
            ]);

            ProductHistory::create([
                'product_id' => $updatedProduct->id,
                'amount' => $updatedProduct->amount,
            ]);
        }

        return $request;
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        return $product->delete();
    }
}
