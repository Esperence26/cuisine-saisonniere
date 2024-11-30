# Cuisine Saisonnière 

Une application web moderne pour découvrir et cuisiner les produits de saison.

## Fonctionnalités

- Découvrez les produits de saison
- Explorez des recettes savoureuses
- Interface bilingue (Français/Anglais)
- Design responsive et moderne
- Animations fluides et interactives

## Installation rapide

### Prérequis

- PHP 8.1 ou supérieur
- Composer
- Node.js et npm
- SQLite

### Installation automatique (Windows)

1. Double-cliquez sur `setup.bat`
2. Attendez que l'installation se termine
3. L'application sera accessible sur http://localhost:8000

### Installation manuelle

```bash
# Installer les dépendances PHP
composer install

# Installer les dépendances Node.js
npm install

# Configurer l'environnement
cp .env.example .env
php artisan key:generate

# Créer la base de données
touch database/database.sqlite

# Configurer la base de données dans .env
echo "DB_CONNECTION=sqlite" >> .env
echo "DB_DATABASE=$(pwd)/database/database.sqlite" >> .env

# Exécuter les migrations
php artisan migrate:fresh --seed

# Démarrer les serveurs de développement
php artisan serve
npm run dev
```

## Structure du projet

```
cuisine-saisonniere/
├── app/                    # Logic de l'application
├── resources/
│   ├── js/                # Composants Vue.js
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/        # Pages de l'application
│   │   └── i18n/         # Traductions
│   └── views/            # Templates Blade
├── routes/               # Routes de l'application
└── database/            # Migrations et seeds
```

## Technologies utilisées

- **Frontend**: Vue.js 3, Tailwind CSS
- **Backend**: Laravel 10
- **Base de données**: SQLite
- **Autres**: 
  - Vue Router pour la navigation
  - Pinia pour la gestion d'état
  - vue-i18n pour l'internationalisation
  - @vueuse/motion pour les animations

## Captures d'écran

*Les captures d'écran seront ajoutées prochainement*

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## License

MIT
