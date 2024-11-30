<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientsRecetteTable extends Migration
{
    public function up()
    {
        Schema::create('ingredients_recette', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recette_id')->constrained('recettes')->onDelete('cascade');
            $table->foreignId('produit_id')->constrained('produits')->onDelete('cascade');
            $table->string('quantite');
            $table->string('unite');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ingredients_recette');
    }
}
