<?php

namespace App\Managers;

use App\Product;
use App\ProductHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductManager
{
    public function getProducts()
    {
        return Product::All();
    }

    public function storeProduct(Request $request)
    {
        $createdProduct = Product::create($request->all());
        
        ProductHistory::create([
            'product_id' => $createdProduct->id,
            'amount' => $createdProduct->quantity,
        ]);

        return $createdProduct;
    }

    public function getProduct($id)
    {
        return Product::find($id);
    }

    public function getProductHistory($id)
    {
        return DB::table('product_histories')->where('product_id', $id)->get();
    }

    public function updateProduct(Product $product, $updatedProduct)
    {
        $product->update([
            'name'        => $updatedProduct->name,
            'description' => $updatedProduct->description,
            'price'       => $updatedProduct->price,
            'quantity'    => $updatedProduct->quantity,
        ]);

        return $product;
    }

    public function destroyProduct(Product $product)
    {
        $product->delete();
        return $product;
    }
}

