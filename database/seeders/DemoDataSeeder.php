<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produit;
use App\Models\Recette;

class DemoDataSeeder extends Seeder
{
    public function run()
    {
        // Produits de saison
        $produits = [
            [
                'nom' => 'Tomates anciennes',
                'categorie' => 'Légumes',
                'saison' => 'Été',
                'description' => 'Variétés anciennes de tomates cultivées en pleine terre, gorgées de soleil',
                'prix_unitaire' => 4.50,
                'quantite_stock' => 100,
                'provenance' => 'Provence',
                'image' => '/images/products/tomates-anciennes.jpg'
            ],
            [
                'nom' => 'Asperges vertes',
                'categorie' => 'Légumes',
                'saison' => 'Printemps',
                'description' => 'Asperges vertes fraîches et croquantes, idéales en entrée ou en accompagnement',
                'prix_unitaire' => 6.90,
                'quantite_stock' => 50,
                'provenance' => 'Loire-Atlantique',
                'image' => '/images/products/asperges-vertes.jpg'
            ],
            [
                'nom' => 'Poires Williams',
                'categorie' => 'Fruits',
                'saison' => 'Automne',
                'description' => 'Poires juteuses et parfumées, parfaites pour les desserts',
                'prix_unitaire' => 3.90,
                'quantite_stock' => 75,
                'provenance' => 'Provence-Alpes-Côte d\'Azur',
                'image' => '/images/products/poires-williams.jpg'
            ],
            [
                'nom' => 'Champignons de Paris',
                'categorie' => 'Champignons',
                'saison' => 'Toute l\'année',
                'description' => 'Champignons frais cultivés dans nos caves',
                'prix_unitaire' => 2.90,
                'quantite_stock' => 150,
                'provenance' => 'Val de Loire',
                'image' => '/images/products/champignons-paris.jpg'
            ],
            [
                'nom' => 'Courge butternut',
                'categorie' => 'Légumes',
                'saison' => 'Automne',
                'description' => 'Courge douce et fondante, parfaite pour les soupes et purées',
                'prix_unitaire' => 2.50,
                'quantite_stock' => 80,
                'provenance' => 'Pays de la Loire',
                'image' => '/images/products/courge-butternut.jpg'
            ],
        ];

        foreach ($produits as $produit) {
            Produit::create($produit);
        }

        // Recettes de saison
        $recettes = [
            [
                'titre' => 'Tarte aux tomates anciennes et basilic',
                'description' => 'Une tarte rustique qui met en valeur les saveurs des tomates anciennes',
                'temps_preparation' => 30,
                'temps_cuisson' => 45,
                'difficulte' => 'Facile',
                'ingredients' => json_encode([
                    '1 pâte brisée',
                    '800g de tomates anciennes variées',
                    '2 boules de mozzarella',
                    '1 bouquet de basilic frais',
                    '3 cuillères à soupe d\'huile d\'olive',
                    'Sel et poivre'
                ]),
                'etapes' => json_encode([
                    'Préchauffer le four à 180°C',
                    'Étaler la pâte dans un moule à tarte',
                    'Couper les tomates en tranches',
                    'Disposer les tomates sur la pâte',
                    'Ajouter la mozzarella en morceaux',
                    'Enfourner pour 45 minutes',
                    'Ajouter le basilic frais avant de servir'
                ]),
                'categorie' => 'Plat principal',
                'saison' => 'Été',
                'image' => '/images/recipes/tarte-tomates.jpg'
            ],
            [
                'titre' => 'Velouté de courge butternut aux épices',
                'description' => 'Un velouté réconfortant aux saveurs automnales',
                'temps_preparation' => 20,
                'temps_cuisson' => 30,
                'difficulte' => 'Facile',
                'ingredients' => json_encode([
                    '1 courge butternut',
                    '1 oignon',
                    '2 carottes',
                    '1 cube de bouillon de légumes',
                    '20cl de crème fraîche',
                    'Curry, cumin, sel et poivre'
                ]),
                'etapes' => json_encode([
                    'Éplucher et couper les légumes',
                    'Faire revenir l\'oignon dans une cocotte',
                    'Ajouter les légumes et le bouillon',
                    'Cuire 30 minutes',
                    'Mixer et ajouter la crème',
                    'Assaisonner selon votre goût'
                ]),
                'categorie' => 'Soupe',
                'saison' => 'Automne',
                'image' => '/images/recipes/veloute-butternut.jpg'
            ],
            [
                'titre' => 'Asperges vertes rôties au parmesan',
                'description' => 'Une entrée printanière simple et raffinée',
                'temps_preparation' => 10,
                'temps_cuisson' => 15,
                'difficulte' => 'Facile',
                'ingredients' => json_encode([
                    '1 botte d\'asperges vertes',
                    '50g de parmesan râpé',
                    'Huile d\'olive',
                    'Sel et poivre',
                    'Zeste de citron'
                ]),
                'etapes' => json_encode([
                    'Préchauffer le four à 200°C',
                    'Laver et éplucher les asperges',
                    'Les disposer sur une plaque',
                    'Arroser d\'huile d\'olive',
                    'Enfourner 12-15 minutes',
                    'Ajouter le parmesan et le zeste de citron'
                ]),
                'categorie' => 'Entrée',
                'saison' => 'Printemps',
                'image' => '/images/recipes/asperges-parmesan.jpg'
            ],
        ];

        foreach ($recettes as $recette) {
            Recette::create($recette);
        }
    }
}
