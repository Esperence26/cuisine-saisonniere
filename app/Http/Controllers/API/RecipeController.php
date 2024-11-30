<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $query = Recipe::query();

        if ($request->has('seasonal')) {
            $query->where('is_seasonal', $request->boolean('seasonal'));
        }

        if ($request->has('season')) {
            $query->whereJsonContains('seasons', $request->season);
        }

        if ($request->has('difficulty')) {
            $query->where('difficulty', $request->difficulty);
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate(12)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_translations' => 'nullable|array',
            'description' => 'required|string',
            'description_translations' => 'nullable|array',
            'ingredients' => 'required|string',
            'ingredients_translations' => 'nullable|array',
            'instructions' => 'required|string',
            'instructions_translations' => 'nullable|array',
            'prep_time' => 'nullable|integer|min:0',
            'cook_time' => 'nullable|integer|min:0',
            'servings' => 'nullable|integer|min:1',
            'difficulty' => 'required|string|in:easy,medium,hard',
            'image' => 'nullable|image|max:2048',
            'is_seasonal' => 'boolean',
            'seasons' => 'nullable|array'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('recipes', 'public');
            $validated['image'] = $path;
        }

        $recipe = Recipe::create($validated);

        return response()->json([
            'success' => true,
            'data' => $recipe
        ], 201);
    }

    public function show(Recipe $recipe)
    {
        return response()->json([
            'success' => true,
            'data' => $recipe
        ]);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'title_translations' => 'nullable|array',
            'description' => 'string',
            'description_translations' => 'nullable|array',
            'ingredients' => 'string',
            'ingredients_translations' => 'nullable|array',
            'instructions' => 'string',
            'instructions_translations' => 'nullable|array',
            'prep_time' => 'nullable|integer|min:0',
            'cook_time' => 'nullable|integer|min:0',
            'servings' => 'nullable|integer|min:1',
            'difficulty' => 'string|in:easy,medium,hard',
            'image' => 'nullable|image|max:2048',
            'is_seasonal' => 'boolean',
            'seasons' => 'nullable|array'
        ]);

        if ($request->hasFile('image')) {
            if ($recipe->image) {
                Storage::disk('public')->delete($recipe->image);
            }
            $path = $request->file('image')->store('recipes', 'public');
            $validated['image'] = $path;
        }

        $recipe->update($validated);

        return response()->json([
            'success' => true,
            'data' => $recipe
        ]);
    }

    public function destroy(Recipe $recipe)
    {
        if ($recipe->image) {
            Storage::disk('public')->delete($recipe->image);
        }

        $recipe->delete();

        return response()->json([
            'success' => true,
            'message' => 'Recipe deleted successfully'
        ]);
    }
}
