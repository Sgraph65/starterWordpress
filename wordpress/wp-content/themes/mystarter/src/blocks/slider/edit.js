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
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const Edit = ({ attributes, setAttributes }) => {
	const { slides, autoplay, interval } = attributes;
	const blockProps = useBlockProps({
		className: 'mystarter-block mystarter-block-slider',
	});

	const onSelectSlides = (mediaItems) => {
		if (!mediaItems?.length) {
			return;
		}

		const nextSlides = [
			...slides,
			...mediaItems.map((media) => ({
				id: media.id,
				url: media.sizes?.large?.url || media.url,
				alt: media.alt || '',
				caption: media.caption || '',
			})),
		];

		setAttributes({ slides: nextSlides });
	};

	const updateSlide = (index, key, value) => {
		const nextSlides = [...slides];
		nextSlides[index] = {
			...nextSlides[index],
			[key]: value,
		};
		setAttributes({ slides: nextSlides });
	};

	const removeSlide = (index) => {
		setAttributes({
			slides: slides.filter((_, slideIndex) => slideIndex !== index),
		});
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Diapositives', 'mystarter')} initialOpen>
					<MediaUpload
						onSelect={onSelectSlides}
						multiple
						gallery
						render={({ open }) => (
							<Button
								variant={
									slides.length ? 'secondary' : 'primary'
								}
								onClick={open}
							>
								{slides.length
									? __('Ajouter des images', 'mystarter')
									: __('Créer un slider', 'mystarter')}
							</Button>
						)}
					/>

					{slides.length ? (
						<div className="mystarter-slider-form">
							{slides.map((slide, index) => (
								<div
									className="mystarter-slider-form__item"
									key={slide.id || index}
								>
									{slide.url ? (
										<img src={slide.url} alt={slide.alt} />
									) : (
										<div className="mystarter-slider-form__placeholder">
											{__('Aucune image', 'mystarter')}
										</div>
									)}
									<MediaUpload
										onSelect={(media) =>
											updateSlide(
												index,
												'url',
												media.sizes?.large?.url ||
													media.url
											)
										}
										render={({ open }) => (
											<Button
												variant="secondary"
												onClick={open}
											>
												{__(
													'Remplacer l’image',
													'mystarter'
												)}
											</Button>
										)}
									/>
									<TextControl
										label={__(
											'Texte alternatif',
											'mystarter'
										)}
										value={slide.alt}
										onChange={(value) =>
											updateSlide(index, 'alt', value)
										}
									/>
									<TextareaControl
										label={__('Légende', 'mystarter')}
										value={slide.caption || ''}
										onChange={(value) =>
											updateSlide(index, 'caption', value)
										}
									/>
									<Button
										variant="link"
										onClick={() => removeSlide(index)}
									>
										{__(
											'Supprimer la diapositive',
											'mystarter'
										)}
									</Button>
								</div>
							))}
						</div>
					) : null}
				</PanelBody>

				<PanelBody title={__('Comportement', 'mystarter')}>
					<ToggleControl
						label={__('Lecture automatique', 'mystarter')}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>
					<RangeControl
						label={__('Intervalle (secondes)', 'mystarter')}
						value={Math.round(interval / 1000)}
						onChange={(value) =>
							setAttributes({ interval: value * 1000 })
						}
						min={2}
						max={12}
					/>
				</PanelBody>
			</InspectorControls>

			<div
				{...blockProps}
				data-autoplay={autoplay}
				data-interval={interval}
			>
				<div className="mystarter-block-slider__slides">
					{slides.length ? (
						slides.map((slide, index) => (
							<figure
								className="mystarter-block-slider__slide"
								key={slide.id || index}
							>
								{slide.url ? (
									<img src={slide.url} alt={slide.alt} />
								) : (
									<div className="mystarter-block-slider__placeholder">
										{__('Image manquante', 'mystarter')}
									</div>
								)}
								{slide.caption ? (
									<figcaption>{slide.caption}</figcaption>
								) : null}
							</figure>
						))
					) : (
						<p className="mystarter-block-slider__help">
							{__('Aucune diapositive configurée', 'mystarter')}
						</p>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
