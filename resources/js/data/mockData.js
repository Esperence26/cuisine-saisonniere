// Mock data for products
export const products = [
  {
    id: 1,
    name: 'Tomates Bio',
    description: 'Tomates fraîches cultivées localement',
    price: 2.99,
    unit: 'kg',
    image: '/images/products/tomatoes.jpg',
    season: 'summer',
    category: 'vegetables'
  },
  {
    id: 2,
    name: 'Fraises',
    description: 'Fraises juteuses de saison',
    price: 4.99,
    unit: '500g',
    image: '/images/products/strawberries.jpg',
    season: 'spring',
    category: 'fruits'
  },
  {
    id: 3,
    name: 'Champignons',
    description: 'Champignons frais de nos forêts',
    price: 6.99,
    unit: '500g',
    image: '/images/products/mushrooms.jpg',
    season: 'autumn',
    category: 'vegetables'
  },
  {
    id: 4,
    name: 'Courge Butternut',
    description: 'Courge butternut bio locale',
    price: 3.49,
    unit: 'pièce',
    image: '/images/products/butternut.jpg',
    season: 'autumn',
    category: 'vegetables'
  }
]

// Mock data for recipes
const mockRecipes = [
  {
    id: 1,
    nom: 'Salade de Tomates Bio',
    description: 'Une salade fraîche et délicieuse préparée avec des tomates bio locales',
    temps_preparation: 15,
    temps_cuisson: 0,
    portions: 4,
    difficulte: 'Facile',
    image_url: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    season: 'summer',
    tags: ['Été', 'Salade', 'Végétarien', 'Sans cuisson'],
    ingredients: [
      { nom: 'Tomates Bio', quantite: 4, unite: 'pièces' },
      { nom: 'Huile d\'olive', quantite: 3, unite: 'cuillères à soupe' },
      { nom: 'Vinaigre balsamique', quantite: 1, unite: 'cuillère à soupe' },
      { nom: 'Sel', quantite: 1, unite: 'pincée' },
      { nom: 'Poivre', quantite: 1, unite: 'pincée' },
      { nom: 'Basilic frais', quantite: 1, unite: 'bouquet' }
    ],
    instructions: [
      'Laver soigneusement les tomates',
      'Couper les tomates en quartiers ou en rondelles selon votre préférence',
      'Dans un saladier, mélanger l\'huile d\'olive et le vinaigre balsamique',
      'Ajouter les tomates dans le saladier',
      'Saler et poivrer selon votre goût',
      'Déchirer les feuilles de basilic et les ajouter à la salade',
      'Mélanger délicatement et servir immédiatement'
    ]
  },
  {
    id: 2,
    nom: 'Tarte aux Fraises',
    description: 'Une délicieuse tarte aux fraises de saison avec une crème pâtissière maison',
    temps_preparation: 45,
    temps_cuisson: 30,
    portions: 8,
    difficulte: 'Moyen',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    season: 'spring',
    tags: ['Printemps', 'Dessert', 'Pâtisserie', 'Fruits'],
    ingredients: [
      { nom: 'Pâte sablée', quantite: 1, unite: 'pièce' },
      { nom: 'Fraises', quantite: 500, unite: 'g' },
      { nom: 'Lait', quantite: 500, unite: 'ml' },
      { nom: 'Œufs', quantite: 4, unite: 'pièces' },
      { nom: 'Sucre', quantite: 125, unite: 'g' },
      { nom: 'Farine', quantite: 50, unite: 'g' },
      { nom: 'Vanille', quantite: 1, unite: 'gousse' }
    ],
    instructions: [
      'Préchauffer le four à 180°C',
      'Étaler la pâte sablée dans un moule à tarte',
      'Cuire à blanc pendant 20 minutes',
      'Préparer la crème pâtissière',
      'Laisser refroidir la pâte et la crème',
      'Laver et équeuter les fraises',
      'Garnir le fond de tarte de crème pâtissière',
      'Disposer les fraises harmonieusement',
      'Réserver au frais jusqu\'au service'
    ]
  },
  {
    id: 3,
    nom: 'Ratatouille Provençale',
    description: 'Un plat traditionnel du sud de la France, préparé avec les meilleurs légumes de saison',
    temps_preparation: 30,
    temps_cuisson: 45,
    portions: 6,
    difficulte: 'Facile',
    image_url: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    season: 'summer',
    tags: ['Été', 'Végétarien', 'Provençal', 'Mijoté'],
    ingredients: [
      { nom: 'Aubergines', quantite: 2, unite: 'pièces' },
      { nom: 'Courgettes', quantite: 3, unite: 'pièces' },
      { nom: 'Poivrons', quantite: 2, unite: 'pièces' },
      { nom: 'Tomates', quantite: 4, unite: 'pièces' },
      { nom: 'Oignon', quantite: 1, unite: 'pièce' },
      { nom: 'Ail', quantite: 3, unite: 'gousses' },
      { nom: 'Huile d\'olive', quantite: 4, unite: 'cuillères à soupe' },
      { nom: 'Herbes de Provence', quantite: 1, unite: 'cuillère à soupe' }
    ],
    instructions: [
      'Couper tous les légumes en dés de taille moyenne',
      'Faire revenir l\'oignon et l\'ail dans l\'huile d\'olive',
      'Ajouter les aubergines et les faire dorer',
      'Ajouter les courgettes et les poivrons',
      'Incorporer les tomates et les herbes',
      'Laisser mijoter à feu doux pendant 45 minutes',
      'Assaisonner selon votre goût'
    ]
  },
  {
    id: 4,
    nom: 'Velouté de Potimarron',
    description: 'Une soupe onctueuse et réconfortante, parfaite pour les soirées d\'automne',
    temps_preparation: 20,
    temps_cuisson: 35,
    portions: 4,
    difficulte: 'Facile',
    image_url: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    season: 'autumn',
    tags: ['Automne', 'Soupe', 'Réconfortant', 'Végétarien'],
    ingredients: [
      { nom: 'Potimarron', quantite: 1, unite: 'kg' },
      { nom: 'Pommes de terre', quantite: 2, unite: 'pièces' },
      { nom: 'Oignon', quantite: 1, unite: 'pièce' },
      { nom: 'Crème fraîche', quantite: 10, unite: 'cl' },
      { nom: 'Bouillon de légumes', quantite: 1, unite: 'L' },
      { nom: 'Noix de muscade', quantite: 1, unite: 'pincée' }
    ],
    instructions: [
      'Éplucher et couper le potimarron et les pommes de terre',
      'Faire revenir l\'oignon émincé',
      'Ajouter les légumes et le bouillon',
      'Laisser cuire 35 minutes',
      'Mixer la soupe',
      'Ajouter la crème et la muscade',
      'Servir bien chaud'
    ]
  },
  {
    id: 5,
    nom: 'Tarte Tatin aux Pommes',
    description: 'Un classique de la pâtisserie française, caramélisé à souhait',
    temps_preparation: 30,
    temps_cuisson: 45,
    portions: 8,
    difficulte: 'Moyen',
    image_url: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    season: 'autumn',
    tags: ['Automne', 'Dessert', 'Traditionnel', 'Pommes'],
    ingredients: [
      { nom: 'Pommes', quantite: 8, unite: 'pièces' },
      { nom: 'Pâte feuilletée', quantite: 1, unite: 'pièce' },
      { nom: 'Sucre', quantite: 150, unite: 'g' },
      { nom: 'Beurre', quantite: 60, unite: 'g' },
      { nom: 'Vanille', quantite: 1, unite: 'gousse' }
    ],
    instructions: [
      'Éplucher et couper les pommes en quartiers',
      'Préparer le caramel avec le sucre et le beurre',
      'Disposer les pommes dans le caramel',
      'Recouvrir de pâte feuilletée',
      'Cuire 45 minutes à 180°C',
      'Laisser tiédir avant de retourner',
      'Servir tiède ou à température ambiante'
    ]
  }
];

export default mockRecipes;

export const heroContent = {
  image: 'https://images.unsplash.com/photo-1470119693884-47d3a1d1f180?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  title: 'Découvrez les saveurs de chaque saison',
  subtitle: 'Explorez notre sélection de produits frais et de recettes adaptées à chaque période de l\'année.'
}
