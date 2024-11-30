<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        $query = Produit::query();

        if ($request->has('categorie')) {
            $query->where('categorie', $request->categorie);
        }

        if ($request->has('saison')) {
            $query->where('saison', $request->saison);
        }

        $produits = $query->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $produits
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'categorie' => 'required|string',
            'saison' => 'required|string',
            'description' => 'nullable|string',
            'prix_unitaire' => 'required|numeric',
            'quantite_stock' => 'required|integer',
            'provenance' => 'nullable|string',
            'translations' => 'array'
        ]);

        $produit = Produit::create($validated);

        if (isset($validated['translations'])) {
            foreach ($validated['translations'] as $locale => $fields) {
                foreach ($fields as $field => $value) {
                    $produit->setTranslation($field, $locale, $value);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'data' => $produit
        ], 201);
    }

    public function show(Produit $produit)
    {
        return response()->json([
            'status' => 'success',
            'data' => $produit->load('translations')
        ]);
    }

    public function update(Request $request, Produit $produit)
    {
        $validated = $request->validate([
            'nom' => 'string',
            'categorie' => 'string',
            'saison' => 'string',
            'description' => 'nullable|string',
            'prix_unitaire' => 'numeric',
            'quantite_stock' => 'integer',
            'provenance' => 'nullable|string',
            'translations' => 'array'
        ]);

        $produit->update($validated);

        if (isset($validated['translations'])) {
            foreach ($validated['translations'] as $locale => $fields) {
                foreach ($fields as $field => $value) {
                    $produit->setTranslation($field, $locale, $value);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'data' => $produit
        ]);
    }

    public function destroy(Produit $produit)
    {
        $produit->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Produit supprimé avec succès'
        ]);
    }
}
