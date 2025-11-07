import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	Button,
	TextControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

const EMPTY_LOGO = {
	imageId: 0,
	imageUrl: '',
	alt: '',
	link: '',
};

const LogosEdit = ({ attributes, setAttributes }) => {
	const { columns, items = [], grayscale } = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-logos has-${columns}-columns ${
			grayscale ? 'is-grayscale' : ''
		}`,
	});

	useEffect(() => {
		let nextItems = [...items];

		if (nextItems.length < columns) {
			const addition = Array.from({ length: columns - nextItems.length }).map(
				() => ({ ...EMPTY_LOGO })
			);
			nextItems = [...nextItems, ...addition];
		} else if (nextItems.length > columns) {
			nextItems = nextItems.slice(0, columns);
		}

		if (
			nextItems.length !== items.length ||
			nextItems.some(
				(item, index) => JSON.stringify(item) !== JSON.stringify(items[index])
			)
		) {
			setAttributes({ items: nextItems });
		}
	}, [columns, items, setAttributes]);

	const updateItem = (index, value) => {
		const next = [...items];
		next[index] = value;
		setAttributes({ items: next });
	};

	const removeImage = (index) => {
		updateItem(index, { ...items[index], imageId: 0, imageUrl: '' });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Réglages', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre de logos', 'mystarter')}
						value={columns}
						onChange={(value) =>
							setAttributes({ columns: Math.min(Math.max(value || 2, 2), 8) })
						}
						min={2}
						max={8}
					/>
					<ToggleControl
						label={__('Afficher en niveaux de gris', 'mystarter')}
						checked={grayscale}
						onChange={(value) => setAttributes({ grayscale: value })}
					/>
				</PanelBody>

				{items.map((item, index) => (
					<PanelBody
						key={`logo-${index}`}
						title={__('Logo', 'mystarter') + ` ${index + 1}`}
						initialOpen={index === 0}
					>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) =>
									updateItem(index, {
										...item,
										imageId: media?.id,
										imageUrl: media?.sizes?.medium?.url || media?.url || '',
										alt: media?.alt || '',
									})
								}
								value={item.imageId}
								allowedTypes={['image']}
								render={({ open }) => (
									<Button
										variant={item.imageUrl ? 'secondary' : 'primary'}
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
							<div className="mystarter-logos__preview">
								<img src={item.imageUrl} alt={item.alt} />
								<Button variant="link" onClick={() => removeImage(index)}>
									{__('Retirer', 'mystarter')}
								</Button>
							</div>
						) : null}

						<TextControl
							label={__('Texte alternatif', 'mystarter')}
							value={item.alt}
							onChange={(value) =>
								updateItem(index, { ...item, alt: value })
							}
						/>
						<TextControl
							label={__('Lien (optionnel)', 'mystarter')}
							value={item.link}
							onChange={(value) =>
								updateItem(index, { ...item, link: value })
							}
							placeholder="https://"
						/>
					</PanelBody>
				))}
			</InspectorControls>

			<div {...blockProps}>
				{items.map((item, index) => {
					const logo = item.imageUrl ? (
						<img src={item.imageUrl} alt={item.alt || ''} />
					) : (
						<div className="mystarter-logos__placeholder">
							{__('Logo', 'mystarter')}
						</div>
					);

					return item.link ? (
						<a
							key={index}
							className="mystarter-logos__item"
							href={item.link}
							target="_blank"
							rel="noreferrer noopener"
						>
							{logo}
						</a>
					) : (
						<div className="mystarter-logos__item" key={index}>
							{logo}
						</div>
					);
				})}
			</div>
		</Fragment>
	);
};

export default LogosEdit;
