<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetailCommande extends Model
{
    protected $table = 'details_commande';

    protected $fillable = [
        'commande_id',
        'recette_id',
        'quantite',
        'prix_unitaire',
        'sous_total'
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function recette()
    {
        return $this->belongsTo(Recette::class);
    }
}
