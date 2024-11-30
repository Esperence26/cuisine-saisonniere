<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\DetailCommande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    public function index(Request $request)
    {
        $query = Commande::query();

        if ($request->has('statut')) {
            $query->where('statut', $request->statut);
        }

        $commandes = $query->with(['details.recette', 'user'])->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $commandes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'notes' => 'nullable|string',
            'recettes' => 'required|array',
            'recettes.*.recette_id' => 'required|exists:recettes,id',
            'recettes.*.quantite' => 'required|integer|min:1'
        ]);

        try {
            DB::beginTransaction();

            $commande = Commande::create([
                'user_id' => $validated['user_id'],
                'statut' => 'en_attente',
                'notes' => $validated['notes'] ?? null,
                'total' => 0
            ]);

            $total = 0;

            foreach ($validated['recettes'] as $recette) {
                $recetteModel = \App\Models\Recette::findOrFail($recette['recette_id']);
                $prix_unitaire = $this->calculateRecettePrice($recetteModel);
                $sous_total = $prix_unitaire * $recette['quantite'];
                $total += $sous_total;

                DetailCommande::create([
                    'commande_id' => $commande->id,
                    'recette_id' => $recette['recette_id'],
                    'quantite' => $recette['quantite'],
                    'prix_unitaire' => $prix_unitaire,
                    'sous_total' => $sous_total
                ]);
            }

            $commande->update(['total' => $total]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'data' => $commande->load('details.recette')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Erreur lors de la création de la commande'
            ], 500);
        }
    }

    public function show(Commande $commande)
    {
        return response()->json([
            'status' => 'success',
            'data' => $commande->load('details.recette', 'user')
        ]);
    }

    public function update(Request $request, Commande $commande)
    {
        $validated = $request->validate([
            'statut' => 'string|in:en_attente,validee,en_preparation,livree',
            'notes' => 'nullable|string'
        ]);

        $commande->update($validated);

        return response()->json([
            'status' => 'success',
            'data' => $commande->load('details.recette')
        ]);
    }

    public function destroy(Commande $commande)
    {
        $commande->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Commande supprimée avec succès'
        ]);
    }

    private function calculateRecettePrice($recette)
    {
        $total = 0;
        foreach ($recette->ingredients as $ingredient) {
            $total += $ingredient->prix_unitaire * $this->convertQuantityToBase($ingredient->pivot->quantite, $ingredient->pivot->unite);
        }
        return $total * 1.3; // 30% de marge
    }

    private function convertQuantityToBase($quantity, $unit)
    {
        // Conversion simplifiée, à adapter selon vos besoins
        $conversions = [
            'g' => 1,
            'kg' => 1000,
            'ml' => 1,
            'l' => 1000,
            'unite' => 1
        ];

        $value = floatval($quantity);
        return $value * ($conversions[$unit] ?? 1);
    }
}
