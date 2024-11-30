<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'title',
        'title_translations',
        'description',
        'description_translations',
        'ingredients',
        'ingredients_translations',
        'instructions',
        'instructions_translations',
        'prep_time',
        'cook_time',
        'servings',
        'difficulty',
        'image',
        'is_seasonal',
        'seasons'
    ];

    protected $casts = [
        'title_translations' => 'array',
        'description_translations' => 'array',
        'ingredients_translations' => 'array',
        'instructions_translations' => 'array',
        'seasons' => 'array',
        'is_seasonal' => 'boolean',
        'prep_time' => 'integer',
        'cook_time' => 'integer',
        'servings' => 'integer'
    ];

    public function getTranslation(string $field, ?string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        $translations = $this->{$field . '_translations'} ?? [];
        
        return $translations[$locale] ?? $this->{$field};
    }

    public function getTitle(?string $locale = null): string
    {
        return $this->getTranslation('title', $locale);
    }

    public function getDescription(?string $locale = null): string
    {
        return $this->getTranslation('description', $locale);
    }

    public function getIngredients(?string $locale = null): string
    {
        return $this->getTranslation('ingredients', $locale);
    }

    public function getInstructions(?string $locale = null): string
    {
        return $this->getTranslation('instructions', $locale);
    }

    public function getTotalTime(): int
    {
        return ($this->prep_time ?? 0) + ($this->cook_time ?? 0);
    }
}
