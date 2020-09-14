<?php

namespace Tests\Unit;

use App\Product;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;


class ProductTest extends TestCase
{
    use DatabaseTransactions;

    public function testIndex() {
        $product = factory(Product::class, 10)->create();
        $response = $this->get('/api/product');

        $response
            ->assertStatus(200)
            ->assertJsonCount(10);
    }

    public function testShowFail() {
        $response = $this->get('/api/product/10');

        $response->assertStatus(404);
    }

    public function testStore() {
        $storeData = [
            'name' => 'Test Product',
            'description' => 'Test Product Description',
            'price' => 9.99,
            'quantity' => 22
        ];

        $response = $this->postJson('/api/product', $storeData);

        $response
            ->assertStatus(201)
            ->assertJson($storeData);
    }

    public function testDestroy() {
        $product = factory(Product::class)->create();
        $this->assertDatabaseHas('products', ["id"=>$product->id]);
        
        $response = $this->deleteJson("/api/product/{$product->id}");
        $response->assertStatus(200);

        $this->assertDeleted($product);
    }

    public function testUpdate() {
        $product = factory(Product::class)->create();

        $updatedData = [
            'name' => 'Updated Product',
            'description' => 'Updated Product Description',
            'price' => 0,
            'quantity' => 22
        ];

        $response = $this->putJson("/api/product/{$product->id}", $updatedData);

        $response->assertStatus(200)
                 ->assertJson($updatedData);
    }

    public function testBulkUpdate() {
        $product1 = factory(Product::class)->create();
        $product2 = factory(Product::class)->create();

        $response = $this->postJson("/api/product/bulk", [
            ['id' => $product1->id,
             'price' => 0,
             'quantity' => 10],
            ['id' => $product2->id,
             'quantity' => 10]
        ]);

        $response->assertStatus(200);
    }
}
