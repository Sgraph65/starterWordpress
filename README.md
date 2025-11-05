# Projet WordPress + Docker

Ce projet installe un environnement WordPress local via Docker Compose.

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop) ou Docker Engine + Docker Compose

## Démarrage rapide

1. Copier le fichier `.env` si besoin et ajuster les mots de passe.
2. Ajouter le domaine local dans votre fichier hosts :

   ```
   127.0.0.1 wordpress-2025.lan
   ```

   - macOS / Linux : `/etc/hosts`
   - Windows : `C:\Windows\System32\drivers\etc\hosts`

3. Démarrer l'environnement :

   ```bash
   docker compose up -d
   ```

4. Ouvrir [http://wordpress-2025.lan:8000](http://wordpress-2025.lan:8000) pour finaliser l'installation WordPress (ou se connecter si déjà installé).

## Commandes utiles

- `docker compose logs -f wordpress` : surveiller les logs WordPress.
- `docker compose down` : arrêter les conteneurs.
- `docker compose down -v` : arrêter et supprimer les volumes (efface la base de données).

Les fichiers du site WordPress sont synchronisés dans le dossier `wordpress/`.
