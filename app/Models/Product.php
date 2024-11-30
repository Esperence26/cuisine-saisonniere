<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'name_translations',
        'description',
        'description_translations',
        'price',
        'image',
        'is_seasonal',
        'seasons',
        'stock'
    ];

    protected $casts = [
        'name_translations' => 'array',
        'description_translations' => 'array',
        'seasons' => 'array',
        'is_seasonal' => 'boolean',
        'price' => 'decimal:2',
        'stock' => 'integer'
    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function getTranslation(string $field, ?string $locale = null): string
    {
        $locale = $locale ?? app()->getLocale();
        $translations = $this->{$field . '_translations'} ?? [];
        
        return $translations[$locale] ?? $this->{$field};
    }

    public function getName(?string $locale = null): string
    {
        return $this->getTranslation('name', $locale);
    }

    public function getDescription(?string $locale = null): string
    {
        return $this->getTranslation('description', $locale);
    }
}
