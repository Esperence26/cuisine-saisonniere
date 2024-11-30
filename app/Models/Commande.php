<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'user_id',
        'statut',
        'total',
        'notes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->hasMany(DetailCommande::class);
    }

    public function recettes()
    {
        return $this->belongsToMany(Recette::class, 'details_commande')
            ->withPivot('quantite', 'prix_unitaire', 'sous_total');
    }
}
