<?php

namespace Tests\Unit;

use App\Product;
use Tests\TestCase;

class ProductTest extends TestCase
{
    public function testIndex() {
        $response = $this->get('/api/product');

        $response->assertStatus(200);
    }

    public function testStore() {
        $response = $this->postJson('/api/product', [
            'name' => 'Test Product',
            'description' => 'Test Product Description',
            'price' => 9.99,
            'quantity' => 22
        ]);

        $id = json_decode($response->getContent())->id;
        Product::destroy($id);

        $response->assertStatus(201);
    }

    public function testDestroy() {
        $product = Product::create([
            'name' => 'Test Product',
            'description' => 'Test Product Description',
            'price' => 9.99,
            'quantity' => 22
        ]);

        $response = $this->deleteJson("/api/product/{$product->id}");
        $response->assertStatus(200);
        $this->assertDeleted($product);
                 
    }

    public function testUpdate() {
        $product = Product::create([
            'name' => 'Test Product',
            'description' => 'Test Product Description',
            'price' => 9.99,
            'quantity' => 22
        ]);

        $response = $this->putJson("/api/product/{$product->id}", [
            'name' => 'Updated Product',
            'description' => 'Updated Product Description',
            'price' => 0,
            'quantity' => 22
        ]);

        $response->assertStatus(200)
                 ->assertJson([
                    'name' => 'Updated Product',
                    'description' => 'Updated Product Description',
                    'price' => 0,
                 ]);

        $product->delete();
    }

    public function testBulkUpdate() {
        $product1 = Product::create([
            'name' => 'Test Product 1',
            'description' => 'Test Product 1 Description',
            'price' => 9.99,
            'quantity' => 0
        ]);

        $product2 = Product::create([
            'name' => 'Test Product 1',
            'description' => 'Test Product 1 Description',
            'price' => 9.99,
            'quantity' => 0
        ]);

        $response = $this->postJson("/api/product/bulk", [
            ['id' => $product1->id,
             'price' => 0,
             'quantity' => 10],
            ['id' => $product2->id,
             'quantity' => 10]
        ]);

        $product1->delete();
        $product2->delete();

        $response->assertStatus(200);
    }
}
