import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const { images, columns, displayCaptions } = attributes;
	const blockProps = useBlockProps({
		className: `mystarter-block mystarter-block-gallery columns-${columns}`,
	});

	const onSelectImages = (selected) => {
		if (!selected || !selected.length) {
			return;
		}

		const mappedImages = selected.map((image) => ({
			id: image.id,
			url: image.sizes?.large?.url || image.url,
			alt: image.alt || '',
			caption: image.caption || '',
		}));

		setAttributes({ images: mappedImages });
	};

	const removeImage = (index) => {
		const nextImages = images.filter((_, i) => i !== index);
		setAttributes({ images: nextImages });
	};

	const updateCaption = (value, index) => {
		const nextImages = [...images];
		nextImages[index] = {
			...nextImages[index],
			caption: value,
		};
		setAttributes({ images: nextImages });
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Images', 'mystarter')} initialOpen>
					<MediaUpload
						onSelect={onSelectImages}
						multiple
						gallery
						render={({ open }) => (
							<Button
								variant={
									images.length ? 'secondary' : 'primary'
								}
								onClick={open}
							>
								{images.length
									? __('Modifier la sélection', 'mystarter')
									: __('Choisir des images', 'mystarter')}
							</Button>
						)}
					/>
					{images.length ? (
						<div className="mystarter-gallery-form">
							{images.map((image, index) => (
								<div
									className="mystarter-gallery-form__item"
									key={image.id || index}
								>
									<img src={image.url} alt={image.alt} />
									<TextControl
										label={__('Légende', 'mystarter')}
										value={image.caption || ''}
										onChange={(value) =>
											updateCaption(value, index)
										}
									/>
									<Button
										variant="link"
										onClick={() => removeImage(index)}
									>
										{__('Retirer', 'mystarter')}
									</Button>
								</div>
							))}
						</div>
					) : null}
				</PanelBody>

				<PanelBody title={__('Mise en page', 'mystarter')}>
					<RangeControl
						label={__('Colonnes', 'mystarter')}
						value={columns}
						onChange={(value) => setAttributes({ columns: value })}
						min={2}
						max={6}
					/>
					<ToggleControl
						label={__('Afficher les légendes', 'mystarter')}
						checked={displayCaptions}
						onChange={(value) =>
							setAttributes({ displayCaptions: value })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="mystarter-block-gallery__grid">
					{images.length ? (
						images.map((image, index) => (
							<figure
								className="mystarter-block-gallery__item"
								key={image.id || index}
							>
								<img src={image.url} alt={image.alt} />
								{displayCaptions && image.caption ? (
									<figcaption>{image.caption}</figcaption>
								) : null}
							</figure>
						))
					) : (
						<p className="mystarter-block-gallery__placeholder">
							{__(
								'Sélectionnez plusieurs images pour composer la galerie.',
								'mystarter'
							)}
						</p>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
