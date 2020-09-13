<?php

namespace App\Http\Controllers;

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
        return response()->json(ProductManager::getProducts(), Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->productRules);

        if (!$validator->fails())
            return response()->json(ProductManager::storeProduct($request), Response::HTTP_CREATED);
        else
            return response()->json(['Error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), $this->productRules);

        if ($validator->fails())
            return response()->json(['Error' => $validator->errors()], Response::HTTP_BAD_REQUEST);

        $product = ProductManager::getProduct($id);
        
        if (!empty($product))
            return response()->json(ProductManager::updateProduct($product, $request->all()), Response::HTTP_OK);
        else 
            return response()->json(['Error' => 'Product not found'], Response::HTTP_NOT_FOUND);
    }

    public function destroy($id)
    {
        $product = ProductManager::getProduct($id);

        if (!empty($product))
            return response()->json(ProductManager::destroyProduct($product), Response::HTTP_OK);
        else
            return response()->json(["Error"=>"Product not Found"], Response::HTTP_NOT_FOUND);
    }

    public function show($id)
    {
        $product = ProductManager::getProduct($id);

        if (!empty($product))
            return response()->json($product, Response::HTTP_OK);
        else
            return response()->json(["Error"=>"Product not Found"], Response::HTTP_NOT_FOUND);
    }

    public function showProductHistory($product)
    {
        $productHistory = ProductManager::getProductHistory($product);

        if (count($productHistory) > 0)
            return response()->json($productHistory, Response::HTTP_OK);
        else
            return response()->json(["Error"=>"Product History not Found"], Response::HTTP_NOT_FOUND);
    }

    public function bulkUpdate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            '*.id' => 'required|exists:products,id',
            '*.price' => 'numeric|min:0',
            '*.quantity' => 'integer|min:0'
        ]);

        if(!$validator->fails())
            return response()->json(ProductManager::bulkUpdate($request->all()), Response::HTTP_OK);
        else
            return response()->json(['Error' => $validator->errors()], Response::HTTP_BAD_REQUEST);
    }
}
