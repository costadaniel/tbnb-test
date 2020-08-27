<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        'name' => $faker->randomElement($array = array ('Camisa','Calça','Boné')),
        'description' => $faker->sentence($nbWords = 10, $variableNbWords = true),
        'avaible' => true
    ];
});
