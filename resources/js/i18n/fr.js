export default {
  app: {
    name: 'Cuisine Saisonnière'
  },
  nav: {
    open_menu: 'Ouvrir le menu',
    home: 'Accueil',
    products: 'Produits',
    about: 'À propos',
    contact: 'Contact',
    recipes: 'Recettes',
    privacy: 'Confidentialité',
    terms: 'Conditions d\'utilisation'
  },
  footer: {
    description: 'Votre destination pour une cuisine locale et de saison.',
    navigation: 'Navigation',
    legal: 'Mentions légales',
    copyright: ' 2024 Cuisine Saisonnière. Tous droits réservés.',
    allRightsReserved: 'Tous droits réservés.'
  },
  home: {
    hero: {
      title: 'Mangez local et de saison',
      subtitle: 'Découvrez les meilleurs produits de votre région, cultivés avec passion par nos producteurs locaux',
      cta: 'Découvrir nos produits',
      learnMore: 'En savoir plus',
      scrollDown: 'Défiler vers le bas'
    },
    whySeasonal: {
      title: 'Pourquoi manger de saison ?',
      subtitle: 'Découvrez les avantages d\'une alimentation locale et saisonnière',
      benefits: [
        {
          title: 'Meilleur goût',
          description: 'Les produits de saison sont récoltés à maturité et ont plus de saveur'
        },
        {
          title: 'Plus nutritif',
          description: 'Les fruits et légumes de saison sont plus riches en nutriments'
        },
        {
          title: 'Écologique',
          description: 'Réduisez votre impact environnemental en consommant local et de saison'
        },
        {
          title: 'Économique',
          description: 'Les produits de saison sont généralement moins chers'
        }
      ]
    },
    featuredProducts: {
      title: 'Nos produits du moment',
      subtitle: 'Sélection de produits frais et de saison',
      viewAll: 'Voir tous les produits'
    },
    featuredRecipes: {
      title: 'Recettes de saison',
      subtitle: 'Inspirez-vous de nos recettes créées avec les meilleurs produits de saison',
      viewAll: 'Voir toutes les recettes'
    },
    newsletter: {
      title: 'Restez informé',
      subtitle: 'Inscrivez-vous à notre newsletter pour recevoir nos actualités, recettes et conseils de saison',
      emailLabel: 'Adresse email',
      placeholder: 'Votre adresse email',
      button: "S'inscrire",
      success: 'Merci pour votre inscription !',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      features: {
        seasonal: {
          title: 'Calendrier saisonnier',
          description: 'Recevez chaque mois notre guide des produits de saison'
        },
        exclusive: {
          title: 'Offres exclusives',
          description: 'Profitez de réductions et d\'offres spéciales de nos producteurs'
        },
        tips: {
          title: 'Conseils et astuces',
          description: 'Découvrez nos conseils pour cuisiner et conserver vos produits'
        },
        community: {
          title: 'Communauté engagée',
          description: 'Rejoignez une communauté passionnée par l\'alimentation durable'
        }
      }
    }
  },
  common: {
    select_language: 'Sélectionner la langue',
    menu: 'Menu',
    cart: 'Panier',
    search: 'Rechercher',
    loading: 'Chargement...'
  },
  navigation: {
    home: 'Accueil',
    products: 'Produits',
    recipes: 'Recettes',
    about: 'À propos',
    openLanguageMenu: 'Ouvrir le menu de langue',
    openMainMenu: 'Ouvrir le menu principal'
  },
  notFound: {
    title: 'Page non trouvée',
    description: 'Désolé, nous n\'avons pas trouvé la page que vous recherchez.',
    goHome: 'Retour à l\'accueil',
    contact: 'Contactez-nous'
  },
  auth: {
    sign_in: 'Se connecter',
    sign_out: 'Se déconnecter',
    create_account: 'Créer un compte',
    or: 'ou',
    sign_in_instead: 'Se connecter à la place',
    email: 'Email',
    password: 'Mot de passe',
    confirm_password: 'Confirmer le mot de passe',
    name: 'Nom',
    creating_account: 'Création du compte...',
    remember_me: 'Se souvenir de moi',
    forgot_password: 'Mot de passe oublié ?'
  },
  about: {
    title: 'À propos de nous',
    intro: 'Cuisine Saisonnière est née de la passion pour la cuisine locale et de saison. Notre mission est de connecter les producteurs locaux avec les amateurs de bonne cuisine.',
    mission: {
      title: 'Notre Mission',
      description: 'Promouvoir une alimentation saine et durable en facilitant l\'accès aux produits locaux de saison.'
    },
    values: {
      title: 'Nos Valeurs',
      local: {
        title: 'Local',
        description: 'Soutien aux producteurs locaux et circuits courts'
      },
      seasonal: {
        title: 'Saisonnier',
        description: 'Respect du rythme naturel des saisons'
      },
      quality: {
        title: 'Qualité',
        description: 'Sélection rigoureuse des meilleurs produits'
      }
    },
    team: {
      title: 'Notre Équipe',
      roles: {
        founder: 'Fondatrice',
        chef: 'Chef Cuisinier',
        nutritionist: 'Nutritionniste'
      }
    }
  },
  contact: {
    title: 'Contactez-nous',
    form: {
      name: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      subjects: {
        general: 'Question générale',
        order: 'Question sur une commande',
        partnership: 'Proposition de partenariat',
        other: 'Autre'
      },
      message: 'Message',
      send: 'Envoyer',
      sending: 'Envoi en cours...',
      success: 'Message envoyé avec succès !',
      error: 'Une erreur est survenue lors de l\'envoi du message.'
    },
    info: {
      address: {
        title: 'Adresse'
      },
      hours: {
        title: 'Horaires d\'ouverture',
        weekdays: 'Lundi - Vendredi',
        weekend: 'Samedi - Dimanche'
      }
    }
  },
  orders: {
    title: 'Mes Commandes',
    no_orders: 'Vous n\'avez pas encore de commande',
    order_number: 'Commande n°{number}',
    items: 'Articles',
    quantity: 'Quantité : {quantity}',
    delivery_address: 'Adresse de livraison',
    download_invoice: 'Télécharger la facture',
    reorder: 'Commander à nouveau',
    status: {
      pending: 'En attente',
      processing: 'En cours',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    }
  },
  profile: {
    title: 'Mon Profil',
    personal_info: 'Informations personnelles',
    addresses: 'Mes adresses',
    no_addresses: 'Aucune adresse enregistrée',
    add_address: 'Ajouter une adresse',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    saving: 'Enregistrement...'
  },
  recipes: {
    title: 'Nos Recettes de Saison',
    subtitle: 'Découvrez notre collection de recettes adaptées aux produits de chaque saison'
  },
  privacy: {
    title: 'Politique de Confidentialité',
    intro: 'Chez Cuisine Saisonnière, nous prenons la protection de vos données personnelles très au sérieux. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.',
    data_collection: {
      title: 'Collecte des Données',
      description: 'Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services, comme votre nom, adresse email et préférences alimentaires.'
    },
    data_usage: {
      title: 'Utilisation des Données',
      description: 'Vos données sont utilisées pour personnaliser votre expérience, traiter vos commandes et vous tenir informé de nos offres saisonnières.'
    },
    cookies: {
      title: 'Cookies',
      description: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site et analyser son utilisation.'
    },
    contact: {
      title: 'Nous Contacter',
      description: 'Pour toute question concernant notre politique de confidentialité, contactez-nous à privacy@cuisine-saisonniere.fr'
    }
  },
  terms: {
    title: 'Conditions d\'utilisation',
    intro: 'En utilisant notre site, vous acceptez les conditions suivantes. Veuillez les lire attentivement.',
    usage: {
      title: 'Utilisation du Site',
      description: 'Notre site est destiné à un usage personnel et non commercial. Vous vous engagez à utiliser le site conformément aux lois en vigueur.'
    },
    account: {
      title: 'Compte Utilisateur',
      description: 'Vous êtes responsable de maintenir la confidentialité de votre compte et de toutes les activités qui s\'y déroulent.'
    },
    orders: {
      title: 'Commandes',
      description: 'En passant une commande, vous vous engagez à fournir des informations exactes et à respecter nos conditions de paiement.'
    },
    liability: {
      title: 'Responsabilité',
      description: 'Nous nous efforçons de maintenir le site à jour, mais ne pouvons garantir son exactitude ou sa disponibilité permanente.'
    }
  },
  products: {
    title: 'Nos produits',
    filters: 'Filtres',
    sortBy: 'Trier par',
    seasons: 'Saisons',
    categories: 'Catégories',
    priceRange: 'Fourchette de prix',
    noProducts: 'Aucun produit trouvé',
    tryDifferentFilters: 'Essayez de modifier vos filtres',
    addToCart: 'Ajouter au panier',
    outOfStock: 'Rupture de stock',
    price: 'Prix',
    origin: 'Origine',
    seasonal: {
      title: 'Produits de saison',
      description: 'Découvrez notre sélection de produits frais et de saison, cultivés localement par nos producteurs partenaires.',
      currentSeason: {
        spring: 'Les saveurs du printemps',
        summer: 'Les délices de l\'été',
        autumn: 'Les trésors de l\'automne',
        winter: 'Les réconforts de l\'hiver'
      },
      benefits: {
        title: 'Les avantages des produits de saison',
        items: [
          {
            title: 'Fraîcheur garantie',
            description: 'Nos produits sont récoltés à maturité pour une fraîcheur et une qualité optimales'
          },
          {
            title: 'Prix avantageux',
            description: 'Les produits de saison sont naturellement plus abondants et donc moins chers'
          },
          {
            title: 'Respect de l\'environnement',
            description: 'Cultiver et consommer des produits de saison réduit l\'impact environnemental'
          }
        ]
      }
    }
  },
  seasons: {
    spring: 'Printemps',
    summer: 'Été',
    autumn: 'Automne',
    winter: 'Hiver'
  },
  categories: {
    vegetables: 'Légumes',
    fruits: 'Fruits',
    mushrooms: 'Champignons',
    herbs: 'Herbes aromatiques'
  },
  sort: {
    priceAsc: 'Prix croissant',
    priceDesc: 'Prix décroissant',
    nameAsc: 'Nom A-Z',
    nameDesc: 'Nom Z-A'
  },
  common: {
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    retry: 'Réessayer',
    close: 'Fermer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    search: 'Rechercher',
    noResults: 'Aucun résultat',
    resetFilters: 'Réinitialiser les filtres',
    apply: 'Appliquer'
  },
  cart: {
    title: 'Panier',
    empty: 'Votre panier est vide',
    total: 'Total',
    checkout: 'Commander',
    continue: 'Continuer vos achats',
    remove: 'Retirer',
    quantity: 'Quantité'
  }
}
