export const AVAILABLE_MODULES = [
	{ label: 'Image', value: 'mystarter/image' },
	{ label: 'Image pleine largeur', value: 'mystarter/image-fullwidth' },
	{ label: 'Galerie', value: 'mystarter/gallery' },
	{ label: 'Slider', value: 'mystarter/slider' },
	{ label: 'Texte + image', value: 'mystarter/text-image' },
	{ label: 'Groupe de boutons', value: 'mystarter/button-group' },
	{ label: 'Citation', value: 'mystarter/quote' },
	{ label: 'Call to action', value: 'mystarter/call-to-action' },
	{ label: 'Bloc rebond', value: 'mystarter/rebound' },
	{ label: 'Remontée actualités', value: 'mystarter/news-feed' },
	{ label: 'Hero banner', value: 'mystarter/hero-banner' },
	{ label: 'Paragraphe', value: 'core/paragraph' },
	{ label: 'Titre', value: 'core/heading' },
	{ label: 'Liste', value: 'core/list' },
	{ label: 'Boutons', value: 'core/buttons' }
];

export const DEFAULT_ALLOWED_MODULES = AVAILABLE_MODULES.map(
	({ value }) => value
);
