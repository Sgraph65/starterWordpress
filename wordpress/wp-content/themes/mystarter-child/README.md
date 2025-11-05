# MyStarter Child

Thème enfant de base pour le projet courant. Utilise le thème parent **MyStarter**.

## Mise en route

```bash
npm install       # installe @wordpress/scripts, sass, etc.
npm run start     # watch + rebuild auto des assets
npm run build     # build de production (copie dans build/)
```

Active ensuite *MyStarter Child* dans `Apparence → Thèmes`.

> Les fichiers compilés (`build/`) sont ignorés par Git ; commit les si tu dois livrer le thème à un tiers sans toolchain.

## Organisation

```
style.css                 → Métadonnées + CSS rapides spécifiques client
functions.php             → Enqueue des assets + hooks du projet
package.json              → Scripts build/watch
src/
  index.js               → Point d’entrée JS (importe les SCSS)
  style.scss             → Styles front
  editor.scss            → Styles éditeur Gutenberg
  styles/_variables.scss → Variables Sass à personnaliser
```

### Ajouter du CSS / SCSS

- Personalise les variables dans `styles/_variables.scss`.
- Ajoute tes sélecteurs dans `style.scss` (front) et/ou `editor.scss` (éditeur).
- `npm run start` génère automatiquement `build/`.

### Ajouter du JS

- Écris ton code dans `src/index.js` (ou crée d’autres modules et importe-les).
- Utilise les packages WordPress (ex. `@wordpress/data`, `@wordpress/dom-ready`) si besoin.

### Hooks & PHP

- Ajoute les actions/filters spécifiques client dans `functions.php` (ou crée des fichiers supplémentaires et `require_once` depuis ce fichier).
- Les templates/patterns personnalisés peuvent être placés dans des sous-dossiers `templates/`, `parts/`, `patterns/` (WordPress chargera ceux de l’enfant en priorité).

## Checklist de duplication pour un nouveau projet

1. Dupliquer ce dossier et le renommer (`mystarter-nom-client`).
2. Mettre à jour l’en-tête de `style.css` (Theme Name, Description, Author, Text Domain…).
3. Remplacer `screenshot.png` par la miniature du projet.
4. Lancer `npm install` puis ajuster SCSS/JS/PHP selon les besoins.
5. Ajouter éventuellement un `theme.json` ou des patterns spécifiques au client.

Le parent **MyStarter** reste responsable des blocs personnalisés et des réglages globaux ; concentre-toi ici sur les adaptations propres au site livrable.
