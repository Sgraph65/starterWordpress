import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
	Notice,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';
import { Dashicon } from '@wordpress/components';

import {
	DASHICON_OPTIONS,
	PRESET_ICONS,
	PRESET_ICONS_MAP,
} from './icons';

const ICON_TYPE_OPTIONS = [
	{ label: __('Dashicons', 'mystarter'), value: 'dashicon' },
	{ label: __('Image personnalisée', 'mystarter'), value: 'image' },
	{ label: __('Icône prédéfinie', 'mystarter'), value: 'preset' },
];

const EMPTY_COLUMN = {
	title: '',
	content: '',
	showIcon: false,
	iconType: 'dashicon',
	dashicon: 'star-filled',
	imageId: 0,
	imageUrl: '',
	presetIcon: PRESET_ICONS[0]?.value || '',
};

const renderDashicon = (slug) => (
	<span className="mystarter-two-column__icon">
		<Dashicon icon={slug} />
	</span>
);

const renderIconPreview = (item) => {
	if (!item.showIcon) {
		return null;
	}

	if (item.iconType === 'image' && item.imageUrl) {
		return (
			<span className="mystarter-two-column__icon is-image">
				<img src={item.imageUrl} alt="" />
			</span>
		);
	}

	if (item.iconType === 'preset' && item.presetIcon) {
		const preset = PRESET_ICONS_MAP[item.presetIcon];

		if (preset?.src) {
			return (
				<span className="mystarter-two-column__icon is-image">
					<img src={preset.src} alt="" />
				</span>
			);
		}
	}

	return renderDashicon(item.dashicon || 'star-filled');
};

const ColumnControls = ({ index, item, onChange }) => (
	<PanelBody
		title={__('Colonne', 'mystarter') + ` ${index + 1}`}
		initialOpen={index === 0}
	>
		<TextControl
			label={__('Titre', 'mystarter')}
			value={item.title}
			onChange={(value) => onChange(index, { ...item, title: value })}
		/>
		<RichText
			tagName="div"
			className="mystarter-two-column__richtext"
			value={item.content}
			onChange={(value) => onChange(index, { ...item, content: value })}
			placeholder={__('Saisissez votre texte…', 'mystarter')}
			allowedFormats={[
				'core/bold',
				'core/italic',
				'core/link',
				'core/list',
				'core/underline',
			]}
		/>
		<ToggleControl
			label={__('Afficher une icône', 'mystarter')}
			checked={item.showIcon}
			onChange={(value) =>
				onChange(index, { ...item, showIcon: value })
			}
		/>
		{item.showIcon ? (
			<Fragment>
				<SelectControl
					label={__('Type d’icône', 'mystarter')}
					value={item.iconType}
					options={ICON_TYPE_OPTIONS}
					onChange={(value) =>
						onChange(index, {
							...item,
							iconType: value,
						})
					}
				/>
				{item.iconType === 'dashicon' ? (
					<SelectControl
						label={__('Icône Dashicon', 'mystarter')}
						value={item.dashicon}
						options={DASHICON_OPTIONS}
						onChange={(value) =>
							onChange(index, { ...item, dashicon: value })
						}
					/>
				) : null}

				{item.iconType === 'image' ? (
					<Fragment>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									onChange(index, {
										...item,
										imageId: media?.id,
										imageUrl:
											media?.sizes?.thumbnail?.url ||
											media?.url ||
											'',
									})
								}
								value={item.imageId}
								allowedTypes={['image']}
								render={({ open }) => (
									<Button
										variant="secondary"
										onClick={open}
									>
										{item.imageUrl
											? __('Remplacer l’image', 'mystarter')
											: __('Choisir une image', 'mystarter')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{item.imageUrl ? (
							<div className="mystarter-two-column__preview">
								<img src={item.imageUrl} alt="" />
								<Button
									variant="link"
									onClick={() =>
										onChange(index, {
											...item,
											imageId: 0,
											imageUrl: '',
										})
									}
								>
									{__('Retirer', 'mystarter')}
								</Button>
							</div>
						) : null}
					</Fragment>
				) : null}

				{item.iconType === 'preset' ? (
					PRESET_ICONS.length ? (
						<SelectControl
							label={__('Icône prédéfinie', 'mystarter')}
							value={item.presetIcon}
							options={PRESET_ICONS.map((icon) => ({
								label: icon.label,
								value: icon.value,
							}))}
							onChange={(value) =>
								onChange(index, { ...item, presetIcon: value })
							}
						/>
					) : (
						<Notice status="warning" isDismissible={false}>
							{__(
								'Aucune icône prédéfinie trouvée. Ajoutez vos fichiers dans `src/blocks/column-text/icons/library`.',
								'mystarter'
							)}
						</Notice>
					)
				) : null}
			</Fragment>
		) : null}
	</PanelBody>
);

const normalizeItem = (item = {}) => ({
	...EMPTY_COLUMN,
	...item,
	iconType: item.iconType || 'dashicon',
	dashicon: item.dashicon || item.icon || 'star-filled',
	presetIcon:
		item.presetIcon ||
		item.icon ||
		PRESET_ICONS[0]?.value ||
		'',
});

const Edit = ({ attributes, setAttributes }) => {
	const { columns, items = [] } = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-two-column has-${columns}-columns`,
		style: {
			'--mystarter-columns-count': columns,
		},
	});

	useEffect(() => {
		const normalized = Array.from({ length: columns }, (_, idx) =>
			normalizeItem(items[idx])
		);

		const hasChanged =
			normalized.length !== items.length ||
			normalized.some((item, idx) => {
				const original = items[idx];
				return JSON.stringify(item) !== JSON.stringify(original);
			});

		if (hasChanged) {
			setAttributes({ items: normalized });
		}
	}, [columns, items, setAttributes]);

	const updateItem = (index, nextValue) => {
		const nextItems = [...items];
		nextItems[index] = nextValue;
		setAttributes({ items: nextItems });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Disposition', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre de colonnes', 'mystarter')}
						value={columns}
						onChange={(value) =>
							setAttributes({
								columns: Math.min(Math.max(value || 2, 2), 6),
							})
						}
						min={2}
						max={6}
					/>
				</PanelBody>

				{items.map((item, index) => (
					<ColumnControls
						key={`column-${index}`}
						index={index}
						item={item}
						onChange={updateItem}
					/>
				))}
			</InspectorControls>

			<section {...blockProps}>
				{items.map((item, index) => (
					<div className="mystarter-two-column__column" key={index}>
						{renderIconPreview(item)}
						<RichText
							tagName="h3"
							value={item.title}
							onChange={(value) =>
								updateItem(index, { ...item, title: value })
							}
							placeholder={__(
								`Titre colonne ${index + 1}`,
								'mystarter'
							)}
						/>
						<RichText
							tagName="div"
							className="mystarter-two-column__content"
							value={item.content}
							onChange={(value) =>
								updateItem(index, { ...item, content: value })
							}
							placeholder={__(
								`Contenu colonne ${index + 1}…`,
								'mystarter'
							)}
						/>
					</div>
				))}
			</section>
		</Fragment>
	);
};

export default Edit;
