import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

const EMPTY_TESTIMONIAL = {
	quote: '',
	author: '',
	role: '',
	company: '',
	avatarId: 0,
	avatarUrl: '',
	avatarAlt: '',
};

const TestimonialsEdit = ({ attributes, setAttributes }) => {
	const { count, items = [], autoplay, interval } = attributes;

	const blockProps = useBlockProps({
		className: 'mystarter-testimonials',
		'data-autoplay': autoplay,
		'data-interval': interval,
	});

	useEffect(() => {
		let nextItems = items.map((item) => ({ ...EMPTY_TESTIMONIAL, ...item }));

		if (nextItems.length < count) {
			const addition = Array.from({ length: count - nextItems.length }).map(
				() => ({ ...EMPTY_TESTIMONIAL })
			);
			nextItems = [...nextItems, ...addition];
		} else if (nextItems.length > count) {
			nextItems = nextItems.slice(0, count);
		}

		if (
			nextItems.length !== items.length ||
			nextItems.some(
				(item, index) => JSON.stringify(item) !== JSON.stringify(items[index])
			)
		) {
			setAttributes({ items: nextItems });
		}
	}, [count, items, setAttributes]);

	const updateItem = (index, value) => {
		const next = [...items];
		next[index] = value;
		setAttributes({ items: next });
	};

	const onSelectAvatar = (index, media) => {
		if (!media) {
			return;
		}

		updateItem(index, {
			...items[index],
			avatarId: media.id,
			avatarUrl: media?.sizes?.thumbnail?.url || media.url,
			avatarAlt: media.alt || '',
		});
	};

	const removeAvatar = (index) => {
		updateItem(index, {
			...items[index],
			avatarId: 0,
			avatarUrl: '',
			avatarAlt: '',
		});
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__('Carrousel', 'mystarter')} initialOpen>
					<RangeControl
						label={__('Nombre de témoignages', 'mystarter')}
						value={count}
						onChange={(value) =>
							setAttributes({
								count: Math.min(Math.max(value || 1, 1), 6),
							})
						}
						min={1}
						max={6}
					/>
					<ToggleControl
						label={__('Lecture automatique', 'mystarter')}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>
					<RangeControl
						label={__('Intervalle (ms)', 'mystarter')}
						value={interval}
						onChange={(value) =>
							setAttributes({
								interval: Math.min(Math.max(value || 2000, 2000), 10000),
							})
						}
						min={2000}
						max={10000}
						step={500}
						disabled={!autoplay}
					/>
				</PanelBody>

				{items.map((item, index) => (
					<PanelBody
						key={`testimonial-${index}`}
						title={__('Témoignage', 'mystarter') + ` ${index + 1}`}
						initialOpen={index === 0}
					>
						<BaseControl label={__('Citation', 'mystarter')}>
							<RichText
								tagName="blockquote"
								className="mystarter-testimonials__richtext"
								value={item.quote}
								onChange={(value) =>
									updateItem(index, { ...item, quote: value })
								}
								placeholder={__('Saisissez le témoignage…', 'mystarter')}
								allowedFormats={[
									'core/bold',
									'core/italic',
									'core/link',
								]}
							/>
						</BaseControl>
						<TextControl
							label={__('Nom', 'mystarter')}
							value={item.author}
							onChange={(value) =>
								updateItem(index, { ...item, author: value })
							}
						/>
						<TextControl
							label={__('Rôle / Fonction', 'mystarter')}
							value={item.role}
							onChange={(value) =>
								updateItem(index, { ...item, role: value })
							}
						/>
						<TextControl
							label={__('Entreprise (optionnel)', 'mystarter')}
							value={item.company}
							onChange={(value) =>
								updateItem(index, { ...item, company: value })
							}
						/>
						{item.avatarUrl ? (
							<div className="mystarter-testimonials__avatar-preview">
								<img src={item.avatarUrl} alt={item.avatarAlt || ''} />
								<Button variant="link" onClick={() => removeAvatar(index)}>
									{__('Retirer la photo', 'mystarter')}
								</Button>
							</div>
						) : null}
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => onSelectAvatar(index, media)}
								value={item.avatarId}
								allowedTypes={['image']}
								render={({ open }) => (
									<Button variant="secondary" onClick={open}>
										{item.avatarUrl
											? __('Remplacer la photo', 'mystarter')
											: __('Ajouter une photo', 'mystarter')}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						<TextControl
							label={__('Texte alternatif', 'mystarter')}
							value={item.avatarAlt}
							onChange={(value) =>
								updateItem(index, { ...item, avatarAlt: value })
							}
						/>
					</PanelBody>
				))}
			</InspectorControls>

			<div {...blockProps}>
				<div className="mystarter-testimonials__viewport">
					<div className="mystarter-testimonials__slides">
						{items.map((item, index) => {
							const hasMeta = item.role || item.company;

							return (
								<article className="mystarter-testimonials__slide" key={index}>
									{item.quote ? (
										<RichText.Content
											tagName="blockquote"
											value={item.quote}
										/>
									) : (
										<p className="mystarter-placeholder">
											{__('Ajoutez un témoignage', 'mystarter')}
										</p>
									)}
									<div className="mystarter-testimonials__author">
										{item.avatarUrl ? (
											<img src={item.avatarUrl} alt={item.avatarAlt || ''} />
										) : (
											<div className="mystarter-testimonials__avatar-fallback">
												{__('Photo', 'mystarter')}
											</div>
										)}
										<div>
											<strong>
												{item.author || __('Nom du client', 'mystarter')}
											</strong>
											<span>
												{hasMeta
													? [item.role, item.company]
															.filter(Boolean)
															.join(' • ')
													: __('Fonction / Entreprise', 'mystarter')}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</div>
					<button
						type="button"
						className="mystarter-testimonials__control is-prev"
						aria-label={__('Témoignage précédent', 'mystarter')}
					>
						‹
					</button>
					<button
						type="button"
						className="mystarter-testimonials__control is-next"
						aria-label={__('Témoignage suivant', 'mystarter')}
					>
						›
					</button>
				</div>
				<div className="mystarter-testimonials__dots" aria-hidden="true" />
			</div>
		</Fragment>
	);
};

export default TestimonialsEdit;
