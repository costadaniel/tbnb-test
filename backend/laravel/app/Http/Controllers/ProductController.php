<?php

namespace App\Http\Controllers;

use App\Product;
use App\Managers\ProductManager;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class ProductController extends Controller
{
    public $productRules = [
        'name' => 'required',
        'description' => 'required',
        'price' => 'required|gte:0|numeric',
        'quantity' => 'required|gte:0|integer'
    ];

    public function index()
    {
        $productManager = new ProductManager();
        return response()->json($productManager->getProducts(), Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->productRules);

        if (!$validator->fails()) { 
            $productManager = new ProductManager();
            return response()->json($productManager->storeProduct($request), Response::HTTP_CREATED);
        }
        else {
            return response()->json(['Error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), $this->productRules);

        if ($validator->fails()) {
            return response()->json(['Error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        }
        $updatedProduct = (object) $request;
        
        $productManager = new ProductManager();

        return response()->json($productManager->updateProduct($product, $updatedProduct), Response::HTTP_OK);

        // if (!$validator->fails()) {
        //     $updatedProduct = (object) $request;

        //     return response()->json($productManager->updateProduct($product, $updatedProduct), Response::HTTP_OK);
        // }
        // else {
        //     if(empty($product))
        //         return response()->json(['Error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        //     else
        //         return response()->json(['Error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
        // }
    }

    public function destroy($id)
    {
        $productManager = new ProductManager();
        $product = $productManager->getProduct($id);

        if (!empty($product))
            return response()->json($productManager->destroyProduct($product), Response::HTTP_OK);
        else
            return response()->json(["Error"=>"Product not Found"], Response::HTTP_NOT_FOUND);
    }

    public function show($id)
    {
        $productManager = new ProductManager();
        $product = $productManager->getProduct($id);

        if (!empty($product))
            return response()->json($product, Response::HTTP_OK);
        else
            return response()->json(["Error"=>"Product not Found"], Response::HTTP_NOT_FOUND);
    }

    public function showProductHistory(Product $product)
    { 
        return response()->json($product->history, Response::HTTP_OK);
        //$productManager = new ProductManager();
        //$product = $productManager->getProductHistory($id);

        // if (count($productHistory) > 0)
        //     return response()->json($productHistory, Response::HTTP_OK);
        // else
        //     return response()->json(["Error"=>"Product History not Found"], Response::HTTP_NOT_FOUND);
    }

    public function bulkUpdate(Request $request)
    {
        foreach($request->data as $requestProduct)
        {
            $updatedProduct = (object) $requestProduct;

            $product = Product::findOrFail($updatedProduct->id);

            $updateArray = [
                'name'        => $updatedProduct->name,
                'description' => $updatedProduct->description,
                'price'       => $updatedProduct->price,
                'quantity'    => $updatedProduct->quantity,
            ];

            if ($product->update($updateArray)) {
                ProductHistory::create([
                    'product_id' => $updatedProduct->id,
                    'amount' => $updatedProduct->quantity,
                ]);
            }
        }

        return $request;
    }
}
