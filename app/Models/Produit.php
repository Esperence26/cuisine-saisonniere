<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class {
    "nom": "Tomate",
    "categorie": "Légume",
    "saison": "Été",
    "prix_unitaire": 2.5,
    "quantite_stock": 100,
    "translations": {
        "en": {
            "nom": "Tomato",
            "description": "Fresh summer tomato"
        },
        "de": {
            "nom": "Tomate",
            "description": "Frische Sommertomate"
        }
    }
}{
    "nom": "Tomate",
    "categorie": "Légume",
    "saison": "Été",
    "prix_unitaire": 2.5,
    "quantite_stock": 100,
    "translations": {
        "en": {
            "nom": "Tomato",
            "description": "Fresh summer tomato"
        },
        "de": {
            "nom": "Tomate",
            "description": "Frische Sommertomate"
        }
    }
}{
    "nom": "Tomate",
    "categorie": "Légume",
    "saison": "Été",
    "prix_unitaire": 2.5,
    "quantite_stock": 100,
    "translations": {
        "en": {
            "nom": "Tomato",
            "description": "Fresh summer tomato"
        },
        "de": {
            "nom": "Tomate",
            "description": "Frische Sommertomate"
        }
    }
}{
    "nom": "Tomate",
    "categorie": "Légume",
    "saison": "Été",
    "prix_unitaire": 2.5,
    "quantite_stock": 100,
    "translations": {
        "en": {
            "nom": "Tomato",
            "description": "Fresh summer tomato"
        },
        "de": {
            "nom": "Tomate",
            "description": "Frische Sommertomate"
        }
    }
}{
    "nom": "Salade de tomates",
    "description": "Salade fraîche d'été",
    "type": "Entrée",
    "saison": "Été",
    "temps_preparation": 15,
    "temps_cuisson": 0,
    "instructions": "1. Couper les tomates...",
    "difficulte": "Facile",
    "ingredients": [
        {
            "produit_id": 1,
            "quantite": "400",
            "unite": "g"
        }
    ],
    "translations": {
        "en": {
            "nom": "Tomato salad",
            "description": "Fresh summer salad"
        }
    }
}Produit extends Model
{
    use HasTranslations;

    protected $fillable = [
        'nom',
        'categorie',
        'saison',
        'description',
        'prix_unitaire',
        'quantite_stock',
        'provenance'
    ];

    protected $translatable = [
        'nom',
        'description'
    ];

    public function recettes()
    {
        return $this->belongsToMany(Recette::class, 'ingredients_recette')
            ->withPivot('quantite', 'unite');
    }
}
