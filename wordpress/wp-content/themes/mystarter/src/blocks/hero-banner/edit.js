import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

const DEFAULT_SLIDE = {
	mediaId: undefined,
	mediaUrl: '',
	mediaAlt: '',
	eyebrow: '',
	title: '',
	content: '',
	buttonText: '',
	buttonUrl: '',
	openInNewTab: false,
};

const Edit = ({ attributes, setAttributes }) => {
	const {
		layout,
		eyebrow,
		title,
		content,
		buttonText,
		buttonUrl,
		openInNewTab,
		mediaId,
		mediaUrl,
		mediaAlt,
		videoUrl,
		slides,
		sliderAutoplay,
		sliderInterval,
	} = attributes;

	const blockProps = useBlockProps({
		className: `mystarter-block mystarter-hero is-layout-${layout}`,
		...(layout === 'slider'
			? {
					'data-autoplay': sliderAutoplay,
					'data-interval': sliderInterval,
				}
			: {}),
	});

	const onSelectImage = (media) => {
		if (!media || !media.url) {
			return;
		}

		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url,
			mediaAlt: media.alt || '',
		});
	};

	const onRemoveImage = () => {
		setAttributes({
			mediaId: undefined,
			mediaUrl: '',
			mediaAlt: '',
		});
	};

	const addSlide = () => {
		setAttributes({
			slides: [...slides, { ...DEFAULT_SLIDE }],
		});
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
			slides: slides.filter((_, i) => i !== index),
		});
	};

	const onSelectSlideImage = (index, media) => {
		if (!media || !media.url) {
			return;
		}

		updateSlide(index, 'mediaId', media.id);
		updateSlide(index, 'mediaUrl', media.url);
		updateSlide(index, 'mediaAlt', media.alt || '');
	};

	const removeSlideMedia = (index) => {
		updateSlide(index, 'mediaId', undefined);
		updateSlide(index, 'mediaUrl', '');
		updateSlide(index, 'mediaAlt', '');
	};

	const renderNonSliderPreview = () => (
		<Fragment>
			{layout === 'video' ? (
				<div className="mystarter-hero__video">
					{videoUrl ? (
						<video src={videoUrl} autoPlay muted loop playsInline />
					) : (
						<div className="mystarter-hero__placeholder">
							{__('Aucune vidéo configurée', 'mystarter')}
						</div>
					)}
				</div>
			) : null}

			{layout === 'static' ? (
				<div className="mystarter-hero__media">
					{mediaUrl ? (
						<img src={mediaUrl} alt={mediaAlt || ''} />
					) : (
						<div className="mystarter-hero__placeholder">
							{__('Aucune image sélectionnée', 'mystarter')}
						</div>
					)}
				</div>
			) : null}

			<div className="mystarter-hero__overlay" />

			<div className="mystarter-hero__inner">
				{eyebrow ? (
					<span className="mystarter-hero__eyebrow">{eyebrow}</span>
				) : null}
				{title ? <h1>{title}</h1> : null}
				{content ? (
					<div
						className="mystarter-hero__content"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				) : null}
				{buttonText ? (
					<a
						className="mystarter-button is-primary"
						href={buttonUrl || '#'}
						target={openInNewTab ? '_blank' : undefined}
						rel={openInNewTab ? 'noopener noreferrer' : undefined}
					>
						{buttonText}
					</a>
				) : null}
			</div>
		</Fragment>
	);

	const renderSliderPreview = () => (
		<div className="mystarter-hero__slider-viewport">
			<div className="mystarter-hero__slides">
				{slides.length ? (
					slides.map((slide, index) => (
						<article
							className="mystarter-hero__slide"
							key={slide.mediaUrl || index}
						>
							{slide.mediaUrl ? (
								<div className="mystarter-hero__slide-background">
									<img
										src={slide.mediaUrl}
										alt={slide.mediaAlt || ''}
									/>
								</div>
							) : (
								<div className="mystarter-hero__placeholder">
									{__('Image manquante', 'mystarter')}
								</div>
							)}
							<div className="mystarter-hero__slide-overlay" />
							<div className="mystarter-hero__slide-inner">
								{slide.eyebrow ? (
									<span className="mystarter-hero__eyebrow">
										{slide.eyebrow}
									</span>
								) : null}
								{slide.title ? <h2>{slide.title}</h2> : null}
								{slide.content ? (
									<div
										className="mystarter-hero__content"
										dangerouslySetInnerHTML={{
											__html: slide.content,
										}}
									/>
								) : null}
								{slide.buttonText ? (
									<a
										className="mystarter-button is-primary"
										href={slide.buttonUrl || '#'}
										target={
											slide.openInNewTab
												? '_blank'
												: undefined
										}
										rel={
											slide.openInNewTab
												? 'noopener noreferrer'
												: undefined
										}
									>
										{slide.buttonText}
									</a>
								) : null}
							</div>
						</article>
					))
				) : (
					<p className="mystarter-hero__empty">
						{__(
							'Ajoutez des diapositives dans le panneau Formulaire.',
							'mystarter'
						)}
					</p>
				)}
			</div>
		</div>
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Mise en page', 'mystarter')} initialOpen>
					<SelectControl
						label={__('Variation', 'mystarter')}
						value={layout}
						onChange={(value) => setAttributes({ layout: value })}
						options={[
							{
								label: __('Image statique', 'mystarter'),
								value: 'static',
							},
							{
								label: __('Slider', 'mystarter'),
								value: 'slider',
							},
							{
								label: __('Vidéo en fond', 'mystarter'),
								value: 'video',
							},
						]}
					/>
				</PanelBody>

				{layout === 'static' ? (
					<PanelBody title={__('Image', 'mystarter')}>
						{mediaUrl ? (
							<div className="mystarter-hero__form-preview">
								<img src={mediaUrl} alt={mediaAlt || ''} />
							</div>
						) : null}
						<MediaUpload
							onSelect={onSelectImage}
							value={mediaId}
							render={({ open }) => (
								<Button
									variant={mediaUrl ? 'secondary' : 'primary'}
									onClick={open}
								>
									{mediaUrl
										? __('Remplacer l’image', 'mystarter')
										: __('Choisir une image', 'mystarter')}
								</Button>
							)}
						/>
						{mediaUrl ? (
							<Button variant="link" onClick={onRemoveImage}>
								{__('Retirer l’image', 'mystarter')}
							</Button>
						) : null}
						<TextControl
							label={__('Texte alternatif', 'mystarter')}
							value={mediaAlt}
							onChange={(value) =>
								setAttributes({ mediaAlt: value })
							}
						/>
					</PanelBody>
				) : null}

				{layout === 'video' ? (
					<PanelBody title={__('Vidéo de fond', 'mystarter')}>
						<TextControl
							label={__('URL vidéo (MP4, YouTube…)', 'mystarter')}
							value={videoUrl}
							onChange={(value) =>
								setAttributes({ videoUrl: value })
							}
						/>
						<MediaUploadCheck>
							<MediaUpload
								value={undefined}
								onSelect={(media) =>
									setAttributes({ videoUrl: media.url || '' })
								}
								allowedTypes={['video']}
								render={({ open }) => (
									<Button variant="secondary" onClick={open}>
										{__('Choisir une vidéo', 'mystarter')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{videoUrl ? (
							<Button
								variant="link"
								onClick={() => setAttributes({ videoUrl: '' })}
							>
								{__('Retirer la vidéo', 'mystarter')}
							</Button>
						) : null}
					</PanelBody>
				) : null}

				{layout !== 'slider' ? (
					<PanelBody title={__('Contenu', 'mystarter')} initialOpen>
						<TextControl
							label={__('Sur-titre', 'mystarter')}
							value={eyebrow}
							onChange={(value) =>
								setAttributes({ eyebrow: value })
							}
						/>
						<TextControl
							label={__('Titre principal', 'mystarter')}
							value={title}
							onChange={(value) =>
								setAttributes({ title: value })
							}
						/>
						<TextareaControl
							label={__('Texte de description', 'mystarter')}
							help={__(
								'HTML de base accepté (ex. <p>, <strong>).',
								'mystarter'
							)}
							value={content}
							onChange={(value) =>
								setAttributes({ content: value })
							}
						/>
					</PanelBody>
				) : null}

				{layout !== 'slider' ? (
					<PanelBody title={__('Bouton', 'mystarter')}>
						<TextControl
							label={__('Texte du bouton', 'mystarter')}
							value={buttonText}
							onChange={(value) =>
								setAttributes({ buttonText: value })
							}
						/>
						<TextControl
							label={__('Lien', 'mystarter')}
							value={buttonUrl}
							onChange={(value) =>
								setAttributes({ buttonUrl: value })
							}
							placeholder="https://"
						/>
						<ToggleControl
							label={__(
								'Ouvrir dans un nouvel onglet',
								'mystarter'
							)}
							checked={openInNewTab}
							onChange={(value) =>
								setAttributes({ openInNewTab: value })
							}
						/>
					</PanelBody>
				) : null}

				{layout === 'slider' ? (
					<PanelBody
						title={__('Diapositives', 'mystarter')}
						initialOpen
					>
						{slides.length ? (
							<div className="mystarter-hero__slides-form">
								{slides.map((slide, index) => (
									<div
										className="mystarter-hero__slides-form-item"
										key={`slide-${index}`}
									>
										{slide.mediaUrl ? (
											<img
												src={slide.mediaUrl}
												alt={slide.mediaAlt || ''}
											/>
										) : (
											<div className="mystarter-hero__placeholder">
												{__(
													'Aucune image',
													'mystarter'
												)}
											</div>
										)}
										<MediaUpload
											onSelect={(media) =>
												onSelectSlideImage(index, media)
											}
											value={slide.mediaId}
											render={({ open }) => (
												<Button
													variant="secondary"
													onClick={open}
												>
													{__(
														'Choisir une image',
														'mystarter'
													)}
												</Button>
											)}
										/>
										{slide.mediaUrl ? (
											<Button
												variant="link"
												onClick={() =>
													removeSlideMedia(index)
												}
											>
												{__(
													'Retirer l’image',
													'mystarter'
												)}
											</Button>
										) : null}
										<TextControl
											label={__('Sur-titre', 'mystarter')}
											value={slide.eyebrow}
											onChange={(value) =>
												updateSlide(
													index,
													'eyebrow',
													value
												)
											}
										/>
										<TextControl
											label={__('Titre', 'mystarter')}
											value={slide.title}
											onChange={(value) =>
												updateSlide(
													index,
													'title',
													value
												)
											}
										/>
										<TextareaControl
											label={__('Texte', 'mystarter')}
											help={__(
												'HTML de base accepté (ex. <p>, <strong>).',
												'mystarter'
											)}
											value={slide.content}
											onChange={(value) =>
												updateSlide(
													index,
													'content',
													value
												)
											}
										/>
										<TextControl
											label={__(
												'Texte du bouton',
												'mystarter'
											)}
											value={slide.buttonText}
											onChange={(value) =>
												updateSlide(
													index,
													'buttonText',
													value
												)
											}
										/>
										<TextControl
											label={__(
												'Lien du bouton',
												'mystarter'
											)}
											value={slide.buttonUrl}
											onChange={(value) =>
												updateSlide(
													index,
													'buttonUrl',
													value
												)
											}
											placeholder="https://"
										/>
										<ToggleControl
											label={__(
												'Ouvrir dans un nouvel onglet',
												'mystarter'
											)}
											checked={slide.openInNewTab}
											onChange={(value) =>
												updateSlide(
													index,
													'openInNewTab',
													value
												)
											}
										/>
										<Button
											variant="link"
											isDestructive
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
						) : (
							<p className="mystarter-hero__empty">
								{__(
									'Aucune diapositive configurée pour le moment.',
									'mystarter'
								)}
							</p>
						)}
						<Button variant="primary" onClick={addSlide}>
							{__('Ajouter une diapositive', 'mystarter')}
						</Button>
					</PanelBody>
				) : null}

				{layout === 'slider' ? (
					<PanelBody title={__('Comportement', 'mystarter')}>
						<ToggleControl
							label={__('Lecture automatique', 'mystarter')}
							checked={sliderAutoplay}
							onChange={(value) =>
								setAttributes({ sliderAutoplay: value })
							}
						/>
						<RangeControl
							label={__('Intervalle (secondes)', 'mystarter')}
							value={Math.round(sliderInterval / 1000)}
							onChange={(value) =>
								setAttributes({ sliderInterval: value * 1000 })
							}
							min={3}
							max={12}
						/>
					</PanelBody>
				) : null}
			</InspectorControls>

			<div {...blockProps}>
				{layout === 'slider'
					? renderSliderPreview()
					: renderNonSliderPreview()}
			</div>
		</Fragment>
	);
};

export default Edit;
