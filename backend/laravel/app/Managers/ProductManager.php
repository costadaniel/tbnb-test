<?php

namespace App\Managers;

use App\Product;
use App\ProductHistory;

class ProductManager
{
    public static function getProducts()
    {
        return Product::All();
    }

    public static function storeProduct($request)
    {
        $createdProduct = Product::create($request);
        
        ProductHistory::create([
            'product_id' => $createdProduct->id,
            'amount' => $createdProduct->quantity,
        ]);

        return $createdProduct;
    }

    public static function getProduct($id)
    {
        return Product::find($id);
    }

    public static function getProductHistory($id)
    {
        $product = Product::find($id);

        if(!empty($product))
            return $product->history;
        else
            return [];
    }

    public static function updateProduct(Product $product, $updatedProduct)
    {
        if (array_key_exists('quantity', $updatedProduct)) {
            if ($product->quantity != $updatedProduct['quantity']) {
                ProductHistory::create([
                    'product_id' => $product->id,
                    'amount' => $updatedProduct['quantity']
                ]);
            }
        }

        $product->update($updatedProduct);

        return $product;
    }

    public static function destroyProduct(Product $product)
    {
        $product->delete();
        return $product;
    }

    public static function bulkUpdate($products)
    {
        $updatedProducts = [];

        foreach($products as $updatedProduct) {
            $product = Product::find($updatedProduct['id']);
            $product = self::updateProduct($product, $updatedProduct);

            array_push($updatedProducts, $product);
        }

        return $updatedProducts;
    }
}

