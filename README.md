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

## Préparer un nouveau site client avec le thème enfant

Le dossier `wordpress/wp-content/themes/mystarter-child/` fournit un point de départ. Copie-le, renomme-le (ex. `mystarter-clientx`) et mets à jour les éléments suivants :

### 1. Métadonnées du thème (style.css)

Dans l’en-tête du fichier `style.css`, adapte les lignes suivantes :

```css
Theme Name: Nom du projet client
Description: Thème enfant basé sur MyStarter pour {Nom du client}
Author: Ton nom / agence
Author URI: Ton site
Template: mystarter
Text Domain: slug-du-client
Version: 1.0.0
```

- `Text Domain` sert aux traductions. Utilise un slug unique (ex. `mystarter-clientx`).
- Incrémente `Version` lorsqu’une livraison est faite au client.

### 2. Capture d’écran (screenshot.png)

- Génère une miniature 1200×900px avec l’identité visuelle du client.
- Remplace `screenshot.png` dans le thème enfant.
- Mets à jour régulièrement si le design évolue ; WordPress l’affiche dans l’écran `Apparence → Thèmes`.

### 3. Chargement des styles/scripts (functions.php)

Le fichier fourni contient l’enqueue minimal :

```php
add_action(
    'wp_enqueue_scripts',
    static function () {
        wp_enqueue_style(
            'mystarter-child-style',
            get_stylesheet_uri(),
            [ 'mystarter-style' ],
            wp_get_theme()->get( 'Version' )
        );
    }
);
```

- Ajoute ici les scripts en file d’attente propres au projet (ex. librairies front, CSS supplémentaires).
- Évite de surcharger `functions.php` du parent ; place tout ce qui est spécifique client dans l’enfant.

### 4. Personnalisation du thème enfant – bonnes pratiques

1. **Styles SCSS/CSS** :
   - Crée un dossier `assets/` ou `scss/` si nécessaire ; compile ensuite dans `style.css` ou un fichier dédié enqueue via `wp_enqueue_style`.
   - Utilise des classes BEM ou des classes utilitaires spécifiques au client pour éviter les collisions avec le parent.

2. **PHP / Hooks** :
   - Ajoute tes actions/filters dans `functions.php`. Exemple : déclarer un CPT additionnel, modifier un comportement de bloc, etc.
   - Si le code devient conséquent, organise-le en fichiers et `require`-les depuis `functions.php`.

3. **Templates / Patterns** :
   - Pour modifier un template du parent, copie le fichier depuis `mystarter/templates/` ou `parts/` vers le même chemin dans ton thème enfant, puis ajuste-le.
   - Crée de nouveaux patterns dans `patterns/` de l’enfant pour les compositions propres au client.

4. **Blocs** :
   - Si le projet nécessite un bloc spécifique, développe-le dans l’enfant (structure similaire au parent : `src/blocks/...`).
   - Ajuste le `package.json` de l’enfant pour compiler ses assets si tu y ajoutes du JS/SCSS.

5. **Options `theme.json`** :
   - Le thème parent définit déjà palette, typos, etc. Pour les overrides client, crée un `theme.json` dans l’enfant avec uniquement les sections à surcharger.

### 5. To-do rapide lors d’un nouveau projet

1. Dupliquer `mystarter-child` → `mystarter-{client}`.
2. Mettre à jour `style.css` (métadonnées + éventuels styles de base).
3. Remplacer `screenshot.png` par la miniature du client.
4. Ajouter/adapter `functions.php` (scripts, hooks spécifiques).
5. Créer un `theme.json` enfant si palette/typo doivent diverger.
6. Ajouter des patterns, templates ou SCSS supplémentaires si nécessaire.
7. Activer le nouveau thème enfant dans WordPress.

En suivant ces étapes, MyStarter reste le parent centralisé et chaque site client dispose d’une couche propre et maintenable.

### Gestion des icônes du bloc « Colonne texte »

Le bloc `mystarter/column-text` peut afficher jusqu’à 6 colonnes, chaque colonne acceptant une icône optionnelle. Trois sources sont possibles :

1. **Dashicons** intégrés à WordPress (sélection dans la liste).
2. **Images uploadées** depuis la médiathèque pour chaque colonne.
3. **Icônes prédéfinies** : tout fichier placé dans `src/blocks/column-text/icons/library/` est détecté automatiquement.

Pour personnaliser ces icônes dans un thème enfant :

1. Reproduis l’arborescence `src/blocks/column-text/icons/library/` dans ton thème enfant.
2. Ajoute tes fichiers `.svg`, `.png` ou `.jpg` (le nom sera utilisé comme label).
3. Lance `npm install && npm run build` depuis l’enfant afin de générer son propre bundle.

> Alternative : exposer un petit script (enqueue block editor assets) qui utilise un filtre JS pour modifier la liste des presets sans copier tout le bloc (voir `icons.js` pour la logique).
