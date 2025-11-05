# MyStarter ‑ Notes pour Codex

Ce document synthétise tout ce que l’IA a mis en place dans le starter WordPress “MyStarter”. Il sert de fil conducteur lorsque le projet est ouvert sur un nouveau poste ou depuis une nouvelle conversation.

## Contexte général

- **MyStarter** est désormais un thème parent autonome (`wp-content/themes/mystarter`).
- Tous les blocs natifs Gutenberg sont désactivés : seuls les blocs personnalisés listés ci-dessous sont exposés.
- Tooling : `@wordpress/scripts`, Sass, PostCSS, ESLint, Stylelint, Prettier (`npm run build`, `npm run start`, etc.).
- Les assets sont générés dans `build/`. Toujours relancer `npm run build` après modifications dans `src/` pour refléter les nouveautés en BO.

## Blocs personnalisés (catégorie “MyStarter”)

Chaque bloc utilise désormais une approche “Formulaire” dans le panneau InspectorControls pour la configuration, tandis que la zone de contenu reste une prévisualisation live basée sur les attributs.

| Bloc | Description | Points clés |
| --- | --- | --- |
| `Image` | Image simple avec légende, lien & ouverture nouvelle fenêtre. | Sélection média + champ alt, panneau Lien & Légende. |
| `Image pleine largeur` | Visuel plein écran. | Même logique que bloc Image, align full. |
| `Galerie` | Galerie manuelle avec infos par image. | Gestion par carte dans inspector (image, titre, texte). |
| `Slider` | Carrousel d’images statiques. | Ajouter/remplacer médias, autoplay + intervalle paramétrables. |
| `Texte + image` | Layout média + texte (droite/gauche). | Choix d’alignement, arrière-plan, CTA facultatif. |
| `Groupe de boutons` | Liste de boutons (repeater). | Réglages label, lien, style (primary/secondary/ghost). |
| `Citation` | Citation avec avatar optionnel. | Textarea pour contenu et infos auteur. |
| `Call to action` | Section CTA avec accent & image fond. | Accent (rose/sombre/clair), champ HTML libre, bouton. |
| `Bloc rebond` | Cartes vers pages / CPT / actualités. | Sélecteur de contenu via `useSelect`, gestion manuelle dans inspector. |
| `Remontée actualités` | Liste d’articles “Actualités” avec mise en avant. | Options nombre d’items, slug de mise en avant. |
| `Hero banner` | Section hero avec variations statique, slider ou vidéo. | Inspecteur complet (média, contenu, slider, autoplay). |

### Comportement commun souhaité pour les futurs blocs

1. Prévoir un panneau InspectorControls “Formulaire” structuré (PanelBody par groupe).
2. Les champs manipulant HTML libre utilisent `TextareaControl` + `dangerouslySetInnerHTML` côté preview.
3. Maintenir la prévisualisation dans le canvas pour un rendu fidèle.
4. Bloquer la vue HTML (`supports.html = false`) pour éviter une édition non contrôlée.

## Patterns, templates et variations

- `patterns/cta.php`, `hero.php`, `hero-slider.php`, `hero-video.php` fournissent des variantes prêtes à l’emploi.
- Les templates FSE de base (header/footer, index, page, single, archive, 404, front-page) sont fournis dans `parts/` et `templates/`.
- Pense à enrichir ces dossiers lors de nouvelles compositions.

## Contenu dynamique

- CPT `Actualités` utilisé par les blocs `news-feed` et `rebound`. Les requêtes se basent sur `coreData` (`useSelect`) et proposent une mise en avant (slug) côté inspector.

## Notes techniques

- Les modules consomment largement `useSelect` pour récupérer médias, pages et actualités. Vérifier que l’utilisateur possède les droits nécessaires.
- Les sliders (hero & slider) ajoutent des attributs `data-autoplay`/`data-interval` directement dans les props du wrapper pour être récupérés par le script front (`src/frontend/index.js`).
- Les styles éditeur spécifiques sont dans chaque `src/blocks/*/editor.scss`.
- La largeur de la colonne Inspector Gutenberg est surchargée via `assets/editor-sidebar.css` (380 px) chargé dans `enqueue_block_editor_assets()`. Les composants internes y sont forcés à 100 % de largeur. Ajuster ce fichier si une nouvelle largeur ou un comportement différent est souhaité.

## Checklist de prise en main

1. `npm install`
2. `npm run build` (ou `npm run start` pendant le dev)
3. Activer le **thème enfant** du projet (exemple fourni `wp-content/themes/mystarter-child`) ; il référence automatiquement MyStarter.
4. Vérifier `Apparence → Compositions` pour retrouver les patterns hero/CTA.

## Thème enfant

- Un thème enfant générique se trouve dans `wp-content/themes/mystarter-child`.
- Pour un nouveau projet : dupliquer ce dossier, renommer le thème (`style.css` + `Text Domain`) et ajouter les surcharges propres au client.

## Ressources utiles

- Aide à la débogue : activer `WP_DEBUG_LOG` dans le docker WP si nécessaire.
- Sass loader affiche un warning “legacy JS API” à chaque build : comportement connu, non bloquant pour l’instant.

> Pour toute nouvelle évolution, garder ce document à jour afin d’assurer la continuité entre sessions Codex.
> Ajouter systématiquement les avancées significatives (nouveaux blocs, refontes, patterns, scripts, etc.).
