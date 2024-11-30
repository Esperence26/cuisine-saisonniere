<?php

namespace App\Models;

use App\Traits\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class Recette extends Model
{
    use HasTranslations;

    protected $fillable = [
        'nom',
        'description',
        'type',
        'saison',
        'temps_preparation',
        'temps_cuisson',
        'instructions',
        'difficulte',
        'image_url'
    ];

    protected $translatable = [
        'nom',
        'description',
        'instructions'
    ];

    public function ingredients()
    {
        return $this->belongsToMany(Produit::class, 'ingredients_recette')
            ->withPivot('quantite', 'unite');
    }

    public function commandes()
    {
        return $this->hasMany(DetailCommande::class);
    }
}
