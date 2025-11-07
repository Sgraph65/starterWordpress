const dashiconOptions = [
	{ label: 'Étoile', value: 'star-filled' },
	{ label: 'Idée', value: 'lightbulb' },
	{ label: 'Validation', value: 'yes' },
	{ label: 'Info', value: 'info-outline' },
	{ label: 'Cœur', value: 'heart' },
	{ label: 'Check', value: 'saved' }
];

const presetsContext = require.context('./icons/library', false, /\.(png|jpe?g|svg)$/);

const prettify = (filename) =>
	filename
		.replace(/\.[^/.]+$/, '')
		.replace(/[-_]/g, ' ')
		.replace(/\b\w/g, (match) => match.toUpperCase());

const presetIcons = presetsContext.keys().map((key) => {
	const file = presetsContext(key);
	const src = file.default || file;
	const value = key.replace('./', '');

	return {
		label: prettify(value),
		value,
		src,
	};
});

export const DASHICON_OPTIONS = dashiconOptions;
export const PRESET_ICONS = presetIcons;
export const PRESET_ICONS_MAP = presetIcons.reduce((acc, icon) => {
	acc[icon.value] = icon;
	return acc;
}, {});
