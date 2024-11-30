<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->json('title_translations')->nullable();
            $table->text('description');
            $table->json('description_translations')->nullable();
            $table->text('ingredients');
            $table->json('ingredients_translations')->nullable();
            $table->text('instructions');
            $table->json('instructions_translations')->nullable();
            $table->integer('prep_time')->nullable(); // en minutes
            $table->integer('cook_time')->nullable(); // en minutes
            $table->integer('servings')->nullable();
            $table->string('difficulty')->default('medium');
            $table->string('image')->nullable();
            $table->boolean('is_seasonal')->default(true);
            $table->json('seasons')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
