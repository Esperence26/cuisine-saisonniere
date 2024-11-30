@echo off
echo Installation de Cuisine Saisonniere...

REM Installer les dépendances PHP
echo Installation des dependances PHP...
call composer install

REM Installer les dépendances Node.js
echo Installation des dependances Node.js...
call npm install

REM Copier le fichier .env
echo Configuration du fichier .env...
copy .env.example .env

REM Générer la clé d'application
echo Generation de la cle d'application...
php artisan key:generate

REM Créer la base de données SQLite
echo Creation de la base de donnees...
type nul > database/database.sqlite

REM Configurer la base de données dans .env
echo Configuration de la base de donnees...
echo DB_CONNECTION=sqlite >> .env
echo DB_DATABASE=%cd%\database\database.sqlite >> .env

REM Exécuter les migrations
echo Execution des migrations...
php artisan migrate:fresh --seed

REM Lancer le serveur de développement
echo Demarrage des serveurs de developpement...
start cmd /k "php artisan serve"
start cmd /k "npm run dev"

echo Installation terminee ! L'application est accessible sur http://localhost:8000
