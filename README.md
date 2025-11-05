# Starter WordPress + Docker

Environnement de développement WordPress dockerisé servant de base au thème **MyStarter** (`wordpress/wp-content/themes/mystarter`).  
Ce dépôt regroupe :

- la stack Docker (`docker-compose.yml`)
- le thème parent MyStarter (blocs personnalisés, patterns, tooling)
- la configuration d’initialisation (`.env.example`, guides)

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (ou Docker Engine + Compose)
- Git

## Installation sur un nouveau poste

```bash
git clone https://github.com/Sgraph65/starterWordpress.git
cd starterWordpress
cp .env.example .env
```

1. **Configurer le domaine local**  
   Ajoute la ligne suivante à ton fichier `hosts` :

   ```
   127.0.0.1 wordpress-2025.lan
   ```

   - macOS / Linux : `/etc/hosts`
   - Windows : `C:\Windows\System32\drivers\etc\hosts`

2. **Lancement des conteneurs**

   ```bash
   docker compose up -d
   ```

   WordPress est accessible sur [http://wordpress-2025.lan:8000](http://wordpress-2025.lan:8000).

3. **Importer la base de données**

   - Le fichier de seed (ex. `database/dump.sql`) n’est pas versionné par défaut.  
     Depuis le poste de référence, exporte la base :

     ```bash
     mkdir -p database
     docker compose exec db mysqldump -u root -p$MYSQL_ROOT_PASSWORD $WORDPRESS_DB_NAME \
       > database/dump.sql
     ```

     (Pense à anonymiser les données sensibles avant de committer ce fichier.)

   - Sur le nouveau poste, importe-le :

     ```bash
     docker compose exec -T db mysql -u root -p$MYSQL_ROOT_PASSWORD $WORDPRESS_DB_NAME \
       < database/dump.sql
     ```

   - Si aucune base n’est fournie, visite l’URL et effectue l’installation WordPress classique (le thème MyStarter est déjà présent dans `wp-content/themes/mystarter`).

4. **Installer les dépendances du thème**

   ```bash
   cd wordpress/wp-content/themes/mystarter
   npm install
   npm run build
   ```

   Active ensuite le thème MyStarter dans l’admin WordPress.

## Mettre à jour la base de données partagée

1. Effectuer les changements désirés (contenu, options…).
2. Exporter :

   ```bash
   docker compose exec db mysqldump -u root -p$MYSQL_ROOT_PASSWORD $WORDPRESS_DB_NAME \
     > database/dump.sql
   ```

3. Commiter `database/dump.sql` (anonymise si nécessaire).

## Commandes utiles

- `docker compose logs -f wordpress` : logs WordPress.
- `docker compose logs -f db` : logs MySQL.
- `docker compose down` : stoppe les conteneurs.
- `docker compose down -v` : stoppe et supprime les volumes (réinitialise la base).

## Structure du dépôt

```
docker-compose.yml          # stack Docker (WordPress + MySQL)
.env / .env.example         # configuration
wordpress/                  # sources WordPress synchronisées
  wp-content/themes/mystarter/  # thème MyStarter
database/                   # dumps SQL optionnels
```

Pour plus de détails sur le thème, consulte `wordpress/wp-content/themes/mystarter/CODEX_NOTES.md`.
